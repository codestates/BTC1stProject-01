package entity

data class JsonRpcRequest(
    val id: Long,
    val method: String,
    val params: List<Any?> = emptyList(),
    val jsonrpc: String = "2.0"
)