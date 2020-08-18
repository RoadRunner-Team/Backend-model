/**
 * @swagger
 * components:
 *   schemas:
 *     Users:
 *       type: object
 *       properties:
 *         userId:
 *           type: integer
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *         displayName:
 *           type: string
 *         gender:
 *           type: string
 *           enum:
 *             - M
 *             - F
 *             - O
 *         address:
 *           type: string
 *         addressDetail:
 *           type: string
 *         emailVerification:
 *           type: boolean
 *         profileImagePath:
 *           type: string
 *         completedOrders:
 *           type: integer
 *         processedOrders:
 *           type: integer
 *         possibleDistance:
 *           type: string
 *         contactTime:
 *           type: string
 *         rate:
 *           type: number
 *           format: float
 *         grade:
 *           type: string
 *           enum:
 *             - NEW
 *             - EXCELLENCE
 *             - EFFORT
 *             - BEST
 *         payments:
 *           type: string
 *         role:
 *           type: string
 *           enum:
 *             - NORMAL
 *             - ADMIN
 *             - OWNER
 *         provider:
 *           type: string
 *       required:
 *         - userId
 *         - email
 *         - password
 */
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define(
    'users',
    {
      userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: 'PK',
      },
      email: {
        type: DataTypes.STRING(128),
        allowNull: false,
        unique: true,
        comment: 'email - User Login ID',
      },
      password: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      displayName: {
        type: DataTypes.STRING(32),
      },
      address: {
        type: DataTypes.STRING(64),
      },
      addressDetail: {
        type: DataTypes.STRING(64),
      },
      gender: {
        type: DataTypes.ENUM('M', 'F', 'O'),
      },
      emailVerification: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      profileImagePath: {
        type: DataTypes.STRING(256),
      },
      completedOrders: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      processedOrders: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      possibleDistance: {
        type: DataTypes.STRING(32),
        comment: '100m, 250m, 500m, 1km, 1.5km, 2.5km, 5km, 10km이상',
      },
      // 최적화 필요
      contactTime: {
        type: DataTypes.STRING(64),
        comment: '연락 가능한 시간',
      },
      rate: {
        type: DataTypes.FLOAT,
        comment:
          'MemberReviews에 있는 유저들의 리뷰들의 평균 평점을 저장해놓음. 리뷰 추가될때마다 갱신됨',
      },
      grade: {
        type: DataTypes.ENUM('NEW', 'EXCELLENCE', 'EFFORT', 'BEST'),
        comment: '러너 등급 - 신규, 우수, 노력, 최고',
      },
      // 최적화 필요
      payments: {
        type: DataTypes.STRING(64),
        comment: '신용카드, 통장 등 정보 저장',
      },
      role: {
        type: DataTypes.ENUM('NORMAL', 'ADMIN', 'OWNER'),
        allowNull: false,
        defaultValue: 'NORMAL',
      },
      provider: {
        type: DataTypes.STRING(10),
        allowNull: false,
        defaultValue: 'local',
      },
    },
    {
      timestamps: true,
      paranoid: true,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
      comment: '사용자(user) 테이블',
      defaultScope: {
        attributes: { exclude: ['password', 'deletedAt'] },
      },
    },
  );

  users.associate = models => {
    // foreign key
    // userReviews
    users.hasMany(models.UserReviews, {
      as: 'userReview',
      foreignKey: 'userId',
      sourceKey: 'userId',
    });
    users.hasMany(models.UserReviews, {
      as: 'userReviewWriter',
      foreignKey: 'writerId',
      sourceKey: 'userId',
    });

    // userReviewComments
    users.hasMany(models.UserReviewComments, {
      as: 'userReviewCommentsWriter',
      foreignKey: 'writerId',
      sourceKey: 'userId',
    });

    // shopperOrders
    users.hasMany(models.ShopperOrders, {
      as: 'shopperOrders',
      foreignKey: 'shopperId',
      sourceKey: 'userId',
      onDelete: 'cascade',
    });

    // shopperOrderRequests
    users.hasMany(models.ShopperOrderRequests, {
      as: 'shopperOrderRequests',
      foreignKey: 'runnerId',
      sourceKey: 'userId',
      onDelete: 'cascade',
    });

    // runnerOrders
    users.hasMany(models.RunnerOrders, {
      as: 'runnerOrders',
      foreignKey: 'runnerId',
      sourceKey: 'userId',
      onDelete: 'cascade',
    });

    users.hasMany(models.RunnerOrders, {
      as: 'runnerOrderShopper',
      foreignKey: 'shopperId',
      sourceKey: 'userId',
      onDelete: 'cascade',
    });

    // runnerOrderRequests
    users.hasMany(models.RunnerOrderRequests, {
      as: 'runnerOrderRequestShopper',
      foreignKey: 'shopperId',
      sourceKey: 'userId',
      onDelete: 'cascade',
    });

    users.belongsToMany(models.ChattingRooms, {
      through: 'ChattingRoomUser',
      sourceKey: 'userId',
      foreignKey: 'userId',
    });

    users.hasMany(models.ChattingMessages, {
      foreignKey: 'userId',
      sourceKey: 'userId',
      onDelete: 'cascade',
    });
  };

  return users;
};
