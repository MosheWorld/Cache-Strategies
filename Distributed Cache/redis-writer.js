const Redis = require('ioredis');
const config = require('./config.json');

const redis = new Redis({
  host: config.host,
  port: config.port,
  password: config.password
});

const MY_KEY = 'myKey';
const EXPIRATION_TIME = 10; // export expiration time to constant in seconds

async function setRedisKey() {
  try {
    await redis.set(MY_KEY, 'Hello, Redis!', 'EX', EXPIRATION_TIME); // set the key with the expiration time
    console.log('Finished settings the key to Redis successfully');
  } catch (error) {
    console.error('Failed to set key:', error);
  }
}

async function main() {
  await setRedisKey();
  redis.quit();
}

main();
