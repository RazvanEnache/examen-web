const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Book = sequelize.define("book", {
    idBook: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    idVirtualShelf: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    genLiterar: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    titlu: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 5,
      },
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 5,
        isUrl: true,
      },
    },
  });
  return Book;
};
