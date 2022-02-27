const mongoose = require("mongoose");

const Block_00Schema = new mongoose.Schema(
  {
    number: { type: Number },
    viewID: { type: Number },
    epoch: { type: Number },
    shardID: { type: Number, default: 0 },
    hash: { type: String, default: false },
    parentHash: { type: String },
    nonce: { type: Number, default: 0 },
    mixHash: { type: String },
    logsBloom: { type: String },
    stateRoot: { type: String },
    miner: { type: String },
    difficulty: { type: Number, default: 0 },
    extraData: { type: String, default: "0x" },
    size: { type: Number },
    gasLimit: { type: Number },
    gasUsed: { type: Number },
    timestamp: { type: Number },
    transactionsRoot: { type: String },
    receiptsRoot: { type: String },
    uncles: [],
    transactions: [],
  },
  {
    collection: "Block_00",
    versionKey: false, //here
  }
);

const Block_00 = mongoose.model("Block_00", Block_00Schema);
module.exports = Block_00;
