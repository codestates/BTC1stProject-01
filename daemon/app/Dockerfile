FROM openjdk:8-jdk-alpine
RUN /bin/sh -c "apk add --no-cache bash"


COPY ./build/libs/btc01-daemon-1.0-SNAPSHOT.jar /app.jar
ENV JAVA_OPTS=""
CMD ["/bin/sh","-c", "java -DtargetShard=$SHARD_INFO -DfetchSize=$FETCH_SIZE -Djdk.tls.client.protocols=TLSv1.2  -jar app.jar"]
