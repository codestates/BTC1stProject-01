import com.fasterxml.jackson.annotation.JsonInclude
import com.fasterxml.jackson.databind.DeserializationFeature
import com.fasterxml.jackson.databind.MapperFeature
import com.fasterxml.jackson.databind.ObjectMapper
import entity.HarmonyBlock
import entity.HarmonyTransaction
import entity.JsonRpcRequest
import entity.JsonRpcResponse
import io.github.resilience4j.retry.Retry
import io.github.resilience4j.retry.RetryConfig
import io.github.resilience4j.retry.RetryRegistry
import org.springframework.core.ParameterizedTypeReference
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.http.RequestEntity
import org.springframework.http.ResponseEntity
import org.springframework.web.client.RestTemplate
import java.net.URI
import java.time.Duration


class HarmonyService(
    private val url: String
){

    companion object {
        val restTemplate = RestTemplate()
        val config = createRetryConfig()
        val registry = RetryRegistry.of(config)
        val retry: Retry = registry.retry("harmonyService-retry")

        private fun createRetryConfig(): RetryConfig {
            return RetryConfig.custom<Any>()
                .maxAttempts(3)
                .waitDuration(Duration.ofMillis(100))
                .retryExceptions(NullPointerException::class.java)
                .build()
        }
    }

    fun getBlocks(
        from: Long,
        to: Long,
        withSigners: Boolean = false,
        fullTx: Boolean = false,
        inclStaking: Boolean = false,
    ): JsonRpcResponse<List<HarmonyBlock>>? {
        val param = JsonRpcRequest(
            1, HarmonyRpcMethod.GET_BLOCKS_V2.methodName, listOf(
                from, to, mapOf(
                    "withSigners" to withSigners,
                    "fullTx" to fullTx,
                    "inclStaking" to inclStaking
                )
            )
        )

        val requestEntity = RequestEntity.post(URI(url))
            .accept(MediaType.APPLICATION_JSON)
            .body(param)


        val executeCallable: ResponseEntity<JsonRpcResponse<List<HarmonyBlock>>> = retry.executeCallable {
            restTemplate.exchange(
                requestEntity,
                object : ParameterizedTypeReference<JsonRpcResponse<List<HarmonyBlock>>>() {})
        }

        return if (executeCallable.statusCode == HttpStatus.OK) {
            executeCallable.body
        } else {
            null
        }
    }

    fun getTransactionByBlockHashAndIndex(blockHash: String, index: Long): JsonRpcResponse<HarmonyTransaction>? {
        val param = JsonRpcRequest(
            1, HarmonyRpcMethod.GET_TX_BY_BLOCK_HASH_AND_INDEX_V2.methodName, listOf(
                blockHash,
                index
            )
        )

        val requestEntity = RequestEntity.post(URI(url))
            .accept(MediaType.APPLICATION_JSON)
            .body(param)


        val responseEntity: ResponseEntity<JsonRpcResponse<HarmonyTransaction>>? = restTemplate.exchange(
            requestEntity,
            object: ParameterizedTypeReference<JsonRpcResponse<HarmonyTransaction>>() {})

        return if (responseEntity?.statusCode == HttpStatus.OK) {
            responseEntity.body
        } else {
            null
        }

    }

    fun getTransactionByHash(blockHash: String): JsonRpcResponse<HarmonyTransaction>? {
        val param = JsonRpcRequest(
            1, HarmonyRpcMethod.GET_TX_BY_HASH_V2.methodName, listOf(
                blockHash
            )
        )

        val requestEntity = RequestEntity.post(URI(url))
            .accept(MediaType.APPLICATION_JSON)
            .body(param)


        val responseEntity = retry.executeCallable {
            restTemplate.exchange(
                requestEntity,
                object : ParameterizedTypeReference<JsonRpcResponse<HarmonyTransaction>>() {})
        }

        return if (responseEntity?.statusCode == HttpStatus.OK) {
            responseEntity.body
        } else {
            null
        }

    }


    private fun createDefaultObjectMapper(): ObjectMapper {
        val objectMapper = ObjectMapper()
        objectMapper.setSerializationInclusion(JsonInclude.Include.NON_NULL)
        objectMapper.enable(DeserializationFeature.ACCEPT_EMPTY_ARRAY_AS_NULL_OBJECT)
        objectMapper.disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES)
        objectMapper.disable(MapperFeature.DEFAULT_VIEW_INCLUSION)
        return objectMapper
    }
}