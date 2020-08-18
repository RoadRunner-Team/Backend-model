const { Sequelize, DataTypes, Op } = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};
const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Op = Op;

db.Users = require('./users')(sequelize, DataTypes);
db.UserReviews = require('./userReviews')(sequelize, DataTypes);
db.UserReviewComments = require('./userReviewComments')(sequelize, DataTypes);
db.ShopperOrders = require('./shopperOrders')(sequelize, DataTypes);
db.ShopperOrderItems = require('./shopperOrderItems')(sequelize, DataTypes);
db.ShopperOrderImages = require('./shopperOrderImages')(sequelize, DataTypes);
db.ShopperOrderRequests = require('./shopperOrderRequests')(sequelize, DataTypes);
db.RunnerOrders = require('./runnerOrders')(sequelize, DataTypes);
db.RunnerOrderRequests = require('./runnerOrderRequests')(sequelize, DataTypes);
db.Boards = require('./boards')(sequelize, DataTypes);
db.ChattingRooms = require('./chattingRooms')(sequelize, DataTypes);
db.ChattingMessages = require('./chattingMessages')(sequelize, DataTypes);

// 테이블(모델) 간의 관계 설정. foreign key를 이용한 관계 설정
Object.keys(db).forEach(model => {
  if (db[model].associate) {
    db[model].associate(db);
  }
});

module.exports = db;
