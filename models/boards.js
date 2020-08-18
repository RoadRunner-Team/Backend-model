/**
 * @swagger
 * components:
 *   schemas:
 *     Boards:
 *       type: object
 *       properties:
 *         boardId:
 *           type: integer
 *         title:
 *           type: string
 *         contents:
 *           type: string
 *         type:
 *           type: string
 *           enum:
 *             - information
 *             - notice
 *       required:
 *         - boardId
 *         - title
 *         - type
 */

module.exports = (sequelize, DataTypes) => {
  const boards = sequelize.define(
    'boards',
    {
      boardId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: 'PK',
      },
      title: {
        type: DataTypes.STRING(128),
        allowNull: false,
        unique: true,
        comment: 'email - User Login ID',
      },
      contents: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM('information', 'notice'),
      },
    },
    {
      timestamps: true,
      paranoid: true,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
      comment: '게시판 (Boards) 테이블',
    },
  );

  return boards;
};
