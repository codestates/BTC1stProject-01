### How to run this daemon

```
./gradlew clean
./gradlew fatJar
docker build --tag btc01-daemon:0.1 ./
docker run -eSHARD_INFO=SHARD_00 btc01-daemon:0.1 
```
<br>

### Run for other shard(shard01, shard02, shard03)

```
./gradlew clean
./gradlew fatJar
docker build --tag btc01-daemon:0.1 ./
docker run -eSHARD_INFO=SHARD_01 btc01-daemon:0.1 
```

<br>

### Run with more fetch size per 1 build(default: 1000)
```
docker run -eSHARD_INFO=SHARD_01 -efetchSize=10000 btc01-daemon:0.1
```
<br>

### Just run daemon for all shard(00 ~ 01)
(You can register this .sh on your crontab)
```
./gradlew clean
./gradlew fatJar
docker build --tag btc01-daemon:0.1 ./
chmod 755 runDaemon.sh
./runDaemon.sh
```