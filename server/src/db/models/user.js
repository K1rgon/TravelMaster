const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Route, { foreignKey: 'user_id' });
      this.hasMany(models.Auto, { foreignKey: 'user_id' });
      this.hasMany(models.Comment, { foreignKey: 'user_id' });
      this.hasMany(models.Photo, { foreignKey: 'user_id' });
    }
  }
  User.init({
    login: DataTypes.TEXT,
    email: DataTypes.TEXT,
    password: DataTypes.TEXT,
    name: DataTypes.TEXT,
    surname: DataTypes.TEXT,
    token: DataTypes.TEXT,
    foto: DataTypes.BLOB,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
