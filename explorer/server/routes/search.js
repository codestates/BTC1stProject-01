var express = require("express");
var router = express.Router();
const Transaction = require("../models/Transaction");

router.post("/loaddnw", function (req, res) {
  const address = req.body.address;

  Transaction.find({
    $or: [{ $and: [{ value: { $gt: 0 } }, { from: address }] }, { $and: [{ value: { $gt: 0 } }, { to: address }] }],
  })
    .sort({ timestamp: -1 }) //가장 최근에 저장된 데이터 중 //타임스탬프로 //2개만 가져온다.
    .then((result) => {
      let returnResult = [];
      for (var tx of result) {
        let date = new Date(tx.timestamp * 1000);
        returnResult.push({
          shard: `${tx.shardID}→${tx.toShardID}`,
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
