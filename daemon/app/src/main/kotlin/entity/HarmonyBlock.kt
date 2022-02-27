package entity

import org.bson.codecs.pojo.annotations.BsonId
import org.litote.kmongo.Id

data class HarmonyBlock(
    @BsonId var _id: Id<HarmonyBlock>? = null,
    val difficulty: Long? = null,
    val epoch: Long? = null,
    val extraData: String? = null,
    val gasLimit: Long? = null,
    val gasUsed: Long? = null,
    val hash: String? = null,
    val logsBloom: String? = null,
    val miner: String? = null,
    val mixHash: String? = null,
    val nonce: Long? = null,
    val number: Long? = null,
    val parentHash: String? = null,
    val receiptsRoot: String? = null,
    val size: Long? = null,
//    val stakingTransactions: HarmonyStakingTransaction? = null,
    val stateRoot: String? = null,
    val timestamp: Long? = null,
    val transactions: List<String>? = null,
    val transactionsRoot: String? = null,
    val viewID: Long? = null,
    var shardID: Int? = null
) {

}
