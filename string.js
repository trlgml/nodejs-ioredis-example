let IoRedis = require('ioredis');

class RedisString {
    /**
     * 初始化实例 
     * @param {String} url - redis://:authpassword@127.0.0.1:6380/4 
     */
    constructor (url = '') {
        this.redis = new IoRedis(url);
    }
    /**
     * 设置给定 key 的值。如果 key 已经存储其他值， SET 就覆写旧值，且无视类型。
     * @param {String} key - key值
     * @param {String} value - value值
     * @returns  - 在 Redis 2.6.12 以前版本， SET 命令总是返回 OK 。 从 Redis 2.6.12 版本开始， SET 在设置操作成功完成时，才返回 OK 。
     */
    set(key, value) {
        return this.redis.set(key, value);
    }
    /**
     * 为指定的 key 设置值及其过期时间。如果 key 已经存在， SETEX 命令将会替换旧的值。
     * @param {String} key - key值
     * @param {Number} timeout  - 单位秒
     * @param {String} value - value值
     * @returns  - 设置成功时返回 OK 。
     */
    setex(key, time = 0, value) {
        return this.redis.setex(key, time, value);
    }
    /**
     * 为指定的 key 设置值及其过期时间。如果 key 已经存在， SETEX 命令将会替换旧的值。
     * @param {String} key - key值
     * @param {Number} timeout  - 单位毫秒
     * @param {String} value - value值
     * @returns  - 设置成功时返回 OK 。
     */
    psetex(key, time = 0, value) {
        return this.redis.psetex(key, time, value);
    }
    /**
     * 指定的 key 不存在时，为 key 设置指定的值。
     * @param {String} key  - key值
     * @param {String} value - value值
     * @returns  - 设置成功，返回 1 。 设置失败，返回 0 。
     */
    setnx(key, value) {
        return this.redis.setnx(key, value);
    }
    /**
     * 指定的字符串覆盖给定 key 所储存的字符串值，覆盖的位置从偏移量 offset 开始。
     * @param {String} key - key值
     * @param {String} offset - 偏移量
     * @param {String} value - value值
     * @returns - 被修改后的字符串长度。
     */
    setrange(key, offset = 0, value) {
        return this.redis.setrange(key, offset, value);
    }
    /**
     * 获取指定 key 的值。
     * @param {String} key - key值
     * @returns - 返回 key 的值，如果 key 不存在时，返回 nil。 如果 key 不是字符串类型，那么返回一个错误。
     */
    get(key) {
        return this.redis.get(key);
    }
    /**
     * 获取存储在指定 key 中字符串的子字符串。字符串的截取范围由 start 和 end 两个偏移量决定(包括 start 和 end 在内)。
     * @param {String} key - key值
     * @param {Number} start - 开始下标
     * @param {Number} end - 结束下标
     * @returns - 截取得到的子字符串。
     */
    getrange(key, start = 0, end = -1) {
        return this.redis.getrange(key, start, end);
    }
    /**
     * 设置指定 key 的值，并返回 key 旧的值。当 key 没有旧值时，即 key 不存在时，返回 nil 。
     * @param {String} key - key值
     * @param {String} value - value值
     * @returns - 返回给定 key 的旧值。 当 key 没有旧值时，即 key 不存在时，返回 nil 。当 key 存在但不是字符串类型时，返回一个错误。
     */
    getset(key, value) {
        return this.redis.getset(key, value);
    }
    /**
     * 对 key 所储存的字符串值，获取指定偏移量上的位(bit)。
     * @param {*} key - key值
     * @param {*} offset - 偏移量
     * @returns - 字符串值指定偏移量上的位(bit)。当偏移量 OFFSET 比字符串值的长度大，或者 key 不存在时，返回 0 。
     */
    getbit(key, offset = 0) {
        return this.redis.getbit(key, offset);
    }
    /**
     * 对 key 所储存的字符串值，设置或清除指定偏移量上的位(bit)。
     * @param {*} key - key值
     * @param {*} offset - 偏移量
     * @returns -  指定偏移量原来储存的位。
     */
    setbit(key, offset = 0) {
        return this.redis.setbit(key, offset);
    }
    /**
     * 用于同时设置一个或多个 key-value 对。
     * @param  {...any} keys
     * @returns - 总是返回 OK 
     */
    mset(...keys) {
        return this.redis.mset(keys);
    }
    /**
     * 所有给定 key 都不存在时，同时设置一个或多个 key-value 对。
     * @param  {...any} keys
     * @returns - 当所有 key 都成功设置，返回 1 。 如果所有给定 key 都设置失败(至少有一个 key 已经存在)，那么返回 0 。
     */
    msetnx(...keys) {
        return this.redis.msetnx(keys);
    }
    /**
     * 返回所有(一个或多个)给定 key 的值。 如果给定的 key 里面，有某个 key 不存在，那么这个 key 返回特殊值 nil 。
     * @param  {...any} keys
     * @returns -  一个包含所有给定 key 的值的列表。
     */
    mget(...keys) {
        return this.redis.mget(keys);
    }
    /**
     * 获取指定 key 所储存的字符串值的长度。当 key 储存的不是字符串值时，返回一个错误。
     * @param  {String} key - key值
     * @returns  - 字符串值的长度。 当 key 不存在时，返回 0。
     */
    strlen(key) {
        return this.redis.strlen(key);
    }
    /**
     * 将 key 中储存的数字值增一。如果 key 不存在，那么 key 的值会先被初始化为 0 ，然后再执行 INCR 操作。如果值包含错误的类型，或字符串类型的值不能表示为数字，那么返回一个错误。
     * @param  {String} key - key值
     * @returns  - 执行 INCR 命令之后 key 的值。
     */
    incr(key) {
        return this.redis.incr(key);
    }
    /**
     * 为 key 中储存的数字加上指定的增量值。如果 key 不存在，那么 key 的值会先被初始化为 0 ，然后再执行 INCRBY 操作。如果值包含错误的类型，或字符串类型的值不能表示为数字，那么返回一个错误。
     * @param  {String} key - key值
     * @param  {Number} rank - 增量值
     * @returns  - 执行 INCRBY 命令之后 key 的值。
     */
    incrby(key, rank = 1) {
        return this.redis.incrby(key, rank);
    }
    /**
     * 为 key 中所储存的值加上指定的浮点数增量值。如果 key 不存在，那么 INCRBYFLOAT 会先将 key 的值设为 0 ，再执行加法操作。
     * @param  {String} key - key值
     * @param  {Number} rank - 增量值
     * @returns  - 执行 INCRBYFLOAT 命令之后 key 的值。
     */
    incrbyfloat(key, rank = 1) {
        return this.redis.incrbyfloat(key, rank);
    }
    /**
     * 将 key 中储存的数字值减一。如果 key 不存在，那么 key 的值会先被初始化为 0 ，然后再执行 INCR 操作。如果值包含错误的类型，或字符串类型的值不能表示为数字，那么返回一个错误。
     * @param  {String} key - key值
     * @returns  - 执行 DECR 命令之后 key 的值。
     */
    decr(key) {
        return this.redis.decr(key);
    }
    /**
     * 为 key 中储存的数字加上指定的减量值。如果 key 不存在，那么 key 的值会先被初始化为 0 ，然后再执行 INCRBY 操作。如果值包含错误的类型，或字符串类型的值不能表示为数字，那么返回一个错误。
     * @param  {String} key - key值
     * @param  {Number} rank - 增量值
     * @returns  - 执行 DECRBY 命令之后 key 的值。
     */
    decrby(key, rank = 1) {
        return this.redis.decrby(key, rank);
    }
    /**
     * 为指定的 key 追加值。如果 key 已经存在并且是一个字符串， APPEND 命令将 value 追加到 key 原来的值的末尾。如果 key 不存在， APPEND 就简单地将给定 key 设为 value ，就像执行 SET key value 一样。
     * @param {*} key - key值
     * @param {*} value - value值
     * @returns  - 追加指定值之后， key 中字符串的长度。
     */
    append(key, value) {
        return this.redis.append(key, value);
    }
}

module.exports = RedisString;