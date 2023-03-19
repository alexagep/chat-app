const Sequelize = require("sequelize"),
  { QueryTypes } = require("sequelize");
const config = require("./config.js");

export const initDatabase = async () => {
  const createDb = `CREATE DATABASE ${config.database}`,
    createRole = `CREATE ROLE ${config.username} WITH LOGIN PASSWORD '${config.password}'`,
    grantRoleAccess = `GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO ${config.username};`,
    grantAccessToCopy = `GRANT pg_write_server_files TO ${config.username}`;

  try {
    const sequelize = new Sequelize(
        config.database,
        config.username,
        config.password,
        {
          logging: config.logging,
          host: config.host,
          port: config.port,
          dialect: config.dialect
        }
      ),
      existDb = await sequelize.query(
        `SELECT 1 FROM pg_catalog.pg_database WHERE datname = '${config.database}';`,
        { type: QueryTypes.SELECT }
      ),
      existRole = await sequelize.query(
        `SELECT 1 FROM pg_roles WHERE rolname = '${config.username}';`,
        { type: QueryTypes.SELECT }
      );

    !existDb.length && (await sequelize.query(createDb));

    !existRole.length &&
      (await sequelize.query(createRole)) &&
      (await sequelize.query(grantRoleAccess)) &&
      (await sequelize.query(grantAccessToCopy));

    await sequelize.close();

    process.exit(0);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log("ERROR IN INITIALIZING DATABASE", err);
  }
};
