package entity

import org.bson.codecs.pojo.annotations.BsonId
import org.litote.kmongo.Id

data class HarmonyTransaction(
    @BsonId var _id: Id<HarmonyTransaction>? = null,
    val blockHash: String? = null,
    val blockNumber: Long? = null,
    val ethHash:String? = null,
    val from: String? = null,
    val gas: Long? = null,
    val gasPrice: Long? = null,
    val hash: String? = null,
    val input: String? = null,
    val nonce: Long? = null,
    val r: String? = null,
    val s: String? = null,
    val shardID: Long? = null,
    val timestamp: Long? = null,
    val to: String? = null,
    val toShardID: Long? = null,
    val transactionIndex: Long? = null,
    val v: String? = null,
    val value: Double? = null,
    var oneValue: Long? = null
) {

}