let IoRedis = require('ioredis');

class RedisPubSup {
    /**
     * 初始化实例 
     * @param {String} url - redis://:authpassword@127.0.0.1:6380/4 
     */
    constructor (url = '') {
        this.redis = new IoRedis(url);
    }
    /**
     * 订阅一个或多个符合给定模式的频道。
     * @param {String} patterns - 频道值
     * @returns  - 接收到的信息。
     */
    psubscribe (...patterns) {
        return this.redis.psubscribe(patterns);
    }
    /**
     * 退订所有给定模式的频道。
     * @param {String} patterns - 频道值
     * @returns  - 这个命令在不同的客户端中有不同的表现。
     */
    punsubscribe (...patterns) {
        return this.redis.punsubscribe(patterns);
    }
    /**
     * 订阅给定的一个或多个频道的信息。
     * @param {String} channels - 频道值
     * @returns  - 接收到的信息
     */
    subscribe (...channels) {
        return this.redis.subscribe(channels);
    }
    /**
     * 退订给定的一个或多个频道的信息。
     * @param {String} channels - 频道值
     * @returns  - 这个命令在不同的客户端中有不同的表现。
     */
    unsubscribe (...channels) {
        return this.redis.unsubscribe(channels);
    }
    /**
     * 将信息发送到指定的频道。
     * @param {String} channel - 频道值
     * @param {String} message - 消息
     * @returns  - 接收到信息的订阅者数量。
     */
    publish (channel, message) {
        return this.redis.publish(channel, message);
    }
    /**
     * 查看订阅与发布系统状态，它由数个不同格式的子命令组成。(没理解)
     * PUBSUB <subcommand> [argument [argument ...]]
     * @param {String} argv - 参数
     * @returns  - 由活跃频道组成的列表。
     */
    pubsub (...argv) {
        return this.redis.pubsub(argv);
    }
    /**
     * 获取发布的消息。此方法为ioredis获取消息的方法，详情可查看文档。这应该属于一个监听，使用promise出乎预期控制！
     * https://www.npmjs.com/package/ioredis
     * @param {String} type - 消息类型 message | pmessage | messageBuffer | pmessageBuffer 分别对应 subscribe 和 psubscribe
     */
    on (type = 'message', db) {
        this.redis.on(type, db);
    }
}

module.exports = RedisPubSup;