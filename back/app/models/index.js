require("dotenv").config({});

const Sequelize = require("sequelize");

let sequelize;

if (process.env.NODE_ENV === "development") {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "sample.db",
  });
} else {
  sequelize = new Sequelize("postgres", "postgres", "test", {
    host: "localhost",
    dialect: "postgres",
    logQueryParameters: true,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  });
}

const DATABASE = {};

DATABASE.Sequelize = Sequelize;
DATABASE.sequelize = sequelize;

DATABASE.virtualshelf = require("./virtualShelf-model.js")(sequelize);
DATABASE.book = require("./book-model.js")(sequelize);

DATABASE.virtualshelf.hasMany(DATABASE.book, { foreignKey: "idVirtualShelf" });

module.exports = DATABASE;
