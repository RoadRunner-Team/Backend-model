const RUNNER_ORDER_REQUEST_STATUS = {
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
 *     RunnerOrderRequests:
 *       type: object
 *       properties:
 *         requestId:
 *           type: integer
 *           description: PK
 *         orderId:
 *           type: integer
 *           description: runner가 올린 주문의 id. runnerOrders 테이블의 orderId 참조
 *         shopperId:
 *           type: integer
 *           description: shopperId
 *         shopperOrderId:
 *           type: integer
 *           description: shopper가 요청한 주문의 id. shopperOrders 테이블의 orderId 참조
 *         requestStatus:
 *           type: string
 *           description: REQUESTING 요청중 <br>MATCHED 매칭 완료 배달중으로 표시 <br>MATCH_FAIL 매칭 안됨 <br>DELIVERED_REQUEST runner가 배달 완료해달라고 요청 <br>DELIVERED shopper가 배달 완료 확인을 선택함 <br>REVIEW_REQUEST runner가 review 요청해달라고 요구함 <br>REVIEWED shopper가 runner에 리뷰함
 *           enum:
 *             - REQUESTING
 *             - MATCHED
 *             - MATCH_FAIL
 *             - DELIVERED_REQUEST
 *             - DELIVERED
 *             - REVIEW_REQUEST
 *             - REVIEWED
 *       required:
 *         - requestId
 *         - orderId
 *         - shopperId
 *         - shopperOrderId
 */
module.exports = (sequelize, DataTypes) => {
  const runnerOrderRequests = sequelize.define(
    'runnerOrderRequests',
    {
      requestId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: 'PK',
      },
      orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: 'runner가 올린 주문의 id. runnerOrders 테이블의 orderId 참조',
      },
      shopperId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: 'shopperId',
      },
      shopperOrderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: 'shopper가 요청한 주문의 id. shopperOrders 테이블의 orderId 참조',
      },
      requestStatus: {
        type: DataTypes.ENUM(Object.keys(RUNNER_ORDER_REQUEST_STATUS)),
        allowNull: false,
        comment: 'shopper가 요청한 request의 현재 상태',
      },
    },
    {
      timestamps: true,
      paranoid: true,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
      comment: 'shopper가 요청한 runner가 올려놓은 요청에 주문한 정보들 테이블.',
      defaultScope: {
        attributes: { exclude: ['deletedAt'] },
      },
    },
  );

  runnerOrderRequests.associate = models => {
    // foreign key
    runnerOrderRequests.belongsTo(models.RunnerOrders, {
      as: 'runnerOrders',
      foreignKey: 'orderId',
      sourceKey: 'orderId',
      onDelete: 'cascade',
    });
    runnerOrderRequests.belongsTo(models.Users, {
      as: 'shopper',
      foreignKey: 'shopperId',
      sourceKey: 'userId',
      onDelete: 'cascade',
    });
    runnerOrderRequests.belongsTo(models.ShopperOrders, {
      as: 'shopperOrders',
      foreignKey: 'shopperOrderId',
      sourceKey: 'orderId',
      onDelete: 'cascade',
    });
  };

  return runnerOrderRequests;
};

module.exports.RUNNER_ORDER_REQUEST_STATUS = RUNNER_ORDER_REQUEST_STATUS;
