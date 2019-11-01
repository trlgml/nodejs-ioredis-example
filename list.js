let IoRedis = require('ioredis');

class RedisList {
    /**
     * 初始化实例 
     * @param {String} url - redis://:authpassword@127.0.0.1:6380/4 
     */
    constructor (url = '') {
        this.redis = new IoRedis(url);
    }
    /**
     * 将一个或多个值插入到列表头部。 如果 key 不存在，一个空列表会被创建并执行 LPUSH 操作。 当 key 存在但不是列表类型时，返回一个错误。
     * @param {String} key - 列表值
     * @param {String} values - 值（可以多个）
     * @returns  - 执行 LPUSH 命令后，列表的长度。
     */
    lpush(key, ...values) {
        return this.redis.lpush(key, values);
    }
    /**
     * 将一个或多个值插入到列表的尾部(最右边)。如果列表不存在，一个空列表会被创建并执行 RPUSH 操作。 当列表存在但不是列表类型时，返回一个错误。
     * @param {String} key - 列表值
     * @param {String} values - 值（可以多个）
     * @returns  - 执行 RPUSH 操作后，列表的长度。
     */
    rpush(key, ...values) {
        return this.redis.rpush(key, values);
    }
    /**
     * 移出并获取列表的第一个元素， 如果列表没有元素会阻塞列表直到等待超时或发现可弹出元素为止。
     * @param {String} key - 列表值
     * @param {String} time - 阻塞时长，默认一直阻塞
     * @returns  - 如果列表为空，返回一个 nil 。 否则，返回一个含有两个元素的列表，第一个元素是被弹出元素所属的 key ，第二个元素是被弹出元素的值。
     */
    blpop(key, time = 0) {
        return this.redis.blpop(key, time);
    }
    /**
     * 移出并获取列表的最后一个元素， 如果列表没有元素会阻塞列表直到等待超时或发现可弹出元素为止。
     * @param {String} key - 列表值
     * @param {String} time - 阻塞时长，默认一直阻塞
     * @returns  - 假如在指定时间内没有任何元素被弹出，则返回一个 nil 和等待时长。 反之，返回一个含有两个元素的列表，第一个元素是被弹出元素所属的 key ，第二个元素是被弹出元素的值。
     */
    brpop(key, time = 0) {
        return this.redis.brpop(key, time);
    }
    /**
     * 列表中弹出一个值，将弹出的元素插入到另外一个列表中并返回它； 如果列表没有元素会阻塞列表直到等待超时或发现可弹出元素为止。
     * @param {String} key - 列表值
     * @param {String} another_key - 另一个列表
     * @param {String} time - 阻塞时长，默认一直阻塞
     * @returns  - 假如在指定时间内没有任何元素被弹出，则返回一个 nil 和等待时长。 反之，返回一个含有两个元素的列表，第一个元素是被弹出元素的值，第二个元素是等待时长。
     */
    brpoplpush(key, another_key, time = 0) {
        return this.redis.brpoplpush(key, another_key, time);
    }
    /**
     * 移除列表的最后一个元素，并将该元素添加到另一个列表并返回。
     * @param {String} key - 列表值
     * @param {String} another_key - 另一个列表
     * @returns  - 被弹出的元素。
     */
    rpoplpush(key, another_key) {
        return this.redis.rpoplpush(key, another_key);
    }
    /**
     * 通过索引获取列表中的元素。你也可以使用负数下标，以 -1 表示列表的最后一个元素， -2 表示列表的倒数第二个元素，以此类推。
     * @param {String} key - 列表值
     * @param {String} index - 下标
     * @returns  - 列表中下标为指定索引值的元素。 如果指定索引值不在列表的区间范围内，返回 nil 。
     */
    lindex(key, index) {
        return this.redis.lindex(key, index);
    }
    /**
     * 在列表的元素前或者后插入元素。 当指定元素不存在于列表中时，不执行任何操作。 当列表不存在时，被视为空列表，不执行任何操作。 如果 key 不是列表类型，返回一个错误。
     * @param {String} key - 列表值
     * @param {String} old_value - 旧值
     * @param {String} new_value - 新插入的值
     * @param {String} postion - 位置 AFTER || BEFORE
     * @returns  - 如果命令执行成功，返回插入操作完成之后，列表的长度。 如果没有找到指定元素 ，返回 -1 。 如果 key 不存在或为空列表，返回 0 。
     */
    linsert(key, old_value, new_value, postion = 'AFTER') {
        return this.redis.linsert(key, postion , old_value, new_value);
    }
    /**
     * 返回列表的长度。 如果列表 key 不存在，则 key 被解释为一个空列表，返回 0 。 如果 key 不是列表类型，返回一个错误。
     * @param {String} key - 列表值
     * @returns  - 列表的长度。
     */
    llen(key) {
        return this.redis.llen(key);
    }
    /**
     * 移除并返回列表的第一个元素。
     * @param {String} key - 列表值
     * @returns  - 列表的第一个元素。 当列表 key 不存在时，返回 nil 。
     */
    lpop(key) {
        return this.redis.lpop(key);
    }
    /**
     * 移除并返回列表的最后一个元素
     * @param {String} key - 列表值
     * @returns  -列表的最后一个元素。 当列表不存在时，返回 nil 
     */
    rpop(key) {
        return this.redis.rpop(key);
    }
    /**
     * 将一个或多个值插入到已存在的列表头部，列表不存在时操作无效。
     * @param {String} key - 列表值
     * @param {String} values - 值（可以多个）
     * @returns  - LPUSHX 命令执行之后，列表的长度。
     */
    lpushx(key, ...values) {
        return this.redis.lpushx(key, values);
    }
    /**
     * 将一个或多个值插入到已存在的列表尾部(最右边)。如果列表不存在，操作无效。
     * @param {String} key - 列表值
     * @param {String} values - 值（可以多个）
     * @returns  - 执行 Rpushx 操作后，列表的长度。
     */
    rpushx(key, ...values) {
        return this.redis.rpushx(key, values);
    }
    /**
     * 返回列表中指定区间内的元素，区间以偏移量 START 和 END 指定。 
     * 其中 0 表示列表的第一个元素， 1 表示列表的第二个元素，以此类推。 
     * 你也可以使用负数下标，以 -1 表示列表的最后一个元素， -2 表示列表的倒数第二个元素，以此类推。
     * @param {String} key - 列表值
     * @param {String} start - 开始位置
     * @param {String} end - 结束位置
     * @returns  - 一个列表，包含指定区间内的元素。
     */
    lrange(key, start, end) {
        return this.redis.lrange(key, start, end);
    }
    /**
     * 根据参数 COUNT 的值，移除列表中与参数 VALUE 相等的元素。
     * COUNT 的值可以是以下几种：
     * count > 0 : 从表头开始向表尾搜索，移除与 VALUE 相等的元素，数量为 COUNT 。
     * count < 0 : 从表尾开始向表头搜索，移除与 VALUE 相等的元素，数量为 COUNT 的绝对值。
     * count = 0 : 移除表中所有与 VALUE 相等的值。
     * @param {String} key - 列表值
     * @param {String} count - 数量
     * @param {String} value - 值
     * @returns  - 被移除元素的数量。 列表不存在时返回 0 
     */
    lrem(key, count, value) {
        return this.redis.lrem(key, count, value);
    }
    /**
     * 通过索引来设置元素的值。当索引参数超出范围，或对一个空列表进行 LSET 时，返回一个错误。
     * @param {String} key - 列表值
     * @param {String} index - 下标
     * @param {String} value - 值
     * @returns  - 操作成功返回 ok ，否则返回错误信息。
     */
    lset(key, index, value) {
        return this.redis.lset(key, index, value);
    }
    /**
     * 对一个列表进行修剪(trim)，就是说，让列表只保留指定区间内的元素，不在指定区间之内的元素都将被删除
     * 下标 0 表示列表的第一个元素，以 1 表示列表的第二个元素，以此类推。 
     * 你也可以使用负数下标，以 -1 表示列表的最后一个元素， -2 表示列表的倒数第二个元素，以此类推。
     * @param {String} key - 列表值
     * @param {String} start - 下标
     * @param {String} stop - 值
     * @returns  - 命令执行成功时，返回 ok 。
     */
    ltrim(key, start, stop) {
        return this.redis.ltrim(key, start, stop);
    }
}

module.exports = RedisList;