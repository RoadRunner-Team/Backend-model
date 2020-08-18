/**
 * @swagger
 * components:
 *   schemas:
 *     ShopperOrderItems:
 *       type: object
 *       properties:
 *         itemId:
 *           type: integer
 *           description: PK
 *         orderId:
 *           type: integer
 *           description: shopper가 요청한 주문의 id. shopperOrders 테이블의 orderId 참조
 *         name:
 *           type: string
 *         count:
 *           type: integer
 *         price:
 *           type: integer
 *       required:
 *         - itemId
 *         - orderId
 *         - name
 *         - count
 *         - price
 */
module.exports = (sequelize, DataTypes) => {
  const shopperOrderItems = sequelize.define(
    'shopperOrderItems',
    {
      itemId: {
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
      name: {
        type: DataTypes.STRING(64),
        allowNull: false,
      },
      count: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
      comment: 'shopper가 요청한 물품들. shopperOrders 테이블에 연관됨',
      defaultScope: {
        attributes: { exclude: ['deletedAt'] },
      },
    },
  );

  shopperOrderItems.associate = models => {
    // foreign key
    shopperOrderItems.belongsTo(models.ShopperOrders, {
      as: 'items',
      foreignKey: 'orderId',
      sourceKey: 'orderId',
      onDelete: 'cascade',
    });
  };

  return shopperOrderItems;
};
