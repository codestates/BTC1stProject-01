import { Link } from "react-router-dom";
import "./TransactionPage.scss";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";

function TransactionPage() {
  const [tx, setTx] = useState("");
  const [data, setData] = useState([]);
  const [timestamp, setTimestamp] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const URLparam = document.location.href.split("transaction/")[1];
    setTx(URLparam);
    setLoading(true);

    async function call() {
      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
      };

      await axios
        .post(
          "https://rpc.s0.b.hmny.io", //특정 트랜잭션을 조회 요청을 날린다.
          {
            jsonrpc: "2.0",
            id: 1,
            method: "hmyv2_getTransactionByHash",
            params: [tx],
          },
          headers
        )
        .then((result) => {
          if (result.data.result !== undefined && result.data.result !== null) {
            setData(result.data.result);
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
          <div className="info_title">🖇️ Transaction Info</div>
        </div>
        <div className="main_box1">
          {loading ? (
            <Spinner animation="border" variant="primary" className="lastBlock_spinner" />
          ) : (
            <div>
              {" "}
              <div className="box_flex wrap">
                <div className="title2 addwitdh">Shard ID</div>
                <div>{data !== undefined && data !== null && data !== null ? data.shardID + "➡" + data.toShardID : null}</div>
              </div>
              <div className="box_flex wrap">
                <div className="title2 addwitdh">Hash</div>
                <div className="upColor">{data !== undefined && data !== null ? data.hash : null}</div>
              </div>
              <div className="box_flex wrap">
                <div className="title2 addwitdh">Ethereum Hash</div>
                <div className="upColor">{data !== undefined && data !== null ? data.ethHash : null}</div>
              </div>
              <div className="box_flex wrap">
                <div className="title2 addwitdh">Block Number</div>
                <Link to={`/block/${data.blockNumber}`}>
                  <div className="pointer">{data !== undefined && data !== null ? data.blockNumber : null}</div>
                </Link>
              </div>
              <div className="box_flex wrap">
                <div className="title2 addwitdh">Timestamp</div>
                <div>{data !== undefined && data !== null ? timestamp : null}</div>
              </div>
              <div className="box_flex wrap">
                <div className="title2 addwitdh">From</div>
                <Link to={`/dnw/${data.from}`}>
                  <div className="pointer">{data !== undefined && data !== null ? data.from : null}</div>
                </Link>
              </div>
              <div className="box_flex wrap">
                <div className="title2 addwitdh">To</div>
                <Link to={`/dnw/${data.to}`}>
                  <div className="pointer">{data !== undefined && data !== null ? data.to : null}</div>
                </Link>
              </div>
              <div className="box_flex wrap">
                <div className="title2 addwitdh">value</div>
                <div>{data !== undefined && data !== null ? data.value / 1e18 + " ONE" : null}</div>
              </div>
              <div className="box_flex wrap">
                <div className="title2 addwitdh">Token Transfers</div>
                <div></div>
              </div>
              <div className="box_flex wrap">
                <div className="title2 addwitdh">Gas</div>
                <div>{data !== undefined && data !== null ? data.gas : null}</div>
              </div>
              <div className="box_flex wrap">
                <div className="title2 addwitdh">Gas Price</div>
                <div>{data !== undefined && data !== null ? data.gasPrice : null}</div>
              </div>
              <div className="box_flex wrap">
                <div className="title2 addwitdh">Nonce</div>
                <div>{data !== undefined && data !== null ? data.nonce : null}</div>
              </div>
              <div className="box_flex wrap">
                <div className="title2 addwitdh">Transaction Index</div>
                <div>{data !== undefined && data !== null ? data.transactionIndex : null}</div>
              </div>
              <div className="box_flex wrap">
                <div className="title2 addwitdh">Input</div>
                <div>{data !== undefined && data !== null ? String(data.input).slice(0, 66) + "..." : null}</div>
              </div>
              <div className="box_flex wrap">
                <div className="title2 addwitdh">r</div>
                <div>{data !== undefined && data !== null ? data.r : null}</div>
              </div>
              <div className="box_flex wrap">
                <div className="title2 addwitdh">s</div>
                <div>{data !== undefined && data !== null ? data.s : null}</div>
              </div>
              <div className="box_flex wrap">
                <div className="title2 addwitdh">v</div>
                <div>{data !== undefined && data !== null ? data.v : null}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TransactionPage;
