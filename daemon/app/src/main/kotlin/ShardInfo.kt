enum class ShardInfo(
    val shardID: Int,
    val collectionName: String,
    val metaCollectionName: String,
    val mainNetUrl: String,
    val testNetUrl: String
) {

    SHARD_00(0, "Block_00", "Block_Meta_00","https://rpc.s0.t.hmny.io", "https://rpc.s0.b.hmny.io"),
    SHARD_01(1, "Block_01", "Block_Meta_01", "https://rpc.s1.t.hmny.io", "https://rpc.s1.b.hmny.io"),
    SHARD_02(2, "Block_02", "Block_Meta_02", "https://rpc.s2.t.hmny.io", "https://rpc.s2.b.hmny.io"),
    SHARD_03(3, "Block_03", "Block_Meta_03", "https://rpc.s3.t.hmny.io", "https://rpc.s3.b.hmny.io");
}