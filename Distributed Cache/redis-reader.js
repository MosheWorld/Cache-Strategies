const Redis = require('ioredis');
const config = require('./config.json');

const redis = new Redis({
    host: config.host,
    port: config.port,
    password: config.password
});

const MY_KEY = 'myKey';

async function getRedisKey() {
    try {
        const value = await redis.get(MY_KEY);
        console.log('Retrieved value:', value);
    } catch (error) {
        console.error('Failed to get key:', error);
    }
}

async function main() {
    await getRedisKey();
    redis.quit();
}

main();
