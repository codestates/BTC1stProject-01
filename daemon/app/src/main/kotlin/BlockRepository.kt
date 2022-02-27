import entity.HarmonyBlock
import org.litote.kmongo.*

class BlockRepository(
    val shardInfo: ShardInfo
) {

    companion object {
        private val MongoURL = "mongodb+srv://NMM:1234@cluster0.qzh54.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
        private val databaseName = "harmony-local"
        val client = KMongo.createClient(MongoURL)
        val database= client.getDatabase(databaseName)
    }

    fun save(block: HarmonyBlock): Boolean {
        block.shardID = shardInfo.shardID
        val insertOne = database.getCollection(shardInfo.collectionName, HarmonyBlock::class.java).insertOne(block)

        return insertOne.wasAcknowledged()
    }

    fun saveAll(blocks: List<HarmonyBlock>): Boolean {
        blocks.forEach { it.shardID = shardInfo.shardID }
        val insertMany = database.getCollection<HarmonyBlock>(shardInfo.collectionName).insertMany(blocks)

        return insertMany.wasAcknowledged()
    }

    fun findByHash(hash: String): HarmonyBlock? {
        return database.getCollection<HarmonyBlock>(shardInfo.collectionName).findOne(HarmonyBlock::hash eq hash)
    }
}