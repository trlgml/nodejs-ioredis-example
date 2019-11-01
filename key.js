let IoRedis = require('ioredis');

class RedisKey {
    /**
     * 初始化实例 
     * @param {String} url - redis://:authpassword@127.0.0.1:6380/4 
     */
    constructor (url = '') {
        this.redis = new IoRedis(url);
    }
    /**
     * 删除已存在的键。不存在的 key 会被忽略。
     * @param {String} key - key值
     * @returns  - 被删除 key 的数量。
     */
    del(key) {
        return this.redis.del(key);
    }
    /**
     * 序列化给定 key ，并返回被序列化的值。
     * @param {String} key - key值
     * @returns  - 如果 key 不存在，那么返回 nil 。 否则，返回序列化之后的值。
     */
    dump(key) {
        return this.redis.dump(key);
    }
    /**
     * 检查给定 key 是否存在。
     * @param {String} key - key值
     * @returns  - 若 key 存在返回 1 ，否则返回 0 。
     */
    exists(key) {
        return this.redis.exists(key);
    }
    /**
     * 设置 key 的过期时间。key 过期后将不再可用。
     * @param {String} key - key值
     * @param {String} time - 过期时间 单位秒
     * @returns  - 设置成功返回 1 。 当 key 不存在或者不能为 key 设置过期时间时(比如在低于 2.1.3 版本的 Redis 中你尝试更新 key 的过期时间)返回 0 。
     */
    expire(key, time) {
        return this.redis.expire(key, time);
    }
    /**
     * 以 UNIX 时间戳(unix timestamp)格式设置 key 的过期时间。key 过期后将不再可用。
     * @param {String} key - key值
     * @param {String} nuix - 过期时间 unix时间戳（秒）
     * @returns  - 设置成功返回 1 。 当 key 不存在或者不能为 key 设置过期时间时(比如在低于 2.1.3 版本的 Redis 中你尝试更新 key 的过期时间)返回 0 。
     */
    expireat(key, nuix) {
        return this.redis.expireat(key, nuix);
    }
    /**
     * 设置 key 的过期时间。key 过期后将不再可用。
     * @param {String} key - key值
     * @param {String} time - 过期时间 单位毫秒
     * @returns  - 设置成功返回 1 。 当 key 不存在或者不能为 key 设置过期时间时(比如在低于 2.1.3 版本的 Redis 中你尝试更新 key 的过期时间)返回 0 。
     */
    pexpire(key, time) {
        return this.redis.pexpire(key, time);
    }
    /**
     * 以 UNIX 时间戳(unix timestamp)格式设置 key 的过期时间。key 过期后将不再可用。
     * @param {String} key - key值
     * @param {String} nuix - 过期时间 unix时间戳（毫秒）
     * @returns  - 设置成功返回 1 。 当 key 不存在或者不能为 key 设置过期时间时(比如在低于 2.1.3 版本的 Redis 中你尝试更新 key 的过期时间)返回 0 。
     */
    pexpireat(key, nuix) {
        return this.redis.pexpireat(key, nuix);
    }
    /**
     * 查找所有符合给定模式 pattern 的 key 。
     * @param {String} pattern - pattern
     * @returns  - 符合给定模式的 key 列表 (Array)。
     */
    keys(pattern) {
        return this.redis.keys(pattern);
    }
    /**
     * 将当前数据库的 key 移动到给定的数据库 db 当中。
     * @param {String} key - key值
     * @param {String} db - 指定库
     * @returns  - 移动成功返回 1 ，失败则返回 0 。
     */
    move(key, db) {
        return this.redis.move(key, db);
    }
    /**
     * 移除给定 key 的过期时间，使得 key 永不过期。
     * @param {String} key - key值
     * @returns  - 当过期时间移除成功时，返回 1 。 如果 key 不存在或 key 没有设置过期时间，返回 0 。
     */
    persist(key) {
        return this.redis.persist(key);
    }
    /**
     * 以毫秒为单位返回 key 的剩余过期时间。
     * @param {String} key - key值
     * @returns  - 当 key 不存在时，返回 -2 。 当 key 存在但没有设置剩余生存时间时，返回 -1 。 否则，以毫秒为单位，返回 key 的剩余生存时间。
     */
    pttl(key) {
        return this.redis.pttl(key);
    }
    /**
     * 以秒为单位返回 key 的剩余过期时间。
     * @param {String} key - key值
     * @returns  - 当 key 不存在时，返回 -2 。 当 key 存在但没有设置剩余生存时间时，返回 -1 。 否则，以毫秒为单位，返回 key 的剩余生存时间。
     */
    ttl(key) {
        return this.redis.ttl(key);
    }
    /**
     * 从当前数据库中随机返回一个 key 。
     * @returns  - 当数据库不为空时，返回一个 key 。 当数据库为空时，返回 nil 。
     */
    randomkey() {
        return this.redis.randomkey();
    }
    /**
     * 用于修改 key 的名称 。
     * @param {String} old_key - 旧key值
     * @param {String} new_key - 新key值
     * @returns  - 改名成功时提示 OK ，失败时候返回一个错误。当 OLD_KEY_NAME 和 NEW_KEY_NAME 相同，或者 OLD_KEY_NAME 不存在时，返回一个错误。 当 NEW_KEY_NAME 已经存在时， RENAME 命令将覆盖旧值。
     */
    rename(old_key, new_key) {
        return this.redis.rename(old_key, new_key);
    }
    /**
     * 在新的 key 不存在时修改 key 的名称 。
     * @param {String} old_key - 旧key值
     * @param {String} new_key - 新key值
     * @returns  - 修改成功时，返回 1 。 如果 NEW_KEY_NAME 已经存在，返回 0 。
     */
    renamenx(old_key, new_key) {
        return this.redis.renamenx(old_key, new_key);
    }
    /**
     * 返回 key 所储存的值的类型
     * @param {String} key - key值
     * @returns  - 返回 key 的数据类型 none (key不存在) string (字符串) list (列表) set (集合) zset (有序集) hash (哈希表)
     */
    type(key) {
        return this.redis.type(key);
    }
}

module.exports = RedisKey;