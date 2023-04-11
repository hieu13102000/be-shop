const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  port: dbConfig.port,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.refreshToken = require("../models/refreshToken.model.js")(sequelize, Sequelize);
db.products = require("./product.model.js")(sequelize, Sequelize);
db.category = require("./category.model.js")(sequelize, Sequelize)
db.brand = require("./brand.model.js")(sequelize, Sequelize)


// Thiết lập quan hệ giữa các bảng

// Trong đối tượng tùy chọn này, through là tên bảng trung gian mà hai bảng
//  (db.role và db.user) sẽ liên kết với nhau thông qua. Trong trường hợp này, 
// bảng trung gian được đặt tên là "user_roles"
db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});
///
// quan hệ 1 với nhiều
db.refreshToken.belongsTo(db.user, {
  foreignKey: 'userId'
});
// quan hệ 1 vs 1
db.user.hasOne(db.refreshToken, {
  foreignKey: 'userId'
});

// onDelete xoá sản phẩm khi khoá ngoại bị xoá
db.category.hasMany(db.products, { foreignKey: 'categoryId' });
db.products.belongsTo(db.category, { foreignKey: 'categoryId', onDelete: 'cascade' });
db.products.belongsTo(db.brand, { foreignKey: 'brandId', onDelete: 'cascade' });
db.brand.hasMany(db.products, { foreignKey: 'brandId' });

db.ROLES = ["user", "admin", "moderator"];
module.exports = db;