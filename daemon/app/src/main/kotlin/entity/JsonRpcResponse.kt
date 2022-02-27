package entity

data class JsonRpcResponse<T>(
    val jsonrpc: String? =  null,
    val id: Long? = null,
    val result: T? = null
)
