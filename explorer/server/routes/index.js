var express = require("express");
var router = express.Router();
const Block_00 = require("../models/Block_00");
const Block_01 = require("../models/Block_01");
const Block_02 = require("../models/Block_02");
const Block_03 = require("../models/Block_03");
const Transaction = require("../models/Transaction");

router.get("/", function (req, res) {
  res.status(200).send("welcome");
});

router.get("/callblocks/shard", async function (req, res) {
  let shard_type_result = [[], [], [], []];
  await Block_00.find() //샤드0에 쌓인 블럭 조회
    .sort({ timestamp: -1 }) //가장 최근에 저장된 데이터 중 //타임스탬프로
    .limit(11) //2개만 가져온다.
    .then((result) => {
      for (var block of result) {
        let date = new Date(block.timestamp * 1000);
        shard_type_result[0].push({
          shard: block.shardID,
          height: block.number,
          transaction: block.transactions.length,
          timestamp:
            date.getDate() +
            "/" +
            (date.getMonth() + 1) +
            "/" +
            date.getFullYear() +
            ", " +
            date.getHours() +
            ":" +
            date.getMinutes() +
            ":" +
            date.getSeconds(),
        });
      }
    })
    .catch((err) => {
      console.log("shard0 loadData error");
      shard_type_result[0].push({}); //실패시 응답
    });

  await Block_01.find() //샤드1에 쌓인 블럭 조회
    .sort({ timestamp: -1 }) //가장 최근에 저장된 데이터 중 //타임스탬프로
    .limit(11) //2개만 가져온다.
    .then((result) => {
      for (var block of result) {
        let date = new Date(block.timestamp * 1000);
        shard_type_result[1].push({
          shard: block.shardID,
          height: block.number,
          transaction: block.transactions.length,
          timestamp:
            date.getDate() +
            "/" +
            (date.getMonth() + 1) +
            "/" +
            date.getFullYear() +
            ", " +
            date.getHours() +
            ":" +
            date.getMinutes() +
            ":" +
            date.getSeconds(),
        });
      }
    })
    .catch((err) => {
      console.log("shard1 loadData error");
      shard_type_result[1].push({}); //실패시 응답
    });

  await Block_02.find() //샤드2에 쌓인 블럭 조회
    .sort({ timestamp: -1 }) //가장 최근에 저장된 데이터 중 //타임스탬프로
    .limit(11) //2개만 가져온다.
    .then((result) => {
      for (var block of result) {
        let date = new Date(block.timestamp * 1000);
        shard_type_result[2].push({
          shard: block.shardID,
          height: block.number,
          transaction: block.transactions.length,
          timestamp:
            date.getDate() +
            "/" +
            (date.getMonth() + 1) +
            "/" +
            date.getFullYear() +
            ", " +
            date.getHours() +
            ":" +
            date.getMinutes() +
            ":" +
            date.getSeconds(),
        });
      }
    })
    .catch((err) => {
      console.log("shard2 loadData error");
      shard_type_result[2].push({}); //실패시 응답
    });

  await Block_03.find() //샤드3에 쌓인 블럭 조회
    .sort({ timestamp: -1 }) //가장 최근에 저장된 데이터 중 //타임스탬프로
    .limit(11) //2개만 가져온다.
    .then((result) => {
      for (var block of result) {
        let date = new Date(block.timestamp * 1000);
        shard_type_result[3].push({
          shard: block.shardID,
          height: block.number,
          transaction: block.transactions.length,
          timestamp:
            date.getDate() +
            "/" +
            (date.getMonth() + 1) +
            "/" +
            date.getFullYear() +
            ", " +
            date.getHours() +
            ":" +
            date.getMinutes() +
            ":" +
            date.getSeconds(),
        });
      }
    })
    .catch((err) => {
      console.log("shard3 loadData error");
      shard_type_result[3].push({}); //실패시 응답
    });

  await res.status(200).send({ data: shard_type_result });
});

router.get("/calltransaction", async function (req, res) {
  Transaction.find() //샤드구분없이 모든 최신 트랜잭션을 가져온다.
    .sort({ timestamp: -1 }) //가장 최근에 저장된 데이터 중 //타임스탬프로
    .limit(11) //2개만 가져온다.
    .then((result) => {
      let returnResult = [];
      for (var tx of result) {
        let date = new Date(tx.timestamp * 1000);
        returnResult.push({
          shard: `${tx.shardID}→${tx.toShardID}`,
          hash: tx.hash,
          from: tx.from,
          to: tx.to,
          timestamp:
            date.getDate() +
            "/" +
            (date.getMonth() + 1) +
            "/" +
            date.getFullYear() +
            ", " +
            date.getHours() +
            ":" +
            date.getMinutes() +
            ":" +
            date.getSeconds(),
        });
      }

      res.status(201).send({ data: returnResult }); //실패시 응답
    })
    .catch((err) => {
      console.log(err);
      res.status(401).send({ result: err, message: "Fail load blockData" }); //실패시 응답
    });
});

module.exports = router;
