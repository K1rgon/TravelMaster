const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Pitstop extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Route, { foreignKey: 'route_id' });
    }
  }
  Pitstop.init({
    route_id: DataTypes.INTEGER,
    x: DataTypes.TEXT,
    y: DataTypes.TEXT,
    title: DataTypes.TEXT,
    type: DataTypes.TEXT,
    price: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Pitstop',
  });
  return Pitstop;
};
