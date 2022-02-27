const mongoose = require("mongoose");

const Block_03Schema = new mongoose.Schema(
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
    collection: "Block_03",
    versionKey: false, //here
  }
);

const Block_03 = mongoose.model("Block_03", Block_03Schema);
module.exports = Block_03;
