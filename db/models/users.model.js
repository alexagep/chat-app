'use strict'

const { Model }  = require('sequelize');
const { genSaltSync, hashSync } = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    toJSON() {
      const attributes = this.get()

      delete attributes.password

      return attributes
    }
  }

  User.init(
    {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      username: {
        type: DataTypes.STRING,
        field: 'username',
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        set(value) {
          this.setDataValue('password', hashSync(value, genSaltSync(12)))
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'user'
      },
      otp: {
        type: DataTypes.STRING,
      },
      otpExpireTime: {
        type: DataTypes.DATE,
        field: 'otp_expire_time',
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at',
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at',
        allowNull: false,
      },
      deletedAt: {
        type: DataTypes.DATE,
        field: 'deleted_at',
      },
    },
    {
      sequelize,
      paranoid: true,
      modelName: 'User',
    }
  )
  return User
}
