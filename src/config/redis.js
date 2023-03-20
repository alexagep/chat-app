const ioredis = require('ioredis');
require('dotenv/config');


const redisConnection = new ioredis({
  port: Number(process.env.REDIS_PORT),
  host: process.env.REDIS_HOST
})



module.exports = redisConnection