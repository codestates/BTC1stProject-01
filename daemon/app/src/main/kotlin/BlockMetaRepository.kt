import entity.BlockMetaData
import org.litote.kmongo.Id
import org.litote.kmongo.KMongo
import org.litote.kmongo.getCollection
import org.litote.kmongo.updateOneById
import org.litote.kmongo.util.idValue

class BlockMetaRepository(private val shardInfo: ShardInfo) {

    companion object {
        private val MongoURL = "mongodb+srv://NMM:1234@cluster0.qzh54.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
        private val databaseName = "harmony-testnet"
        val client = KMongo.createClient(MongoURL)
        val database= client.getDatabase(databaseName)
    }

    fun getBlockMeta(): BlockMetaData {
        val first = database.getCollection<BlockMetaData>(shardInfo.metaCollectionName).find().first()

        return first ?: generate()
    }

    private fun generate(): BlockMetaData {
        val blockMetaData = BlockMetaData(null, 1000, 0, false)

        database.getCollection(shardInfo.metaCollectionName, BlockMetaData::class.java).insertOne(blockMetaData)

        return blockMetaData
    }

    fun update(blockMeta: BlockMetaData) {
        database.getCollection<BlockMetaData>(shardInfo.metaCollectionName).updateOneById(
            blockMeta._id!!,
            blockMeta
        )
    }
}