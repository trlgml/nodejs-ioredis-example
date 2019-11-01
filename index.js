let IoRedis = require('ioredis');
/**
 * ioredis Git地址
 * https://www.npmjs.com/package/ioredis
 */

class Redis {
    /**
     * 初始化实例 
     * @param {String} url - redis://:authpassword@127.0.0.1:6380/4 
     */
    constructor (url = '') {
        this.redis = new IoRedis(url);
    }
    /**
     * 支持事务
     * Multi 命令用于标记一个事务块的开始.Exec 命令用于执行所有事务块内的命令.Discard 命令用于取消事务，放弃执行事务块内的所有命令
     * Watch 命令用于监视一个(或多个) key ，如果在事务执行之前这个(或这些) key 被其他命令所改动，那么事务将被打断
     * Unwatch 命令用于取消 WATCH 命令对所有 key 的监视。
     */
}

module.exports = Redis;