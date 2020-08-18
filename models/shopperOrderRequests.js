const SHOPPER_ORDER_REQUEST_STATUS = {
  REQUESTING: 'REQUESTING',
  MATCHING: 'MATCHING',
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
 *     ShopperOrderRequests:
 *       type: object
 *       properties:
 *         requestId:
 *           type: integer
 *           description: PK
 *         orderId:
 *           type: integer
 *           description: shopper가 요청한 주문의 id. shopperOrders 테이블의 orderId 참조
 *         runnerId:
 *           type: integer
 *           description: 자기가 맡겠다고 하는 runner의 id. Users 테이블의 userId 참조
 *         requestStatus:
 *           type: string
 *           description: REQUESTING 요청중(Runner가 올린 제안에 직접 1:1로 요청한 경우) <br>MATCHING 매칭중(Shopper가 직접 매칭할 Runner를 찾는 경우) <br>MATCHED 매칭 완료 배달중으로 표시 <br>MATCH_FAIL 매칭 안됨 <br>DELIVERED_REQUEST runner가 배달 완료해달라고 요청 <br>DELIVERED shopper가 배달 완료 확인을 선택함 <br>REVIEW_REQUEST runner가 review 요청해달라고 요구함 <br>REVIEWED shopper가 runner에 리뷰함
 *           enum:
 *             - REQUESTING
 *             - MATCHING
 *             - MATCHED
 *             - MATCH_FAIL
 *             - DELIVERED_REQUEST
 *             - DELIVERED
 *             - REVIEW_REQUEST
 *             - REVIEWED
 *       required:
 *         - requestId
 *         - orderId
 *         - runnerId
 *         - requestStatus
 */
module.exports = (sequelize, DataTypes) => {
  const shopperOrderRequests = sequelize.define(
    'shopperOrderRequests',
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
        comment: 'shopper가 요청한 주문의 id. shopperOrders 테이블의 orderId 참조',
      },
      runnerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '자기가 맡겠다고 하는 runner의 id. Users 테이블의 userId 참조',
      },
      requestStatus: {
        type: DataTypes.ENUM(Object.keys(SHOPPER_ORDER_REQUEST_STATUS)),
        allowNull: false,
        comment: 'runner가 요청한 request의 현재 상태, shopperOrders의 status와 연계됨.',
      },
    },
    {
      timestamps: true,
      paranoid: true,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
      comment:
        'shopper가 올린 주문에 runner의 요청들. shopperOrders 테이블과 Users 테이블에 연관됨',
      defaultScope: {
        attributes: { exclude: ['deletedAt'] },
      },
    },
  );

  shopperOrderRequests.associate = models => {
    // foreign key
    shopperOrderRequests.belongsTo(models.ShopperOrders, {
      as: 'shopperOrders',
      foreignKey: 'orderId',
      sourceKey: 'orderId',
      onDelete: 'cascade',
    });
    shopperOrderRequests.belongsTo(models.Users, {
      as: 'runner',
      foreignKey: 'runnerId',
      sourceKey: 'userId',
      onDelete: 'cascade',
    });
  };

  return shopperOrderRequests;
};

module.exports.SHOPPER_ORDER_REQUEST_STATUS = SHOPPER_ORDER_REQUEST_STATUS;
