const Sequelize = require("sequelize"),
  { QueryTypes } = require("sequelize");
const config = require("./config.js");


export const dropDatabase = async () => {
  const dropDb = `DROP DATABASE ${config.database}`,
    dropRole = `DROP ROLE ${config.username}`
  try {
    const sequelize = new Sequelize(
        env('PG_DATABASE'),
        env('PG_USER'),
        env('PG_PASS'),
        config
      ),
      existDb = await sequelize.query(
        `SELECT 1 FROM pg_catalog.pg_database WHERE datname = '${config.database}';`,
        { type: QueryTypes.SELECT }
      ),
      existRole = await sequelize.query(
        `SELECT 1 FROM pg_roles WHERE rolname = '${config.username}';`,
        { type: QueryTypes.SELECT }
      )

    existDb.length && (await sequelize.query(dropDb))

    existRole.length && (await sequelize.query(dropRole))

    await sequelize.close()

    process.exit(0)
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('ERROR IN DROPPING DATABASE', err)
  }
}
