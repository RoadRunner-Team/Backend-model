const SHOPPER_ORDER_PRIORITY = {
  FREE: 'FREE',
  NORMAL: 'NORMAL',
  URGENT: 'URGENT',
};

const SHOPPER_ORDER_STATUS = {
  MATCHING: 'MATCHING',
  REQUESTING: 'REQUESTING',
  MATCHED: 'MATCHED',
  MATCH_FAIL: 'MATCH_FAIL',
  DELIVERED_REQUEST: 'DELIVERED_REQUEST',
  DELIVERED: 'DELIVERED',
  REVIEW_REQUEST: 'REVIEW_REQUEST',
  REVIEWED: 'REVIEWED',
};

/**
 * @swagger
 * components:
 *   schemas:
 *     ShopperOrders:
 *       type: object
 *       properties:
 *         orderId:
 *           type: integer
 *           description: PK
 *         shopperId:
 *           type: integer
 *           description: shopper Id. users 테이블의 userId 참조
 *         title:
 *           type: string
 *         priority:
 *           type: string
 *           enum:
 *             - FREE
 *             - NORMAL
 *             - URGENT
 *         status:
 *           type: string
 *           enum:
 *             - MATCHING
 *             - REQUESTING
 *             - MATCHED
 *             - MATCH_FAIL
 *             - DELIVERED_REQUEST
 *             - DELIVERED
 *             - REVIEW_REQUEST
 *             - REVIEWED
 *         contents:
 *           type: string
 *         startReceiveTime:
 *           type: string
 *           format: time
 *           description: 물품을 받을 수 있는 시간의 시작
 *           example: '15:30:00'
 *         endReceiveTime:
 *           type: string
 *           format: time
 *           description: 물품을 받을 수 있는 시간의 끝
 *           example: '20:30:00'
 *         receiveAddress:
 *           type: string
 *           description: 전달할 주소
 *         additionalMessage:
 *           type: string
 *         estimatedPrice:
 *           type: integer
 *           description: 물품들의 예상 총 가격
 *         totalPrice:
 *           type: integer
 *           description: 실제 물품들의 총 가격
 *         runnerTip:
 *           type: integer
 *           description: 러너 팁
 *         viewCount:
 *           type: integer
 *           default: 0
 *           description: 해당 쇼퍼 글의 조회수
 *       required:
 *         - orderId
 *         - shopperId
 *         - priority
 *         - stauts
 *         - contents
 *         - startReceiveTime
 *         - endReceiveTime
 *         - receiveAddress
 *         - estimatedTime
 *         - runnerTip
 *         - viewCount
 */

module.exports = (sequelize, DataTypes) => {
  const shopperOrders = sequelize.define(
    'shopperOrders',
    {
      orderId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: 'PK',
      },
      shopperId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: 'shopper Id. users 테이블의 userId 참조',
      },
      title: {
        type: DataTypes.STRING(64),
        allowNull: false,
      },
      priority: {
        type: DataTypes.ENUM(Object.keys(SHOPPER_ORDER_PRIORITY)),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM(Object.keys(SHOPPER_ORDER_STATUS)),
        allowNull: false,
      },
      contents: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: '가이드 문구를 나타냄. runner에게 어떤 요청을 할지 물어보는 가이드 문구',
      },
      startReceiveTime: {
        type: DataTypes.TIME,
        allowNull: false,
        comment: '물품을 받을 수 있는 시간의 시작',
      },
      endReceiveTime: {
        type: DataTypes.TIME,
        allowNull: false,
        comment: '물품을 받을 수 있는 시간의 끝',
      },
      receiveAddress: {
        type: DataTypes.STRING(128),
        allowNull: false,
        comment: '전달할 주소',
      },
      additionalMessage: {
        type: DataTypes.STRING(256),
      },
      estimatedPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '물품들의 예상 총 가격',
      },
      totalPrice: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        comment: '실제 물품들의 총 가격',
      },
      runnerTip: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '러너 팁',
      },
      viewCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: '해당 쇼퍼 글의 조회수',
      },
    },
    {
      timestamps: true,
      paranoid: true,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
      comment: 'shopper가 요청한 주문. users 테이블에 연관됨',
      defaultScope: {
        attributes: { exclude: ['deletedAt'] },
      },
    },
  );

  shopperOrders.associate = models => {
    // foreign key
    shopperOrders.belongsTo(models.Users, {
      as: 'shopper',
      foreignKey: 'shopperId',
      sourceKey: 'userId',
      onDelete: 'cascade',
    });

    shopperOrders.hasMany(models.ShopperOrderItems, {
      as: 'shopperOrderItems',
      foreignKey: 'orderId',
      sourceKey: 'orderId',
      onDelete: 'cascade',
    });

    shopperOrders.hasMany(models.ShopperOrderImages, {
      as: 'shopperOrderImages',
      foreignKey: 'orderId',
      sourceKey: 'orderId',
      onDelete: 'cascade',
    });

    shopperOrders.hasMany(models.ShopperOrderRequests, {
      as: 'shopperOrderRequests',
      foreignKey: 'orderId',
      sourceKey: 'orderId',
      onDelete: 'cascade',
    });

    shopperOrders.hasMany(models.RunnerOrderRequests, {
      as: 'runnerOrderRequests',
      foreignKey: 'shopperOrderId',
      sourceKey: 'orderId',
      onDelete: 'cascade',
    });
  };

  return shopperOrders;
};

module.exports.SHOPPER_ORDER_PRIORITY = SHOPPER_ORDER_PRIORITY;
module.exports.SHOPPER_ORDER_STATUS = SHOPPER_ORDER_STATUS;
