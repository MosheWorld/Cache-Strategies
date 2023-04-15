/**
 * Represents a cache that stores key-value pairs for a certain amount of time.
 * When the expiration time is reached, the key-value pair is automatically removed from the cache.
 */
class Cache {
    /**
     * Creates a new Cache instance with the given expiration time (in milliseconds).
     * @param {number} expirationTime - The expiration time for key-value pairs in the cache.
     * Defaults to 30 minutes (30 * 60 * 1000 milliseconds).
     */
    constructor(expirationTime = 30 * 60 * 1000) {
        /**
         * The internal Map object that stores the key-value pairs in the cache.
         * @type {Map}
         * @private
         */
        this.cache = new Map();

        /**
         * The expiration time for key-value pairs in the cache (in milliseconds).
         * @type {number}
         * @private
         */
        this.expirationTime = expirationTime;
    }

    /**
     * Adds a key-value pair to the cache with the given expiration time (in milliseconds).
     * @param {*} key - The key for the key-value pair.
     * @param {*} value - The value for the key-value pair.
     * @param {number} expirationTime - The expiration time for the key-value pair (in milliseconds).
     * If not specified, the default expiration time for the cache will be used.
     */
    put(key, value, expirationTime = this.expirationTime) {
        const now = new Date().getTime();
        const expiration = now + expirationTime;

        this.cache.set(key, { value, expiration });
    }

    /**
     * Gets the value for the given key from the cache, if it exists and has not expired.
     * @param {*} key - The key to look up in the cache.
     * @returns {*} The value for the key, if it exists and has not expired; otherwise, null.
     */
    get(key) {
        const now = new Date().getTime();
        const cached = this.cache.get(key);

        if (cached && cached.expiration > now) {
            return cached.value;
        }

        this.cache.delete(key);
        return null;
    }

    /**
     * Removes the key-value pair with the given key from the cache, if it exists.
     * @param {*} key - The key to remove from the cache.
     * @returns {boolean} true if the key-value pair was removed from the cache; otherwise, false.
     */
    delete(key) {
        return this.cache.delete(key);
    }

    /**
     * Removes all key-value pairs from the cache.
     */
    clear() {
        this.cache.clear();
    }

    /**
     * Returns an array of all the keys in the cache.
     * @returns {Array} An array of all the keys in the cache.
     */
    keys() {
        return [...this.cache.keys()];
    }

    /**
     * Returns the number of key-value pairs currently in the cache.
     * @returns {number} The number of key-value pairs currently in the cache.
     */
    size() {
        return this.cache.size;
    }
}

module.exports = {
    Cache
};
