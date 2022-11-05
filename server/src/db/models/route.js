const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Route extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'user_id' });
      this.hasMany(models.Comment, { foreignKey: 'route_id' });
      this.hasMany(models.Photo, { foreignKey: 'route_id' });
      this.hasMany(models.Pitstop, { foreignKey: 'route_id' });
    }
  }
  Route.init({
    title: DataTypes.TEXT,
    description: DataTypes.TEXT,
    start_x: DataTypes.TEXT,
    start_y: DataTypes.TEXT,
    finish_x: DataTypes.TEXT,
    finish_y: DataTypes.TEXT,
    done: DataTypes.BOOLEAN,
    foto: DataTypes.BLOB,
    date_start: DataTypes.TEXT,
    date_finish: DataTypes.TEXT,
    private: DataTypes.BOOLEAN,
    rating: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Route',
  });
  return Route;
};
