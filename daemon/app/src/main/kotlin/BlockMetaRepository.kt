import entity.BlockMetaData
import org.bson.Document
import org.litote.kmongo.KMongo
import org.litote.kmongo.getCollection
import org.litote.kmongo.updateOneById

class BlockMetaRepository {

    companion object {
        private val MongoURL = "mongodb+srv://NMM:1234@cluster0.qzh54.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
        private val databaseName = "harmony-local"
        val client = KMongo.createClient(MongoURL)
        val database= client.getDatabase(databaseName)
    }

    fun getBlockMeta(shardInfo: ShardInfo): BlockMetaData {
        val first = database.getCollection<BlockMetaData>(shardInfo.metaCollectionName).find().first()

        return first!!
    }

    fun save(shardInfo: ShardInfo) {
        val blockMetaData = BlockMetaData(null, 1000, 0)

        database.getCollection(shardInfo.metaCollectionName, BlockMetaData::class.java).insertOne(blockMetaData)
    }

    fun update(blockMeta: BlockMetaData, shardInfo: ShardInfo) {
        database.getCollection<BlockMetaData>(shardInfo.metaCollectionName).updateOneById(
            blockMeta._id!!,
            blockMeta
        )
    }
}