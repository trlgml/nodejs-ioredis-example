let IoRedis = require('ioredis');

class RedisSet {
    /**
     * 初始化实例 
     * @param {String} url - redis://:authpassword@127.0.0.1:6380/4 
     */
    constructor (url = '') {
        this.redis = new IoRedis(url);
    }
    /**
     * 将一个或多个成员元素加入到集合中，已经存在于集合的成员元素将被忽略。假如集合 key 不存在，则创建一个只包含添加的元素作成员的集合。当集合 key 不是集合类型时，返回一个错误.
     * @param {String} key - 集合值
     * @param {String} values - 值（可以多个）
     * @returns  - 被添加到集合中的新元素的数量，不包括被忽略的元素。
     */
    sadd(key, ...values) {
        return this.redis.sadd(key, values);
    }
    /**
     * 返回集合中元素的数量。
     * @param {String} key - 集合值
     * @returns  - 集合的数量。 当集合 key 不存在时，返回 0 
     */
    scard(key) {
        return this.redis.scard(key);
    }
    /**
     * 给定集合之间的差集。不存在的集合 key 将视为空集。
     * @param {String} keys - 需要比对的集合
     * @returns  - 包含差集成员的列表。
     */
    sdiff(...keys) {
        return this.redis.sdiff(keys);
    }
    /**
     * 将给定集合之间的差集存储在指定的集合中。如果指定的集合 key 已存在，则会被覆盖。
     * @param {String} key - 要存储的集合值
     * @param {String} another_keys - 需要比对的集合
     * @returns  - 结果集中的元素数量。
     */
    sdiffstore(key, ...another_keys) {
        return this.redis.sdiffstore(key, another_keys);
    }
    /**
     * 给定集合的并集。不存在的集合 key 被视为空集。
     * @param {String} keys - 需要比对的集合
     * @returns  - 并集成员的列表。
     */
    sunion(...keys) {
        return this.redis.sunion(keys);
    }
    /**
     * 将给定集合的并集存储在指定的集合中。
     * @param {String} key - 要存储的集合值
     * @param {String} another_keys - 需要比对的集合
     * @returns  - 结果集中的元素数量
     */
    sunionstore(key, ...another_keys) {
        return this.redis.sunionstore(key, another_keys);
    }
    /**
     * 判断成员元素是否是集合的成员。
     * @param {String} key - 集合值
     * @param {String} value - 成员
     * @returns  - 如果成员元素是集合的成员，返回 1 。 如果成员元素不是集合的成员，或 key 不存在，返回 0 。
     */
    sismember(key, value) {
        return this.redis.sismember(key, value);
    }
    /**
     * 返回集合中的所有的成员。 不存在的集合 key 被视为空集合。
     * @param {String} key - 集合值
     * @returns  - 集合中的所有成员。
     */
    smembers(key) {
        return this.redis.smembers(key);
    }
    /**
     * 将指定成员 member 元素从 source 集合移动到 destination 集合。SMOVE 是原子性操作。
     * 如果 source 集合不存在或不包含指定的 member 元素，则 SMOVE 命令不执行任何操作，仅返回 0 。
     * 否则， member 元素从 source 集合中被移除，并添加到 destination 集合中去。
     * 当 destination 集合已经包含 member 元素时， SMOVE 命令只是简单地将 source 集合中的 member 元素删除。
     * 当 source 或 destination 不是集合类型时，返回一个错误。
     * @param {String} key - 集合值
     * @param {String} another_key - 另一个集合
     * @param {String} value - 成员值
     * @returns  - 如果成员元素被成功移除，返回 1 。 如果成员元素不是 source 集合的成员，并且没有任何操作对 destination 集合执行，那么返回 0 。
     */
    smove(key, another_key, value) {
        return this.redis.smove(key, another_key, value);
    }
    /**
     * 移除并返回集合中的一个随机元素。
     * @param {String} key - 集合值
     * @returns  - 被移除的随机元素。 当集合不存在或是空集时，返回 nil 。
     */
    spop(key) {
        return this.redis.spop(key);
    }
    /**
     * 返回集合中的一个随机元素。
     * Srandmember 命令接受可选的 count 参数：
     * 如果 count 为正数，且小于集合基数，那么命令返回一个包含 count 个元素的数组，数组中的元素各不相同。如果 count 大于等于集合基数，那么返回整个集合。
     * 如果 count 为负数，那么命令返回一个数组，数组中的元素可能会重复出现多次，而数组的长度为 count 的绝对值。
     * 该操作和 SPOP 相似，但 SPOP 将随机元素从集合中移除并返回，而 Srandmember 则仅仅返回随机元素，而不对集合进行任何改动。
     * @param {String} key - 集合值
     * @param {String} count - 数量
     * @returns  - 只提供集合 key 参数时，返回一个元素；如果集合为空，返回 nil 。 如果提供了 count 参数，那么返回一个数组；如果集合为空，返回空数组。
     */
    srandmember (key, count = 1) {
        return this.redis.srandmember(key, count);
    }
    /**
     * 移除集合中的一个或多个成员元素，不存在的成员元素会被忽略。当 key 不是集合类型，返回一个错误。
     * @param {String} key - 集合值
     * @param {String} values - 成员值
     * @returns  - 被成功移除的元素的数量，不包括被忽略的元素
     */
    srem (key, ...values) {
        return this.redis.srem(key, values);
    }
    /**
     * 迭代集合键中的元素。(没理解)
     * SSCAN KEY [MATCH pattern] [COUNT count]
     * @param {String} key - 集合值
     * @returns  - 数组列表。
     */
    // sscan (key) {
    //     return this.redis.sscan(key);
    // }
}

module.exports = RedisSet;