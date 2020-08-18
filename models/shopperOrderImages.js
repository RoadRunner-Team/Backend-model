/**
 * @swagger
 * components:
 *   schemas:
 *     ShopperOrderImages:
 *       type: object
 *       properties:
 *         imageId:
 *           type: integer
 *           description: PK
 *         orderId:
 *           type: integer
 *           description: shopper가 요청한 주문의 id. shopperOrders 테이블의 orderId 참조
 *         filename:
 *           type: string
 *         size:
 *           type: integer
 *         path:
 *           type: string
 *       required:
 *         - imageId
 *         - orderId
 *         - filename
 *         - size
 *         - path
 */
module.exports = (sequelize, DataTypes) => {
  const shopperOrderImages = sequelize.define(
    'shopperOrderImages',
    {
      imageId: {
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
      filename: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      size: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      path: {
        type: DataTypes.STRING(256),
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

  shopperOrderImages.associate = models => {
    // foreign key
    shopperOrderImages.belongsTo(models.ShopperOrders, {
      as: 'images',
      foreignKey: 'orderId',
      sourceKey: 'orderId',
      onDelete: 'cascade',
    });
  };

  return shopperOrderImages;
};
