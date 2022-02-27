enum class HarmonyRpcMethod(val methodName: String) {
    GET_BLOCKS_V2("hmyv2_getBlocks"),
    GET_LAST_BLOCK_NUMBER_V2("hmyv2_blockNumber"),
    GET_TX_BY_BLOCK_HASH_AND_INDEX_V2("hmyv2_getTransactionByBlockHashAndIndex"),
    GET_TX_BY_HASH_V2("hmyv2_getTransactionByHash")
}