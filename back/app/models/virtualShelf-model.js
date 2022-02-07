const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const VirtualShelf = sequelize.define("virtual_shelf", {
    idVirtualShelf: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 3,
      },
    },
  });
  return VirtualShelf;
};
