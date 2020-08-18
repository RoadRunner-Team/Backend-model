const RUNNER_ORDER_DISTANCE = {
  '100M': '100M',
  '250M': '250M',
  '500M': '500M',
  '1KM': '1KM',
  '1.5KM': '1.5KM',
  '2.5KM': '2.5KM',
  '5KM': '5KM',
  '10KM': '10KM',
};

/**
 * @swagger
 * components:
 *   schemas:
 *     RunnerOrders:
 *       type: object
 *       properties:
 *         orderId:
 *           type: integer
 *           description: PK
 *           example: 1
 *         runnerId:
 *           type: integer
 *           description: runner의 userId, Users 테이블 참조
 *           example: 2
 *         shopperId:
 *           type: integer
 *           description: shopper의 userId, Users 테이블 참조
 *         message:
 *           type: string
 *           example: 아무말이나 써봅시다.
 *         estimatedTime:
 *           type: string
 *           description: 예상 일정
 *           example: 오후 1시
 *         introduce:
 *           type: string
 *           description: 한줄소개
 *           example: Let me introduce myself
 *         distance:
 *           type: string
 *           example: 100M
 *           enum:
 *             - 100M
 *             - 250M
 *             - 500M
 *             - 1KM
 *             - 1.5KM
 *             - 2.5KM
 *             - 5KM
 *             - 10KM
 *         address:
 *           type: string
 *           description: 활동지역 주소
 *           example: My home
 *         startContactableTime:
 *           type: string
 *           format: time
 *           description: 연락 가능한 시간의 시작
 *           example: '15:30:00'
 *         endContactableTime:
 *           type: string
 *           format: time
 *           description: 연락 가능한 시간의 끝
 *           example: '18:00:00'
 *         payments:
 *           type: string
 *           description: 신용카드, 통장 등 정보 저장
 *           example: 신용카드
 *         viewCount:
 *           type: integer
 *           default: 0
 *           example: 0
 *       required:
 *         - orderId
 *         - runnerId
 *         - message
 *         - estimatedTime
 *         - distance
 *         - address
 *         - startContactableTime
 *         - endContactableTime
 *         - payments
 *         - viewCount
 */

module.exports = (sequelize, DataTypes) => {
  const runnerOrders = sequelize.define(
    'runnerOrders',
    {
      orderId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: 'PK',
      },
      runnerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: 'runner의 userId, Users 테이블 참조',
      },
      shopperId: {
        type: DataTypes.INTEGER,
        comment: 'shopper의 userId, Users 테이블 참조',
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      estimatedTime: {
        type: DataTypes.STRING(64),
        allowNull: false,
        comment: '예상 일정',
      },
      introduce: {
        type: DataTypes.STRING(64),
        comment: '한줄 소개',
      },
      distance: {
        type: DataTypes.ENUM(Object.keys(RUNNER_ORDER_DISTANCE)),
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING(128),
        allowNull: false,
        comment: '활동지역 주소',
      },
      startContactableTime: {
        type: DataTypes.TIME,
        allowNull: false,
        comment: '연락 가능한 시간의 시작',
      },
      endContactableTime: {
        type: DataTypes.TIME,
        allowNull: false,
        comment: '연락 가능한 시간의 끝',
      },
      payments: {
        type: DataTypes.STRING(64),
        allowNull: false,
        comment: '신용카드, 통장 등 정보 저장',
      },
      viewCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
      comment: 'runner가 올려놓은 요청들',
      defaultScope: {
        attributes: { exclude: ['deletedAt'] },
      },
    },
  );

  runnerOrders.associate = models => {
    // foreign key
    runnerOrders.belongsTo(models.Users, {
      as: 'runner',
      foreignKey: 'runnerId',
      sourceKey: 'userId',
      onDelete: 'cascade',
    });
    runnerOrders.belongsTo(models.Users, {
      foreignKey: 'shopperId',
      sourceKey: 'userId',
      onDelete: 'cascade',
    });
    runnerOrders.hasMany(models.RunnerOrderRequests, {
      as: 'runnerOrderRequests',
      foreignKey: 'orderId',
      sourceKey: 'orderId',
      onDelete: 'cascade',
    });
  };

  return runnerOrders;
};

module.exports.RUNNER_ORDER_DISTANCE = RUNNER_ORDER_DISTANCE;
