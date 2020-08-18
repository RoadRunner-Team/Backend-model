/**
 * @swagger
 * components:
 *   schemas:
 *     UserReviewComments:
 *       type: object
 *       properties:
 *         commentId:
 *           type: integer
 *           description: PK
 *         reviewId:
 *           type: integer
 *           description: 리뷰 id. userReviews 테이블의 reviewId 참조
 *         writerId:
 *           type: integer
 *           description: 코멘트 작성자 id. users 테이블의 userId 참조
 *         contents:
 *           type: string
 *       required:
 *         - commentId
 *         - reviewId
 *         - writerId
 */
module.exports = (sequelize, DataTypes) => {
  const userReviewComments = sequelize.define(
    'userReviewComments',
    {
      commentId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: 'PK',
      },
      reviewId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '리뷰 id. userReviews 테이블의 reviewId 참조',
      },
      writerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '코멘트 작성자 id. users 테이블의 userId 참조',
      },
      contents: {
        type: DataTypes.TEXT,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
      comment: 'user의 리뷰에 대한 comment를 나타냄. userReviews와 users에 연관됨',
      defaultScope: {
        attributes: { exclude: ['deletedAt'] },
      },
    },
  );

  userReviewComments.associate = models => {
    // foreign key
    userReviewComments.belongsTo(models.UserReviews, {
      foreignKey: 'reviewId',
      sourceKey: 'reviewId',
      onDelete: 'cascade',
    });
    userReviewComments.belongsTo(models.Users, {
      foreignKey: 'writerId',
      sourceKey: 'userId',
      onDelete: 'cascade',
    });
  };

  return userReviewComments;
};
