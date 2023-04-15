const { Cache } = require('./cache.js');

const myCache = new Cache(); // expires after 30 minutes by default

// Add objects to the cache with default expiration time
myCache.put('myKey1', { myValue: 'hello' });
myCache.put('myKey2', { myValue: 'world' });

// Add an object to the cache with a custom expiration time
myCache.put('myKey3', { myValue: 'foo' }, 5 * 1000); // expires after 5 seconds

// Retrieve objects from the cache
const myObject1 = myCache.get('myKey1');
const myObject2 = myCache.get('myKey2');
const myObject3 = myCache.get('myKey3');

console.log(myObject1); // { myValue: 'hello' }
console.log(myObject2); // { myValue: 'world' }
console.log(myObject3); // { myValue: 'foo' }

// Wait for 6 seconds (longer than the expiration time of myKey3)
setTimeout(() => {
    const myObject3Expired = myCache.get('myKey3');
    console.log(myObject3Expired); // null
}, 6000);
