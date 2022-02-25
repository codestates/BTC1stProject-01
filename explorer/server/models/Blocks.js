const mongoose = require("mongoose");

const BlocksSchema = new mongoose.Schema(
  {
    number: { type: Number },
    viewID: { type: Number },
    epoch: { type: Number },
    shard: { type: Number, default: 0 },
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
    timeStamp: { type: Number },
    transactionsToor: { type: String },
    receiptsRoot: { type: String },
    uncles: [],
    transactions: [],
    stakingTransactions: [],
  },
  {
    collection: "Blocks",
    versionKey: false, //here
  }
);

const Blocks = mongoose.model("Blocks", BlocksSchema);
module.exports = Blocks;
