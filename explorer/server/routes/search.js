var express = require("express");
var router = express.Router();
const Transaction = require("../models/Transaction");

router.post("/loaddnw", function (req, res) {
  const address = req.body.address;

  Transaction.find({
    //DB에 저장된 트랜잭션 검색
    $or: [{ $and: [{ value: { $gt: 0 } }, { from: address }] }, { $and: [{ value: { $gt: 0 } }, { to: address }] }],
  }) //From이 address이면서 value가 0이상이거나 To가 address이면서 value가 0이상인 데이터만 추출
    .sort({ timestamp: -1 }) //가장 최근에 저장된 데이터 순으로
    .then((result) => {
      let returnResult = [];
      for (var tx of result) {
        let date = new Date(tx.timestamp * 1000);
        returnResult.push({
          shard: `${tx.shardID}➡${tx.toShardID}`,
          hash: tx.hash,
          from: tx.from,
          to: tx.to,
          value: tx.oneValue,
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
      res.status(401).send({ data: [], message: "Fail load blockData" }); //실패시 응답
    });
});

module.exports = router;
