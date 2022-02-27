const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema(
  {
    blockHash: { type: String },
    blockNumber: { type: Number },
    ethHash: { type: String },
    gas: { type: Number },
    gasPrice: { type: Number },
    hash: { type: String },
    input: { type: String, default: "0x" },
    nonce: { type: Number },
    timestamp: { type: Number },
    from: { type: String },
    to: { type: String },
    shardID: { type: Number, default: 0 },
    toShardID: { type: Number, default: 0 },
    transactionIndex: { type: Number },
    r: { type: String },
    s: { type: String },
    v: { type: String },
    value: { type: Number },
    oneValue: { type: Number },
  },
  {
    collection: "Transaction",
    versionKey: false, //here
  }
);

const Transaction = mongoose.model("Transaction", TransactionSchema);
module.exports = Transaction;
