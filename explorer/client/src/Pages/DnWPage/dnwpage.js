import { Link } from "react-router-dom";
import "./Dnwpage.scss";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { DropdownButton, Dropdown } from "react-bootstrap";

function Dnwpage() {
  const [address, setAddress] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState([[0], [0], [0], [0]]);
  const [now_shard, setNow_shard] = useState(0);
  const [shard, setShard] = useState("Shard 0");
  console.log(balance);

  useEffect(() => {
    const URLparam = document.location.href.split("dnw/")[1];
    setAddress(URLparam);

    async function balanceCall() {
      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
      };
      let shard_type_balance = [[], [], [], []];
      await axios
        .post(
          "https://rpc.s0.b.hmny.io", //샤드 0의 계정 발란스 조회
          {
            jsonrpc: "2.0",
            id: 1,
            method: "hmyv2_getBalance",
            params: [document.location.href.split("dnw/")[1]],
          },
          headers
        )
        .then((result) => {
          if (result.data.result !== undefined) {
            shard_type_balance[0].push(result.data.result); //임시변수에 적재
          }
        });
      await axios
        .post(
          "https://rpc.s1.b.hmny.io", //샤드 1의 계정 발란스 조회
          {
            jsonrpc: "2.0",
            id: 1,
            method: "hmyv2_getBalance",
            params: [document.location.href.split("dnw/")[1]],
          },
          headers
        )
        .then((result) => {
          if (result.data.result !== undefined) {
            shard_type_balance[1].push(result.data.result);
          }
        });
      await axios
        .post(
          "https://rpc.s2.b.hmny.io", //샤드 2의 계정 발란스 조회
          {
            jsonrpc: "2.0",
            id: 1,
            method: "hmyv2_getBalance",
            params: [document.location.href.split("dnw/")[1]],
          },
          headers
        )
        .then((result) => {
          if (result.data.result !== undefined) {
            shard_type_balance[2].push(result.data.result);
          }
        });
      await axios
        .post(
          "https://rpc.s3.b.hmny.io", //샤드 3의 계정 발란스 조회
          {
            jsonrpc: "2.0",
            id: 1,
            method: "hmyv2_getBalance",
            params: [document.location.href.split("dnw/")[1]],
          },
          headers
        )
        .then((result) => {
          if (result.data.result !== undefined) {
            shard_type_balance[3].push(result.data.result);
          }
        });
      setBalance(shard_type_balance); //최종 샤드별 발란스 적재 변수를 state로 저장
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
          "http://localhost:3001/search/loaddnw", // 해당 계정의 입출금 내역을 요청한다.
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

  async function searchAccount(address) {
    document.location.href = `/dnw/${address}`;
  }

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
    <div className="main2">
      <div className="main_middle_set">
        <div className="main_box_name set_flex">
          <div className="info_title">👁️‍🗨️ Address</div>
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
          <div className="box_flex">
            <div className="title2">Address</div>
            <div>{address}</div>
          </div>
          <div className="box_flex">
            <div className="title2">Balance</div>
            <div>{now_shard === 0 && balance.length !== 0 ? String(balance[0][0] / 1e18).slice(0, 8) + " ONE" : null}</div>
            <div>{now_shard === 1 && balance.length !== 0 ? String(balance[1][0] / 1e18).slice(0, 8) + " ONE" : null}</div>
            <div>{now_shard === 2 && balance.length !== 0 ? String(balance[2][0] / 1e18).slice(0, 8) + " ONE" : null}</div>
            <div>{now_shard === 3 && balance.length !== 0 ? String(balance[3][0] / 1e18).slice(0, 8) + " ONE" : null}</div>
          </div>
        </div>
        <div className="main_box_name2">💲 Only Deposit X Withdraw Transactions</div>
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
                <Link to={`/transaction/${tx.hash}`}>
                  <div key={index} className="common_set2">
                    {tx.hash.slice(0, 4) + "..." + tx.hash.slice(-4)}
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="dnw_From">
            From
            {transactions.map((tx, index) => {
              return (
                <div key={index} className="common_set2" onClick={() => searchAccount(tx.from)}>
                  {tx.from.slice(0, 15) + "..." + tx.from.slice(-15)}
                </div>
              );
            })}
          </div>
          <div className="dnw_To">
            To
            {transactions.map((tx, index) => {
              return (
                <div key={index} className="common_set2" onClick={() => searchAccount(tx.to)}>
                  {tx.to.slice(0, 15) + "..." + tx.to.slice(-15)}
                </div>
              );
            })}
          </div>
          <div className="dnw_Value">
            Value (ONE)
            {transactions.map((tx, index) => {
              return (
                <div key={index} className="common_set2 addColor">
                  {tx.value}
                </div>
              );
            })}
          </div>
          <div className="dnw_Timestamp">
            Timestamp
            {transactions.map((tx, index) => {
              return (
                <div key={index} className="common_set2 addColor">
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
