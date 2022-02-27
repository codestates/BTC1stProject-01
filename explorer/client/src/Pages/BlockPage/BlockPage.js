import "./Blockpage.scss";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Spinner, DropdownButton, Dropdown } from "react-bootstrap";

function Dnwpage() {
  const [number, setNumber] = useState(0);
  const [block, setBlock] = useState([]);
  const [shard, setShard] = useState("Shard 0");
  const [now_shard, setNow_shard] = useState(0);
  const [loading, setLoading] = useState(false);

  console.log(now_shard);
  console.log("????", block);

  useEffect(() => {
    const URLparam = document.location.href.split("block/")[1];
    setNumber(URLparam);

    let shard_type_blocks = [[], [], [], []];
    async function call() {
      setLoading(true);
      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
      };

      await axios
        .post(
          "https://rpc.s0.b.hmny.io",
          {
            jsonrpc: "2.0",
            id: 32,
            method: "hmyv2_getBlockByNumber",
            params: [
              number,
              {
                fullTx: true,
                inclTx: true,
                InclStaking: true,
              },
            ],
          },
          headers
        )
        .then((result) => {
          shard_type_blocks[0].push(result.data.result);
        });
      await axios
        .post(
          "https://rpc.s1.b.hmny.io",
          {
            jsonrpc: "2.0",
            id: 32,
            method: "hmyv2_getBlockByNumber",
            params: [
              number,
              {
                fullTx: true,
                inclTx: true,
                InclStaking: true,
              },
            ],
          },
          headers
        )
        .then((result) => {
          shard_type_blocks[1].push(result.data.result);
        });
      await axios
        .post(
          "https://rpc.s2.b.hmny.io",
          {
            jsonrpc: "2.0",
            id: 32,
            method: "hmyv2_getBlockByNumber",
            params: [
              number,
              {
                fullTx: true,
                inclTx: true,
                InclStaking: true,
              },
            ],
          },
          headers
        )
        .then((result) => {
          shard_type_blocks[2].push(result.data.result);
        });
      await axios
        .post(
          "https://rpc.s3.b.hmny.io",
          {
            jsonrpc: "2.0",
            id: 32,
            method: "hmyv2_getBlockByNumber",
            params: [
              number,
              {
                fullTx: true,
                inclTx: true,
                InclStaking: true,
              },
            ],
          },
          headers
        )
        .then((result) => {
          shard_type_blocks[3].push(result.data.result);
        });
      setBlock(shard_type_blocks);
      setLoading(false);
    }

    call();
  }, []);

  function changeShard(e) {
    // 콤보박스에서 누르는 샤드 번호에 따라 선택 중인 샤드를 state로 관리
    let shard_target = e.target.innerText;
    if (shard_target === "Shard 0") {
      setNow_shard(0);
      setShard("Shard 0");
    } else if (shard_target === "Shard 1") {
      setNow_shard(1);
      setShard("Shard 1");
    } else if (shard_target === "Shard 2") {
      setNow_shard(2);
      setShard("Shard 2");
    } else if (shard_target === "Shard 3") {
      setNow_shard(3);
      setShard("Shard 3");
    }
  }

  return (
    <div className="main3">
      <div className="main_middle_set">
        <div className="main_box_name set_flex">
          <div className="info_title">Block Info</div>
          <div>
            {" "}
            <DropdownButton id="dropdown-basic-button" title={shard}>
              <Dropdown.Item onClick={(e) => changeShard(e)}>Shard 0</Dropdown.Item>
              <Dropdown.Item onClick={(e) => changeShard(e)}>Shard 1</Dropdown.Item>
              <Dropdown.Item onClick={(e) => changeShard(e)}>Shard 2</Dropdown.Item>
              <Dropdown.Item onClick={(e) => changeShard(e)}>Shard 3</Dropdown.Item>
            </DropdownButton>
          </div>
        </div>
        <div className="main_box1">
          <div className="box_flex wrap">
            <div className="title2 addwitdh">Height</div>
            <div className="pointer">{number}</div>
          </div>
          <div className="box_flex wrap">
            <div className="title2 addwitdh">Shard</div>
            <div>{now_shard}</div>
          </div>
          {loading ? (
            <Spinner animation="border" variant="primary" className="lastBlock_spinner" />
          ) : (
            <div>
              {" "}
              <div className="box_flex wrap">
                <div className="title2 addwitdh">Hash</div>
                <div className="pointer">
                  {now_shard === 0 && block.length !== 0
                    ? block[0].map((el) => {
                        return el.hash;
                      })
                    : null}
                  {now_shard === 1 && block.length !== 0
                    ? block[1].map((el) => {
                        return el.hash;
                      })
                    : null}
                  {now_shard === 2 && block.length !== 0
                    ? block[2].map((el) => {
                        return el.hash;
                      })
                    : null}
                  {now_shard === 3 && block.length !== 0
                    ? block[3].map((el) => {
                        return el.hash;
                      })
                    : null}
                </div>
              </div>
              <div className="box_flex wrap">
                <div className="title2 addwitdh">Timestamp</div>
                <div>
                  {" "}
                  {now_shard === 0 && block.length !== 0
                    ? block[0].map((el) => {
                        let date = new Date(el.timestamp * 1000);
                        return (
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
                          date.getSeconds()
                        );
                      })
                    : null}
                  {now_shard === 1 && block.length !== 0
                    ? block[1].map((el) => {
                        let date = new Date(el.timestamp * 1000);
                        return (
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
                          date.getSeconds()
                        );
                      })
                    : null}
                  {now_shard === 2 && block.length !== 0
                    ? block[2].map((el) => {
                        let date = new Date(el.timestamp * 1000);
                        return (
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
                          date.getSeconds()
                        );
                      })
                    : null}
                  {now_shard === 3 && block.length !== 0
                    ? block[3].map((el) => {
                        let date = new Date(el.timestamp * 1000);
                        return (
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
                          date.getSeconds()
                        );
                      })
                    : null}
                </div>
              </div>
              <div className="box_flex wrap">
                <div className="title2 addwitdh">Staking Transactions</div>
                <div>
                  {" "}
                  {now_shard === 0 && block.length !== 0
                    ? block[0].map((el) => {
                        return el.stakingTransactions;
                      })
                    : null}
                  {now_shard === 1 && block.length !== 0
                    ? block[1].map((el) => {
                        return el.stakingTransactions;
                      })
                    : null}
                  {now_shard === 2 && block.length !== 0
                    ? block[2].map((el) => {
                        return el.stakingTransactions;
                      })
                    : null}
                  {now_shard === 3 && block.length !== 0
                    ? block[3].map((el) => {
                        return el.stakingTransactions;
                      })
                    : null}
                </div>
              </div>
              {/* <div className="box_flex wrap">
            <div className="title2 addwitdh">Proposer</div>
            <div>
              {" "}
              {now_shard === 0 && block.length !== 0
                ? block[0].map((el) => {
                    return el.hash;
                  })
                : null}
              {now_shard === 1 && block.length !== 0
                ? block[1].map((el) => {
                    return el.hash;
                  })
                : null}
              {now_shard === 2 && block.length !== 0
                ? block[2].map((el) => {
                    return el.hash;
                  })
                : null}
              {now_shard === 3 && block.length !== 0
                ? block[3].map((el) => {
                    return el.hash;
                  })
                : null}
            </div>
          </div> */}
              <div className="box_flex wrap">
                <div className="title2 addwitdh">Gas Limit</div>
                <div>
                  {" "}
                  {now_shard === 0 && block.length !== 0
                    ? block[0].map((el) => {
                        return el.gasLimit;
                      })
                    : null}
                  {now_shard === 1 && block.length !== 0
                    ? block[1].map((el) => {
                        return el.gasLimit;
                      })
                    : null}
                  {now_shard === 2 && block.length !== 0
                    ? block[2].map((el) => {
                        return el.gasLimit;
                      })
                    : null}
                  {now_shard === 3 && block.length !== 0
                    ? block[3].map((el) => {
                        return el.gasLimit;
                      })
                    : null}
                </div>
              </div>
              <div className="box_flex wrap">
                <div className="title2 addwitdh">Gas Used</div>
                <div>
                  {" "}
                  {now_shard === 0 && block.length !== 0
                    ? block[0].map((el) => {
                        return el.gasUsed;
                      })
                    : null}
                  {now_shard === 1 && block.length !== 0
                    ? block[1].map((el) => {
                        return el.gasUsed;
                      })
                    : null}
                  {now_shard === 2 && block.length !== 0
                    ? block[2].map((el) => {
                        return el.gasUsed;
                      })
                    : null}
                  {now_shard === 3 && block.length !== 0
                    ? block[3].map((el) => {
                        return el.gasUsed;
                      })
                    : null}
                </div>
              </div>
              <div className="box_flex wrap">
                <div className="title2 addwitdh">Size</div>
                <div>
                  {" "}
                  {now_shard === 0 && block.length !== 0
                    ? block[0].map((el) => {
                        return el.size;
                      })
                    : null}
                  {now_shard === 1 && block.length !== 0
                    ? block[1].map((el) => {
                        return el.size;
                      })
                    : null}
                  {now_shard === 2 && block.length !== 0
                    ? block[2].map((el) => {
                        return el.size;
                      })
                    : null}
                  {now_shard === 3 && block.length !== 0
                    ? block[3].map((el) => {
                        return el.size;
                      })
                    : null}
                </div>
              </div>
              <div className="box_flex wrap">
                <div className="title2 addwitdh">Extra Data</div>
                <div>
                  {" "}
                  {now_shard === 0 && block.length !== 0
                    ? block[0].map((el) => {
                        return el.extraData.slice(0, 66) + "...";
                      })
                    : null}
                  {now_shard === 1 && block.length !== 0
                    ? block[1].map((el) => {
                        return el.extraData.slice(0, 66) + "...";
                      })
                    : null}
                  {now_shard === 2 && block.length !== 0
                    ? block[2].map((el) => {
                        return el.extraData.slice(0, 66) + "...";
                      })
                    : null}
                  {now_shard === 3 && block.length !== 0
                    ? block[3].map((el) => {
                        return el.extraData.slice(0, 66) + "...";
                      })
                    : null}
                </div>
              </div>
              <div className="box_flex wrap">
                <div className="title2 addwitdh">Difficulty</div>
                <div>
                  {" "}
                  {now_shard === 0 && block.length !== 0
                    ? block[0].map((el) => {
                        return el.difficulty;
                      })
                    : null}
                  {now_shard === 1 && block.length !== 0
                    ? block[1].map((el) => {
                        return el.difficulty;
                      })
                    : null}
                  {now_shard === 2 && block.length !== 0
                    ? block[2].map((el) => {
                        return el.difficulty;
                      })
                    : null}
                  {now_shard === 3 && block.length !== 0
                    ? block[3].map((el) => {
                        return el.difficulty;
                      })
                    : null}
                </div>
              </div>
              <div className="box_flex wrap">
                <div className="title2 addwitdh">Logs Bloom</div>
                <div>
                  <span>
                    {" "}
                    {now_shard === 0 && block.length !== 0
                      ? block[0].map((el) => {
                          return el.logsBloom.slice(0, 66) + "...";
                        })
                      : null}
                    {now_shard === 1 && block.length !== 0
                      ? block[1].map((el) => {
                          return el.logsBloom.slice(0, 66) + "...";
                        })
                      : null}
                    {now_shard === 2 && block.length !== 0
                      ? block[2].map((el) => {
                          return el.logsBloom.slice(0, 66) + "...";
                        })
                      : null}
                    {now_shard === 3 && block.length !== 0
                      ? block[3].map((el) => {
                          return el.logsBloom.slice(0, 66) + "...";
                        })
                      : null}
                  </span>
                </div>
              </div>
              <div className="box_flex wrap">
                <div className="title2 addwitdh">Mix Hash</div>
                <div>
                  {" "}
                  {now_shard === 0 && block.length !== 0
                    ? block[0].map((el) => {
                        return el.mixHash.slice(0, 66) + "...";
                      })
                    : null}
                  {now_shard === 1 && block.length !== 0
                    ? block[1].map((el) => {
                        return el.mixHash.slice(0, 66) + "...";
                      })
                    : null}
                  {now_shard === 2 && block.length !== 0
                    ? block[2].map((el) => {
                        return el.mixHash.slice(0, 66) + "...";
                      })
                    : null}
                  {now_shard === 3 && block.length !== 0
                    ? block[3].map((el) => {
                        return el.mixHash.slice(0, 66) + "...";
                      })
                    : null}
                </div>
              </div>
              <div className="box_flex wrap">
                <div className="title2 addwitdh">Nonce</div>
                <div>
                  {" "}
                  {now_shard === 0 && block.length !== 0
                    ? block[0].map((el) => {
                        return el.nonce;
                      })
                    : null}
                  {now_shard === 1 && block.length !== 0
                    ? block[1].map((el) => {
                        return el.nonce;
                      })
                    : null}
                  {now_shard === 2 && block.length !== 0
                    ? block[2].map((el) => {
                        return el.nonce;
                      })
                    : null}
                  {now_shard === 3 && block.length !== 0
                    ? block[3].map((el) => {
                        return el.nonce;
                      })
                    : null}
                </div>
              </div>
              <div className="box_flex wrap">
                <div className="title2 addwitdh">Parent Hash</div>
                <div className="pointer">
                  {" "}
                  {now_shard === 0 && block.length !== 0
                    ? block[0].map((el) => {
                        return el.parentHash;
                      })
                    : null}
                  {now_shard === 1 && block.length !== 0
                    ? block[1].map((el) => {
                        return el.parentHash;
                      })
                    : null}
                  {now_shard === 2 && block.length !== 0
                    ? block[2].map((el) => {
                        return el.parentHash;
                      })
                    : null}
                  {now_shard === 3 && block.length !== 0
                    ? block[3].map((el) => {
                        return el.parentHash;
                      })
                    : null}
                </div>
              </div>
              <div className="box_flex wrap">
                <div className="title2 addwitdh">Receipts Root</div>
                <div>
                  {" "}
                  {now_shard === 0 && block.length !== 0
                    ? block[0].map((el) => {
                        return el.receiptsRoot;
                      })
                    : null}
                  {now_shard === 1 && block.length !== 0
                    ? block[1].map((el) => {
                        return el.receiptsRoot;
                      })
                    : null}
                  {now_shard === 2 && block.length !== 0
                    ? block[2].map((el) => {
                        return el.receiptsRoot;
                      })
                    : null}
                  {now_shard === 3 && block.length !== 0
                    ? block[3].map((el) => {
                        return el.receiptsRoot;
                      })
                    : null}
                </div>
              </div>
              <div className="box_flex wrap">
                <div className="title2 addwitdh">Transactions</div>
                <div className="pointer">
                  {" "}
                  {now_shard === 0 && block.length !== 0
                    ? block[0].map((el) => {
                        return el.transactions;
                      })
                    : null}
                  {now_shard === 1 && block.length !== 0
                    ? block[1].map((el) => {
                        return el.transactions;
                      })
                    : null}
                  {now_shard === 2 && block.length !== 0
                    ? block[2].map((el) => {
                        return el.transactions;
                      })
                    : null}
                  {now_shard === 3 && block.length !== 0
                    ? block[3].map((el) => {
                        return el.transactions;
                      })
                    : null}
                </div>
              </div>
              <div className="box_flex wrap">
                <div className="title2 addwitdh">State Root</div>
                <div>
                  {" "}
                  {now_shard === 0 && block.length !== 0
                    ? block[0].map((el) => {
                        return el.stateRoot;
                      })
                    : null}
                  {now_shard === 1 && block.length !== 0
                    ? block[1].map((el) => {
                        return el.stateRoot;
                      })
                    : null}
                  {now_shard === 2 && block.length !== 0
                    ? block[2].map((el) => {
                        return el.stateRoot;
                      })
                    : null}
                  {now_shard === 3 && block.length !== 0
                    ? block[3].map((el) => {
                        return el.stateRoot;
                      })
                    : null}
                </div>
              </div>
              <div className="box_flex wrap">
                <div className="title2 addwitdh">Transactions Root</div>
                <div>
                  {" "}
                  {now_shard === 0 && block.length !== 0
                    ? block[0].map((el) => {
                        return el.transactionsRoot;
                      })
                    : null}
                  {now_shard === 1 && block.length !== 0
                    ? block[1].map((el) => {
                        return el.transactionsRoot;
                      })
                    : null}
                  {now_shard === 2 && block.length !== 0
                    ? block[2].map((el) => {
                        return el.transactionsRoot;
                      })
                    : null}
                  {now_shard === 3 && block.length !== 0
                    ? block[3].map((el) => {
                        return el.transactionsRoot;
                      })
                    : null}
                </div>
              </div>
              <div className="box_flex wrap">
                <div className="title2 addwitdh">Uncles</div>
                <div>
                  {" "}
                  {now_shard === 0 && block.length !== 0
                    ? block[0].map((el) => {
                        return el.uncles;
                      })
                    : null}
                  {now_shard === 1 && block.length !== 0
                    ? block[1].map((el) => {
                        return el.uncles;
                      })
                    : null}
                  {now_shard === 2 && block.length !== 0
                    ? block[2].map((el) => {
                        return el.uncles;
                      })
                    : null}
                  {now_shard === 3 && block.length !== 0
                    ? block[3].map((el) => {
                        return el.uncles;
                      })
                    : null}
                </div>
              </div>
              <div className="box_flex wrap">
                <div className="title2 addwitdh">Epoch</div>
                <div>
                  {" "}
                  {now_shard === 0 && block.length !== 0
                    ? block[0].map((el) => {
                        return el.epoch;
                      })
                    : null}
                  {now_shard === 1 && block.length !== 0
                    ? block[1].map((el) => {
                        return el.epoch;
                      })
                    : null}
                  {now_shard === 2 && block.length !== 0
                    ? block[2].map((el) => {
                        return el.epoch;
                      })
                    : null}
                  {now_shard === 3 && block.length !== 0
                    ? block[3].map((el) => {
                        return el.epoch;
                      })
                    : null}
                </div>
              </div>
              <div className="box_flex wrap">
                <div className="title2 addwitdh">View ID</div>
                <div>
                  {" "}
                  {now_shard === 0 && block.length !== 0
                    ? block[0].map((el) => {
                        return el.viewID;
                      })
                    : null}
                  {now_shard === 1 && block.length !== 0
                    ? block[1].map((el) => {
                        return el.viewID;
                      })
                    : null}
                  {now_shard === 2 && block.length !== 0
                    ? block[2].map((el) => {
                        return el.viewID;
                      })
                    : null}
                  {now_shard === 3 && block.length !== 0
                    ? block[3].map((el) => {
                        return el.viewID;
                      })
                    : null}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dnwpage;
