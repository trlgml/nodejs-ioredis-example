let IoRedis = require('ioredis');

class RedisHash {
    /**
     * 初始化实例 
     * @param {String} url - redis://:authpassword@127.0.0.1:6380/4 
     */
    constructor (url = '') {
        this.redis = new IoRedis(url);
    }
    /**
     * 哈希表中的字段赋值 。如果哈希表不存在，一个新的哈希表被创建并进行 HSET 操作。如果字段已经存在于哈希表中，旧值将被覆盖。
     * @param {String} key - 哈希表值
     * @param {String} field - 字段
     * @param {String} value - 值
     * @returns  - 如果字段是哈希表中的一个新建字段，并且值设置成功，返回 1 。 如果哈希表中域字段已经存在且旧值已被新值覆盖，返回 0 。
     */
    hset(key, field, value) {
        return this.redis.hset(key, field, value);
    }
    /**
     * 为哈希表中不存在的的字段赋值 。如果哈希表不存在，一个新的哈希表被创建并进行 HSET 操作。如果字段已经存在于哈希表中，操作无效。如果 key 不存在，一个新哈希表被创建并执行 HSETNX 命令。
     * @param {String} key - 哈希表值
     * @param {String} field - 字段
     * @param {String} value - 值
     * @returns  - 设置成功，返回 1 。 如果给定字段已经存在且没有操作被执行，返回 0 。
     */
    hsetnx(key, field, value) {
        return this.redis.hsetnx(key, field, value);
    }
    /**
     * 返回哈希表所有字段的值。
     * @param {String} key - 哈希表值
     * @returns  - 一个包含哈希表中所有值的表。 当 key 不存在时，返回一个空表。
     */
    hvals(key) {
        return this.redis.hvals(key);
    }
    /**
     * 同时将多个 field-value (字段-值)对设置到哈希表中。此命令会覆盖哈希表中已存在的字段。如果哈希表不存在，会创建一个空哈希表，并执行 HMSET 操作。
     * @param {String} key - 哈希表值
     * @param {String} fk - field-value (字段-值)对
     * @returns  - 如果命令执行成功，返回 OK 。
     */
    hmset(key, ...fk) {
        return this.redis.hmset(key, fk);
    }
    /**
     * 返回哈希表中，一个或多个给定字段的值。如果指定的字段不存在于哈希表，那么返回一个 nil 值。
     * @param {String} key - 哈希表值
     * @param {String} fields - 字段
     * @returns  - 一个包含多个给定字段关联值的表，表值的排列顺序和指定字段的请求顺序一样。
     */
    hmget(key, ...fields) {
        return this.redis.hmget(key, fields);
    }
    /**
     * 获取哈希表中字段的数量
     * @param {String} key - 哈希表值
     * @returns  - 哈希表中字段的数量。 当 key 不存在时，返回 0 。
     */
    hlen(key) {
        return this.redis.hlen(key);
    }
    /**
     * 获取哈希表中的所有字段名。
     * @param {String} key - 哈希表值
     * @returns  - 包含哈希表中所有字段的列表。 当 key 不存在时，返回一个空列表。
     */
    hkeys(key) {
        return this.redis.hkeys(key);
    }
    /**
     * 为哈希表中的字段值加上指定增量值。增量也可以为负数，相当于对指定字段进行减法操作。如果哈希表的 key 不存在，一个新的哈希表被创建并执行 HINCRBY 命令。
     * 如果指定的字段不存在，那么在执行命令前，字段的值被初始化为 0 。对一个储存字符串值的字段执行 HINCRBY 命令将造成一个错误。
     * @param {String} key - 哈希表值
     * @param {String} field - 字段
     * @param {String} incr - 增值
     * @returns  - 执行 HINCRBY 命令之后，哈希表中字段的值。
     */
    hincrby(key, field, incr) {
        return this.redis.hincrby(key, field, incr);
    }
    /**
     * 为哈希表中的字段值加上指定浮点数增量值。如果指定的字段不存在，那么在执行命令前，字段的值被初始化为 0 。
     * @param {String} key - 哈希表值
     * @param {String} field - 字段
     * @param {String} incr - 增值
     * @returns  - 执行 Hincrbyfloat 命令之后，哈希表中字段的值。
     */
    hincrbyfloat(key, field, incr) {
        return this.redis.hincrbyfloat(key, field, incr);
    }
    /**
     * 返回哈希表中，所有的字段和值。在返回值里，紧跟每个字段名(field name)之后是字段的值(value)，所以返回值的长度是哈希表大小的两倍。
     * @param {String} key - 哈希表值
     * @returns  - 以列表形式返回哈希表的字段及字段值。 若 key 不存在，返回空列表。
     */
    hgetall(key) {
        return this.redis.hgetall(key);
    }
    /**
     * 哈希表中指定字段的值。
     * @param {String} key - 哈希表值
     * @param {String} field - 字段
     * @returns  - 返回给定字段的值。如果给定的字段或 key 不存在时，返回 nil 。
     */
    hget(key, field) {
        return this.redis.hget(key, field);
    }
    /**
     * 查看哈希表的指定字段是否存在。
     * @param {String} key - 哈希表值
     * @param {String} field - 字段
     * @returns  - 如果哈希表含有给定字段，返回 1 。 如果哈希表不含有给定字段，或 key 不存在，返回 0 。
     */
    hexists(key, field) {
        return this.redis.hexists(key, field);
    }
    /**
     * 用于删除哈希表 key 中的一个或多个指定字段，不存在的字段将被忽略。
     * @param {String} key - 哈希表值
     * @param {String} fields - 字段
     * @returns  - 被成功删除字段的数量，不包括被忽略的字段。
     */
    hdel(key, ...fields) {
        return this.redis.hdel(key, fields);
    }
}

module.exports = RedisHash;