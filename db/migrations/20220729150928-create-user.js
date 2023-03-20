'use strict'

export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      otp: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      password: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      role: {
        type: Sequelize.STRING,
        defaultValue: 'user',
      },
      otpExpireTime: {
        type: Sequelize.DATE,
        field: 'otp_expire_time',
      },
      created_at: {
        type: Sequelize.DATE,
        field: 'created_at',
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        field: 'updated_at',
        allowNull: false,
      },
      deleted_at: {
        type: Sequelize.DATE,
        field: 'deleted_at',
      },
    })
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Users')
  },
}
