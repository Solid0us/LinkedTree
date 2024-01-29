const UserModel = require("../models/user.model");
const LinkModel = require("../models/link.model");
const dbConfig = require("../config/db.config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  dialectOptions: {
    useUTC: true,
    dateStrings: true,
    typeCast: function(field, next) {
      if (field.type === "DATETIME") {
        return field.string();
      }
      return next();
    }
  }
})

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = UserModel(sequelize, Sequelize);
db.link = LinkModel(sequelize, Sequelize);

module.exports = db;