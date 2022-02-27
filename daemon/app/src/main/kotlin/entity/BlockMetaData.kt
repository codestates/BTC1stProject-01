package entity

import org.bson.codecs.pojo.annotations.BsonId
import org.litote.kmongo.Id

data class BlockMetaData(
 @BsonId var _id: Id<BlockMetaData>? = null,
 var lastBlockNumber: Long? = 0,
 var lastUpdatedAt: Long?= 0,
 var isRunning: Boolean?= false
) {
}