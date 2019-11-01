let IoRedis = require('ioredis');

/**
 * HyperLogLog并不是一种新的数据结构（实际类型为字符串类型），而是一种基数算法，
 * 通过HyperLogLog可以利用极小的内存空间完成独立总数的统计，数据集可以是ip、Email、ID等。
 */
class RedisHyper {
    /**
     * 初始化实例 
     * @param {String} url - redis://:authpassword@127.0.0.1:6380/4 
     */
    constructor (url = '') {
        this.redis = new IoRedis(url);
    }
    /**
     * 将所有元素参数添加到 HyperLogLog 数据结构中。
     * @param {String} key - HyperLogLog的key
     * @param {String} elements - 值
     * @returns  - 整型，如果至少有个元素被添加返回 1， 否则返回 0。
     */
    pfadd (key, ...elements) {
        return this.redis.pfadd(key, elements);
    }
    /**
     * 返回给定 HyperLogLog 的基数估算值。
     * @param {String} keys - HyperLogLog的key
     * @returns  - 整数，返回给定 HyperLogLog 的基数值，如果多个 HyperLogLog 则返回基数估值之和。
     */
    pfcount (...keys) {
        return this.redis.pfcount(keys);
    }
    /**
     * 将多个 HyperLogLog 合并为一个 HyperLogLog ，合并后的 HyperLogLog 的基数估算值是通过对所有 给定 HyperLogLog 进行并集计算得出的。
     * @param {String} key - HyperLogLog的key
     * @param {String} keys - 待合并HyperLogLog的key
     * @returns  - 返回 OK。
     */
    pfmerge (key, ...keys) {
        return this.redis.pfmerge(key, keys);
    }
}

module.exports = RedisHyper;