#!/bin/bash
docker run -d -eSHARD_INFO=SHARD_00 btc01-daemon:0.1

docker run -d -eSHARD_INFO=SHARD_01 btc01-daemon:0.1

docker run -d -eSHARD_INFO=SHARD_02 btc01-daemon:0.1

docker run -d -eSHARD_INFO=SHARD_03 btc01-daemon:0.1

