import { Link } from "react-router-dom";
import "./frontpage.scss";
import axios from "axios";
import { Spinner, DropdownButton, Dropdown } from "react-bootstrap";
import React, { useState, useEffect } from "react";

function FrontPage() {
  const [shard, setShard] = useState("Shard 0");
  const [lastBlocks, setLastBlocks] = useState([[], [], [], []]);
  const [lastTransactions, setLastTransactions] = useState([]);
  const [lastBlocks_Loading, setLastBlocks_Loading] = useState(false);
  const [lastTransactions_Loading, setlastTransactions_Loading] = useState(false);
  const [now_input, setNow_input] = useState("");
  const [now_shard, setNow_shard] = useState(0);

  async function reload_LastBlock() {
    //라스트 블럭 리프레시
    setLastBlocks_Loading(true);
    await axios.get(`http://localhost:3001/callblocks/shard`).then((result) => {
      setLastBlocks(result.data.data);
      setLastBlocks_Loading(false);
    });
  }
  async function reload_LastTransaction() {
    //라스트 트랜잭션 리프레시
    setlastTransactions_Loading(true);
    await axios.get("http://localhost:3001/calltransaction").then((result) => {
      console.log("???", result);
      setLastTransactions(result.data.data);
      setlastTransactions_Loading(false);
    });
  }

  useEffect(() => {
    load_LastBlock();
    load_LastTransaction();
    async function load_LastBlock() {
      //라스트 블럭 조회
      setLastBlocks_Loading(true);
      await axios.get(`http://localhost:3001/callblocks/shard`).then((result) => {
        setLastBlocks(result.data.data);
        setLastBlocks_Loading(false);
      });
    }
    async function load_LastTransaction() {
      //라스트 트랜잭션 조회
      setlastTransactions_Loading(true);
      await axios.get("http://localhost:3001/calltransaction").then((result) => {
        console.log("???", result);
        setLastTransactions(result.data.data);
        setlastTransactions_Loading(false);
      });
    }

    let timer = setInterval(() => {
      // 실시간 리프레시
      load_LastBlock();
      load_LastTransaction();
    }, 8000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  async function test() {
    await axios.get("http://localhost:3001/calltransaction").then((result) => {
      setLastTransactions(result.data.data);
      //     setlastBlocks_Loading(false);
    });
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

  function nowInput(e) {
    setNow_input(e.target.value);
  }

  const handleKeyPress = (e) => {
    //검색창에 Enter키를 누를 시 검색이 작동된다.
    if (e.key === "Enter") {
      if (now_input !== "") {
        if (now_input.slice(0, 3) === "one" && now_input.length === 42) {
          //계좌 검색
          document.location.href = `/dnw/${now_input}`;
        } else if (isNaN(Number(now_input)) === false && now_input.slice(0, 2) !== "0x") {
          document.location.href = `/block/${now_input}`;
        } else if (now_input.slice(0, 2) === "0x" && now_input.length === 66) {
          //트랜잭션 검색
          document.location.href = `/transaction/${now_input}`;
        }
      } else {
        document.location.href = "/";
      }
    }
  };

  const click_SearchIcon = () => {
    //검색창에 검색아이콘을 누를 시 검색이 작동된다.
    if (now_input !== "") {
      if (now_input.slice(0, 3) === "one" && now_input.length === 42) {
        document.location.href = `/dnw/${now_input}`;
      } else if (isNaN(Number(now_input) === false && now_input.slice(0, 2) !== "0x")) {
        console.log("블록검색?");
      } else if (now_input.slice(0, 2) === "0x" && now_input.length === 66) {
        console.log("트랜잭션 검색");
      } else {
        setNow_input("");
      }
    } else {
      document.location.href = "/";
    }
  };

  return (
    <div className="main">
      <div className="searchBar">
        <div className="searchIcon">
          <span className="material-icons search" onClick={click_SearchIcon}>
            search
          </span>
        </div>
        <input
          className="searchBlock"
          placeholder="Search by Address / Transaction Hash / Block / Token"
          onChange={(e) => nowInput(e)}
          onKeyPress={handleKeyPress}
        />
      </div>
      <div className="main_set">
        <div className="Last_Blocks">
          <div className="title_block">
            Last Blocks
            <DropdownButton id="dropdown-basic-button" title={shard}>
              <Dropdown.Item onClick={(e) => changeShard(e)}>Shard 0</Dropdown.Item>
              <Dropdown.Item onClick={(e) => changeShard(e)}>Shard 1</Dropdown.Item>
              <Dropdown.Item onClick={(e) => changeShard(e)}>Shard 2</Dropdown.Item>
              <Dropdown.Item onClick={(e) => changeShard(e)}>Shard 3</Dropdown.Item>
            </DropdownButton>
          </div>

          {lastBlocks_Loading ? (
            <Spinner animation="border" variant="primary" className="lastBlock_spinner" />
          ) : (
            <div className="block_category">
              <div className="Shard">
                Shard
                {now_shard === 0
                  ? lastBlocks[0].map((block, index) => {
                      return (
                        <div key={index} className="Shard_set">
                          {block.shard}
                        </div>
                      );
                    })
                  : null}
                {now_shard === 1
                  ? lastBlocks[1].map((block, index) => {
                      return (
                        <div key={index} className="Shard_set">
                          {block.shard}
                        </div>
                      );
                    })
                  : null}
                {now_shard === 2
                  ? lastBlocks[2].map((block, index) => {
                      return (
                        <div key={index} className="Shard_set">
                          {block.shard}
                        </div>
                      );
                    })
                  : null}
                {now_shard === 3
                  ? lastBlocks[3].map((block, index) => {
                      return (
                        <div key={index} className="Shard_set">
                          {block.shard}
                        </div>
                      );
                    })
                  : null}
              </div>
              <div className="Height">
                Height
                {now_shard === 0
                  ? lastBlocks[0].map((block, index) => {
                      return (
                        <div key={index} className="Height_set">
                          {block.height}
                        </div>
                      );
                    })
                  : null}
                {now_shard === 1
                  ? lastBlocks[1].map((block, index) => {
                      return (
                        <div key={index} className="Height_set">
                          {block.height}
                        </div>
                      );
                    })
                  : null}
                {now_shard === 2
                  ? lastBlocks[2].map((block, index) => {
                      return (
                        <div key={index} className="Height_set">
                          {block.height}
                        </div>
                      );
                    })
                  : null}
                {now_shard === 3
                  ? lastBlocks[3].map((block, index) => {
                      return (
                        <div key={index} className="Height_set">
                          {block.height}
                        </div>
                      );
                    })
                  : null}
              </div>
              <div className="Transactions">
                Transactions
                {now_shard === 0
                  ? lastBlocks[0].map((block, index) => {
                      return (
                        <div key={index} className="Transaction_set">
                          {block.transaction}
                        </div>
                      );
                    })
                  : null}
                {now_shard === 1
                  ? lastBlocks[1].map((block, index) => {
                      return (
                        <div key={index} className="Transaction_set">
                          {block.transaction}
                        </div>
                      );
                    })
                  : null}
                {now_shard === 2
                  ? lastBlocks[2].map((block, index) => {
                      return (
                        <div key={index} className="Transaction_set">
                          {block.transaction}
                        </div>
                      );
                    })
                  : null}
                {now_shard === 3
                  ? lastBlocks[3].map((block, index) => {
                      return (
                        <div key={index} className="Transaction_set">
                          {block.transaction}
                        </div>
                      );
                    })
                  : null}
              </div>
              <div className="Timestamp">
                Timestamp
                {now_shard === 0
                  ? lastBlocks[0].map((block, index) => {
                      return (
                        <div key={index} className="Timestamp_set">
                          {block.timestamp}
                        </div>
                      );
                    })
                  : null}
                {now_shard === 1
                  ? lastBlocks[1].map((block, index) => {
                      return (
                        <div key={index} className="Timestamp_set">
                          {block.timestamp}
                        </div>
                      );
                    })
                  : null}
                {now_shard === 2
                  ? lastBlocks[2].map((block, index) => {
                      return (
                        <div key={index} className="Timestamp_set">
                          {block.timestamp}
                        </div>
                      );
                    })
                  : null}
                {now_shard === 3
                  ? lastBlocks[3].map((block, index) => {
                      return (
                        <div key={index} className="Timestamp_set">
                          {block.timestamp}
                        </div>
                      );
                    })
                  : null}
              </div>
            </div>
          )}
          {/* {라스트 블록 리프레시} */}
          <div className="refresh_box" onClick={reload_LastBlock}>
            <span className="material-icons refresh_logo">refresh</span>
            <div className="refresh_set">Refresh</div>
          </div>
          {/* {라스트 트랜잭션 리턴} */}
        </div>
        <div className="Last_Transactions">
          <div className="title">Last Transactions</div>

          {lastTransactions_Loading ? (
            <Spinner animation="border" variant="primary" className="lastBlock_spinner" />
          ) : (
            <div className="transaction_category">
              <div className="Shard">
                Shard
                {lastTransactions.map((block, index) => {
                  return (
                    <div key={index} className="Shard_set">
                      {block.shard}
                    </div>
                  );
                })}
              </div>
              <div className="Hash">
                Hash
                {lastTransactions.map((block, index) => {
                  return (
                    <div key={index} className="Common_set">
                      {/* {block.hash} */}
                      {block.hash.slice(0, 4) + "..." + block.hash.slice(-4)}
                    </div>
                  );
                })}
              </div>
              <div className="From">
                From
                {lastTransactions.map((block, index) => {
                  return (
                    <div key={index} className="Common_set">
                      {block.from.slice(0, 4) + "..." + block.from.slice(-4)}
                    </div>
                  );
                })}
              </div>
              <div className="To">
                To
                {lastTransactions.map((block, index) => {
                  return (
                    <div key={index} className="Common_set">
                      {block.to.slice(0, 4) + "..." + block.to.slice(-4)}
                    </div>
                  );
                })}
              </div>
              <div className="Timestamp2">
                Timestamp
                {lastTransactions.map((block, index) => {
                  return (
                    <div key={index} className="Timestamp_set">
                      {block.timestamp}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {/* {라스트 트랜잭션 리프레시} */}
          <div className="refresh_box" onClick={reload_LastTransaction}>
            <span className="material-icons refresh_logo">refresh</span>
            <div className="refresh_set">Refresh</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FrontPage;
