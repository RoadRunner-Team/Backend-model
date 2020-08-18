const CHATTING_ROOM_TYPE = {
  DIRECT_CHAT: 'DIRECT_CHAT',
};

/**
 * @swagger
 * components:
 *   schemas:
 *     ChattingRooms:
 *       type: object
 *       properties:
 *         roomId:
 *           type: integer
 *           description: PK
 *         roomKey:
 *           type: string
 *           description: 정렬된 유저의 아이디를 "-" 으로 연결한 키 ex) 1-2-3
 *         type:
 *           type: string
 *           enum:
 *             - DIRECT_CHAT
 *           default: DIRECT_CHAT
 *       required:
 *         - roomId
 *         - roomKey
 */
module.exports = (sequelize, DataTypes) => {
  const chattingRooms = sequelize.define(
    'chattingRooms',
    {
      roomId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: 'PK',
      },
      roomKey: {
        type: DataTypes.STRING(256),
        allowNull: false,
        unique: true,
        comment: '정렬된 유저의 아이디를 "-" 으로 연결한 키 ex) 1-2-3',
      },
      type: {
        type: DataTypes.ENUM(Object.keys(CHATTING_ROOM_TYPE)),
        defaultValue: CHATTING_ROOM_TYPE.DIRECT_CHAT,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
      comment: '채팅 방 테이블',
      defaultScope: {
        attributes: { exclude: ['deletedAt'] },
      },
    },
  );

  chattingRooms.associate = models => {
    // foreign key
    chattingRooms.belongsToMany(models.Users, {
      through: 'ChattingRoomUser',
      foreignKey: 'roomId',
      sourceKey: 'roomId',
    });
    chattingRooms.hasMany(models.ChattingMessages, { foreignKey: 'roomId', sourceKey: 'roomId' });
  };

  return chattingRooms;
};

module.exports.CHATTING_ROOM_TYPE = CHATTING_ROOM_TYPE;
