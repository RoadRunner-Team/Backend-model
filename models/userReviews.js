/**
 * @swagger
 * components:
 *   schemas:
 *     UserReviews:
 *       type: object
 *       properties:
 *         reviewId:
 *           type: integer
 *           description: PK
 *         userId:
 *           type: integer
 *           description: 리뷰 대상자. users 테이블의 userId 참조
 *         writerId:
 *           type: integer
 *           description: 리뷰 작성. users 테이블의 userId 참조
 *         contents:
 *           type: string
 *         rate:
 *           type: integer
 *           description: 평점은 1, 2, 3, 4, 5 중에 하나여야 함
 *           enum:
 *             - 1
 *             - 2
 *             - 3
 *             - 4
 *             - 5
 *       required:
 *         - reviewId
 *         - userId
 *         - writerId
 *         - rate
 */
module.exports = (sequelize, DataTypes) => {
  const userReviews = sequelize.define(
    'userReviews',
    {
      reviewId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: 'PK',
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '리뷰 대상자. users 테이블의 userId 참조',
      },
      writerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '리뷰 작성. users 테이블의 userId 참조',
      },
      contents: {
        type: DataTypes.TEXT,
      },
      rate: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isIn: [[1, 2, 3, 4, 5]],
        },
        comment: '평점은 1, 2, 3, 4, 5 중에 하나여야 함',
      },
    },
    {
      timestamps: true,
      paranoid: true,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
      comment: 'user의 리뷰.',
      defaultScope: {
        attributes: { exclude: ['deletedAt'] },
      },
    },
  );

  userReviews.associate = models => {
    // foreign key
    userReviews.belongsTo(models.Users, {
      foreignKey: 'userId',
      sourceKey: 'userId',
      onDelete: 'cascade',
    });
    userReviews.belongsTo(models.Users, {
      foreignKey: 'writerId',
      sourceKey: 'userId',
      onDelete: 'cascade',
    });

    // userReviewComments
    userReviews.hasMany(models.UserReviewComments, {
      as: 'userReviewComment',
      sourceKey: 'reviewId',
      onDelete: 'cascade',
    });
  };

  return userReviews;
};
