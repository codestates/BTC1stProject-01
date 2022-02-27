import "./Dnwpage.scss";
import axios from "axios";
import React, { useState, useEffect } from "react";

function Dnwpage() {
  const [address, setAddress] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const URLparam = document.location.href.split("dnw/")[1];
    setAddress(URLparam);

    async function balanceCall() {
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
            method: "hmyv2_getBalance",
            params: [address],
          },
          headers
        )
        .then((result) => {
          setBalance(result.data.result);
        });
    }
    balanceCall();

    async function loadDnwData() {
      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
      };

      //데이터베이스에서 NFT 조회 후 받아온 정보로 페이지 구성
      await axios
        .post(
          "http://localhost:3001/search/loaddnw",
          {
            address: address,
          },
          headers
        )
        .then((result) => {
          setTransactions(result.data.data);
        });
    }
    loadDnwData();
  }, [address]);

  return (
    <div className="main2">
      <div className="main_middle_set">
        <div className="main_box_name">Address</div>
        <div className="main_box1">
          <div className="box_flex">
            <div className="title2">Address</div>
            <div>{address}</div>
          </div>
          <div className="box_flex">
            <div className="title2">Balance</div>
            <div>{String(balance / 1e18).slice(0, 8)} one</div>
          </div>
        </div>
        <div className="main_box_name2"> Only Deposit X Withdraw Transactions</div>
        <div className="main_box2">
          <div className="dnw_Type">
            Type
            {transactions.map((tx, index) => {
              if (tx.from === address) {
                return (
                  <div key={index} className="type_set">
                    출금
                  </div>
                );
              } else {
                return (
                  <div key={index} className="type_set">
                    입금
                  </div>
                );
              }
            })}
          </div>
          <div className="dnw_Hash">
            Hash
            {transactions.map((tx, index) => {
              return (
                <div key={index} className="common_set2">
                  {tx.hash.slice(0, 4) + "..." + tx.hash.slice(-4)}
                </div>
              );
            })}
          </div>
          <div className="dnw_From">
            From
            {transactions.map((tx, index) => {
              return (
                <div key={index} className="common_set2">
                  {tx.from.slice(0, 15) + "..." + tx.from.slice(-15)}
                </div>
              );
            })}
          </div>
          <div className="dnw_To">
            To
            {transactions.map((tx, index) => {
              return (
                <div key={index} className="common_set2">
                  {tx.to.slice(0, 15) + "..." + tx.to.slice(-15)}
                </div>
              );
            })}
          </div>
          <div className="dnw_Value">
            Value (ONE)
            {transactions.map((tx, index) => {
              return (
                <div key={index} className="common_set2">
                  {tx.value}
                </div>
              );
            })}
          </div>
          <div className="dnw_Timestamp">
            Timestamp
            {transactions.map((tx, index) => {
              return (
                <div key={index} className="common_set2">
                  {tx.timestamp}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dnwpage;
