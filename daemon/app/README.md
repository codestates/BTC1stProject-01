### How to run this daemon

```
./gradlew clean
./gradlew fatJar
docker build --tag btc01-daemon:0.1 ./
docker run -eSHARD_INFO=SHARD_00 btc01-daemon:0.1 
```

### Run for other shard(shard01, shard02, shard03)

```
./gradlew clean
./gradlew fatJar
docker build --tag btc01-daemon:0.1 ./
docker run -eSHARD_INFO=SHARD_01 btc01-daemon:0.1 
```

### 