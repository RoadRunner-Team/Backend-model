const CHATTING_MESSAGE_TYPE = {
  DIRECT_CHAT: 'DIRECT_CHAT',
  IMAGE_CHAT: 'IMAGE_CHAT',
  FILE_CHAT: 'FILE_CHAT',
};

/**
 * @swagger
 * components:
 *   schemas:
 *     ChattingMessages:
 *       type: object
 *       properties:
 *         messageId:
 *           type: integer
 *           description: PK
 *         roomId:
 *           type: integer
 *         userId:
 *           type: integer
 *         message:
 *           type: string
 *         type:
 *           type: string
 *           enum:
 *             - DIRECT_CHAT
 *             - IMAGE_CHAT
 *             - FILE_CHAT
 *           default: DIRECT_CHAT
 *       required:
 *         - messageId
 *         - roomId
 *         - userId
 *         - message
 */
module.exports = (sequelize, DataTypes) => {
  const chattingMessages = sequelize.define(
    'chattingMessages',
    {
      messageId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: 'PK',
      },
      roomId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: 'message contents',
      },
      type: {
        type: DataTypes.ENUM(Object.keys(CHATTING_MESSAGE_TYPE)),
        defaultValue: CHATTING_MESSAGE_TYPE.DIRECT_CHAT,
      },
    },
    {
      timestamps: true,
      updatedAt: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
      comment: '채팅 메시지 테이블',
      defaultScope: {
        attributes: { exclude: ['deletedAt'] },
      },
    },
  );

  chattingMessages.associate = models => {
    // foreign key
    chattingMessages.belongsTo(models.Users, { foreignKey: 'userId', sourceKey: 'userId' });
    chattingMessages.belongsTo(models.ChattingRooms, {
      foreignKey: 'roomId',
      sourceKey: 'roomId',
    });
  };

  return chattingMessages;
};

module.exports.CHATTING_MESSAGE_TYPE = CHATTING_MESSAGE_TYPE;
