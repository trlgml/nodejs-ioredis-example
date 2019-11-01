let IoRedis = require('ioredis');

class RedisSorted {
    /**
     * 初始化实例 
     * @param {String} url - redis://:authpassword@127.0.0.1:6380/4 
     */
    constructor (url = '') {
        this.redis = new IoRedis(url);
    }
    /**
     * 将一个或多个成员元素及其分数值加入到有序集当中。
     * 如果某个成员已经是有序集的成员，那么更新这个成员的分数值，并通过重新插入这个成员元素，来保证该成员在正确的位置上。分数值可以是整数值或双精度浮点数。
     * 如果有序集合 key 不存在，则创建一个空的有序集并执行 ZADD 操作。当 key 存在但不是有序集类型时，返回一个错误。
     * @param {String} key - 有序集
     * @param {String} svs - SCORE,VALUE对
     * @returns  - 被成功添加的新成员的数量，不包括那些被更新的、已经存在的成员。
     */
    zadd (key, ...svs) {
        return this.redis.zadd(key, svs);
    }
    /**
     * 计算集合中元素的数量。
     * @param {String} key - 有序集
     * @returns  - 当 key 存在且是有序集类型时，返回有序集的基数。 当 key 不存在时，返回 0 。
     */
    zcard (key) {
        return this.redis.zcard(key);
    }
    /**
     * 计算有序集合中指定分数区间的成员数量。
     * @param {String} key - 有序集
     * @param {String} min - 最小分
     * @param {String} max - 最大分
     * @returns  - 分数值在 min 和 max 之间的成员的数量
     */
    zcount (key, min = 0 , max = 0) {
        return this.redis.zcount(key, min, max);
    }
    /**
     * 对有序集合中指定成员的分数加上增量 increment
     * 可以通过传递一个负数值 increment ，让分数减去相应的值.当 key 不存在，或分数不是 key 的成员时， ZINCRBY key increment member 等同于 ZADD key increment member 。
     * 当 key 不是有序集类型时，返回一个错误。分数值可以是整数值或双精度浮点数。
     * @param {String} key - 有序集
     * @param {String} increment - 增加的值
     * @param {String} member - 成员
     * @returns  - member 成员的新分数值，以字符串形式表示。
     */
    zincrby (key, increment = 0, member) {
        return this.redis.zincrby(key, increment, member);
    }
    /**
     * 计算给定的一个或多个有序集的交集，其中给定 key 的数量必须以 numkeys 参数指定，并将该交集(结果集)储存到 destination 。
     * 默认情况下，结果集中某个成员的分数值是所有给定集下该成员分数值之和。
     * @param {String} key - 存储的有续集
     * @param {String} another_keys - 交集的有续集
     * @returns  - 保存到目标结果集的的成员数量
     */
    zinterstore (key, numkeys, ...another_keys) {
        return this.redis.zinterstore(key, numkeys, ...another_keys);
    }
    /**
     * 计算给定的一个或多个有序集的并集，其中给定 key 的数量必须以 numkeys 参数指定，并将该并集(结果集)储存到 destination 。
     * 默认情况下，结果集中某个成员的分数值是所有给定集下该成员分数值之和 。
     * @param {String} key - 存储的有续集
     * @param {String} another_keys - 交集的有续集
     * @returns  - 保存到目标结果集的的成员数量
     */
    zunionstore (key, numkeys, ...another_keys) {
        return this.redis.zunionstore(key, numkeys, ...another_keys);
    }
    /**
     * 计算有序集合中指定字典区间内成员数量。
     * @param {String} key - 有续集
     * @param {String} min - 字典A
     * @param {String} max - 字典B
     * @returns  - 指定区间内的成员数量。
     */
    zlexcount (key, min = '-' , max = '+') {
        return this.redis.zlexcount(key, min, max);
    }
    /**
     * 通过字典区间返回有序集合的成员。
     * @param {String} key - 有续集
     * @param {String} min - 字典A
     * @param {String} max - 字典B
     * @returns  - 指定区间内的元素列表。
     */
    zrangebylex (key, min = '-' , max = '+') {
        return this.redis.zrangebylex(key, min, max);
    }
    /**
     * 有序集中，指定区间内的成员。其中成员的位置按分数值递增(从小到大)来排序。具有相同分数值的成员按字典序(lexicographical order )来排列。
     * 如果你需要成员按值递减(从大到小)来排列，请使用 ZREVRANGE 命令。
     * 下标参数 start 和 stop 都以 0 为底，也就是说，以 0 表示有序集第一个成员，以 1 表示有序集第二个成员，以此类推。
     * 你也可以使用负数下标，以 -1 表示最后一个成员， -2 表示倒数第二个成员，以此类推。
     * @param {String} key - 有续集
     * @param {String} start - 开始下标
     * @param {String} stop - 结束下标
     * @returns  - 指定区间内，带有分数值(可选)的有序集成员的列表。
     */
    zrange (key, start = 0 , stop = 0) {
        return this.redis.zrange(key, start, stop);
    }
    /**
     * 有序集中，指定区间内的成员。其中成员的位置按分数值递减(从大到小)来排列。具有相同分数值的成员按字典序(lexicographical order )来排列。
     * 除了成员按分数值递减的次序排列这一点外， ZREVRANGE 命令的其他方面和 ZRANGE 命令一样。
     * @param {String} key - 有续集
     * @param {String} start - 开始下标
     * @param {String} stop - 结束下标
     * @returns  - 指定区间内，带有分数值(可选)的有序集成员的列表。
     */
    zrevrange (key, start = 0 , stop = 0) {
        return this.redis.zrevrange(key, start, stop);
    }
    /**
     * 返回有序集合中指定分数区间的成员列表。有序集成员按分数值递增(从小到大)次序排列。
     * 具有相同分数值的成员按字典序来排列(该属性是有序集提供的，不需要额外的计算)。
     * 默认情况下，区间的取值使用闭区间 (小于等于或大于等于)，你也可以通过给参数前增加 ( 符号来使用可选的开区间 (小于或大于)。
     * (5 10 表示  5 < score <= 10
     * @param {String} key - 有续集
     * @param {String} min - 最小分
     * @param {String} max - 最大分
     * @returns  - 指定区间内，带有分数值(可选)的有序集成员的列表。
     */
    zrangebyscore (key, min = 0 , max = 0) {
        return this.redis.zrangebyscore(key, min, max);
    }
    /**
     * 有序集中指定分数区间内的所有的成员。有序集成员按分数值递减(从大到小)的次序排列。具有相同分数值的成员按字典序的逆序(reverse lexicographical order )排列。
     * 除了成员按分数值递减的次序排列这一点外， ZREVRANGEBYSCORE 命令的其他方面和 ZRANGEBYSCORE 命令一样。
     * @param {String} key - 有续集
     * @param {String} min - 最小分
     * @param {String} max - 最大分
     * @returns  - 指定区间内，带有分数值(可选)的有序集成员的列表。
     */
    zrevrangebyscore (key, min = 0 , max = 0) {
        return this.redis.zrevrangebyscore(key, min, max);
    }
    /**
     * 返回有序集中指定成员的排名。其中有序集成员按分数值递增(从小到大)顺序排列。
     * @param {String} key - 有续集
     * @param {String} member - 成员
     * @returns  - 如果成员是有序集 key 的成员，返回 member 的排名(下标)。 如果成员不是有序集 key 的成员，返回 nil 。
     */
    zrank (key, member) {
        return this.redis.zrank(key, member);
    }
    /**
     * 返回有序集中成员的排名。其中有序集成员按分数值递减(从大到小)排序。排名以 0 为底，也就是说， 分数值最大的成员排名为 0 。
     * 使用 ZRANK 命令可以获得成员按分数值递增(从小到大)排列的排名。
     * @param {String} key - 有序集
     * @param {String} member - 成员
     * @returns  - 如果成员是有序集 key 的成员，返回成员的排名。 如果成员不是有序集 key 的成员，返回 nil 。
     */
    zrevrank (key, member) {
        return this.redis.zrevrank(key, member);
    }
    /**
     * 返回有序集中，成员的分数值。 如果成员元素不是有序集 key 的成员，或 key 不存在，返回 nil 。
     * @param {String} key - 有序集
     * @param {String} member - 成员
     * @returns  - 成员的分数值，以字符串形式表示。
     */
    zscore (key, member) {
        return this.redis.zscore(key, member);
    }
    /**
     * 移除有序集中的一个或多个成员，不存在的成员将被忽略。
     * @param {String} key - 有续集
     * @param {String} members - 成员
     * @returns  - 被成功移除的成员的数量，不包括被忽略的成员
     */
    zrem (key, ...members) {
        return this.redis.zrem(key, members);
    }
    /**
     * 移除有序集合中给定的字典区间的所有成员。
     * @param {String} key - 有续集
     * @param {String} min - 字典A
     * @param {String} max - 字典B
     * @returns  - 被成功移除的成员的数量，不包括被忽略的成员。
     */
    zremrangebylex (key, min = '-' , max = '+') {
        return this.redis.zremrangebylex(key, min, max);
    }
    /**
     * 移除有序集中，指定排名(rank)区间内的所有成员。
     * @param {String} key - 有续集
     * @param {String} start - 开始下标
     * @param {String} stop - 结束下标
     * @returns  - 被移除成员的数量。
     */
    zremrangebyrank (key, start = 0 , stop = 0) {
        return this.redis.zremrangebyrank(key, start, stop);
    }
    /**
     * 移除有序集中，指定分数（score）区间内的所有成员。
     * @param {String} key - 有序集
     * @param {String} min - 最小分
     * @param {String} max - 最大分
     * @returns  - 被移除成员的数量。
     */
    zremrangebyscore (key, min = 0 , max = 0) {
        return this.redis.zremrangebyscore(key, min, max);
    }
    /**
     * 迭代有序集合中的元素（包括元素成员和元素分值）。(没理解)
     * ZSCAN key cursor [MATCH pattern] [COUNT count]
     * @param {String} key - 有序集
     * @returns  - 返回的每个元素都是一个有序集合元素，一个有序集合元素由一个成员（member）和一个分值（score）组成。
     */
    // zscan (key) {
    //     return this.redis.zscan(key);
    // }
}

module.exports = RedisSorted;