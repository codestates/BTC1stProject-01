import entity.HarmonyBlock
import entity.JsonRpcResponse

fun main(args: Array<String>) {
    val shardName = System.getProperty("targetShard") ?: throw RuntimeException("targetShard cannot be null")
//    val shardName = "SHARD_00"
    val now =  System.currentTimeMillis()

    val targetShard = ShardInfo.valueOf(shardName)

    val harmonyService = HarmonyService(targetShard.mainNetUrl)

    val blockRepository = BlockRepository(targetShard)
    val transactionRepository = TransactionRepository()
    val metaRepository = BlockMetaRepository()


    val blockMeta = metaRepository.getBlockMeta(targetShard)

    print("Daemon is running at $now, lastUpdatedAt: ${blockMeta.lastUpdatedAt}, lastBlockNumber:${blockMeta.lastBlockNumber}")

    val blocks: JsonRpcResponse<List<HarmonyBlock>>? = harmonyService.getBlocks(blockMeta.lastBlockNumber!!, blockMeta.lastBlockNumber!! + 1000)
    blocks?.result?.forEach {
        val blockSaved = blockRepository.save(it)
        if(!blockSaved) throw RuntimeException("Failed to persist block[${it.number}")

        it.transactions?.forEach { txHash ->
            val transactionByHash = harmonyService.getTransactionByHash(txHash)
            transactionByHash?.result?.let { harmonyTransaction ->
                val txSaved = transactionRepository.save(harmonyTransaction)
                if (!txSaved) throw RuntimeException("Failed to persist tx[$txHash]")
            }
        }
    }

    blockMeta.lastUpdatedAt = now
    blockMeta.lastBlockNumber = blocks!!.result!!.last().number

    metaRepository.update(blockMeta, targetShard)

}