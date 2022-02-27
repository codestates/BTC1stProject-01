import "./TransactionPage.scss";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";

function TransactionPage() {
  const [tx, setTx] = useState("");
  const [data, setData] = useState([]);
  const [timestamp, setTimestamp] = useState("");
  const [loading, setLoading] = useState(false);

  console.log("????", data);
  useEffect(() => {
    const URLparam = document.location.href.split("transaction/")[1];
    setTx(URLparam);
  }, []);

  useEffect(() => {
    setLoading(true);

    async function call() {
      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
      };

      await axios
        .post(
          "https://rpc.s0.b.hmny.io",
          {
            jsonrpc: "2.0",
            id: 1,
            method: "hmyv2_getTransactionByHash",
            params: [tx],
          },
          headers
        )
        .then((result) => {
          setData(result.data.result);
          if (result.length !== 0) {
            let date = new Date(result.data.result.timestamp * 1000);
            setTimestamp(
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
          }
        });
    }
    setLoading(false);
    call();
  }, [tx]);

  return (
    <div className="main3">
      <div className="main_middle_set">
        <div className="main_box_name set_flex">
          <div className="info_title">Block Info</div>
        </div>
        <div className="main_box1">
          <div className="box_flex wrap">
            <div className="title2 addwitdh">Shard ID</div>
            <div>{data !== undefined ? data.shardID + "→" + data.toShardID : null}</div>
          </div>
          <div className="box_flex wrap">
            <div className="title2 addwitdh">Hash</div>
            <div className="pointer">{data.length !== 0 ? data.hash : null}</div>
          </div>
          {loading ? (
            <Spinner animation="border" variant="primary" className="lastBlock_spinner" />
          ) : (
            <div>
              {" "}
              <div className="box_flex wrap">
                <div className="title2 addwitdh">Hash</div>
                <div className="pointer">{data.length !== 0 ? data.from : null}</div>
              </div>
              <div className="box_flex wrap">
                <div className="title2 addwitdh">Timestamp</div>
                <div>{data.length !== 0 ? timestamp : null}</div>
              </div>
              <div className="box_flex wrap">
                <div className="title2 addwitdh">Gas Limit</div>
                <div>ready</div>
              </div>
              <div className="box_flex wrap">
                <div className="title2 addwitdh">Gas Used</div>
                <div>ready</div>
              </div>
              <div className="box_flex wrap">
                <div className="title2 addwitdh">Size</div>
                <div>ready</div>
              </div>
              <div className="box_flex wrap">
                <div className="title2 addwitdh">Extra Data</div>
                <div>ready</div>
              </div>
              <div className="box_flex wrap">
                <div className="title2 addwitdh">Difficulty</div>
                <div>ready</div>
              </div>
              <div className="box_flex wrap">
                <div className="title2 addwitdh">Logs Bloom</div>
                <div>
                  <span>ready</span>
                </div>
              </div>
              <div className="box_flex wrap">
                <div className="title2 addwitdh">Mix Hash</div>
                <div>ready</div>
              </div>
              <div className="box_flex wrap">
                <div className="title2 addwitdh">Nonce</div>
                <div>ready</div>
              </div>
              <div className="box_flex wrap">
                <div className="title2 addwitdh">Parent Hash</div>
                <div className="pointer">ready</div>
              </div>
              <div className="box_flex wrap">
                <div className="title2 addwitdh">Receipts Root</div>
                <div>ready</div>
              </div>
              <div className="box_flex wrap">
                <div className="title2 addwitdh">Transactions</div>
                <div className="pointer">ready</div>
              </div>
              <div className="box_flex wrap">
                <div className="title2 addwitdh">State Root</div>
                <div>ready</div>
              </div>
              <div className="box_flex wrap">
                <div className="title2 addwitdh">Transactions Root</div>
                <div>ready</div>
              </div>
              <div className="box_flex wrap">
                <div className="title2 addwitdh">Uncles</div>
                <div>ready</div>
              </div>
              <div className="box_flex wrap">
                <div className="title2 addwitdh">Epoch</div>
                <div>ready</div>
              </div>
              <div className="box_flex wrap">
                <div className="title2 addwitdh">View ID</div>
                <div>ready</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TransactionPage;
