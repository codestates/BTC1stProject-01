import entity.HarmonyTransaction
import org.litote.kmongo.KMongo
import org.litote.kmongo.getCollection

class TransactionRepository {

    companion object {
        private val MongoURL = "mongodb+srv://NMM:1234@cluster0.qzh54.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
        private val databaseName = "harmony-local"
        private val client = KMongo.createClient(MongoURL)
        private val database= client.getDatabase(databaseName)
    }

    fun save(tx: HarmonyTransaction): Boolean {
        tx.apply {
            this.oneValue = fromWei(this.value!!)
        }
        val insertOne = database.getCollection<HarmonyTransaction>("Transaction").insertOne(tx)

        return insertOne.wasAcknowledged()
    }
}