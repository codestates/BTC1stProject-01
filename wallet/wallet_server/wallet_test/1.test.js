//const abiDecoder = require('abi-decoder'); // NodeJS
//const converter = require('bech32-converting');
// Example
//converter('eth').toBech32('0x0E3f45Cbfda1C9Eb008Ebc9873F3DBA1d9A86E9D')
// eth1pcl5tjla58y7kqywhjv88u7m58v6sm5afc6dwn

//converter('eth').toHex('eth1pcl5tjla58y7kqywhjv88u7m58v6sm5afc6dwn')
// 0x0E3f45Cbfda1C9Eb008Ebc9873F3DBA1d9A86E9D

// import or require Harmony class
const { Harmony } = require('@harmony-js/core');
const { Account, Wallet } = require('@harmony-js/account');

// import or require settings
const {
  ChainID,
  ChainType,
  hexToNumber,
  numberToHex,
  fromWei,
  Units,
  Unit,
  toAscii
} = require('@harmony-js/utils');

const {
  encode,
  decode,
  randomBytes,
  toBech32,
  fromBech32,
  HarmonyAddress,
  generatePrivateKey,
  getPubkeyFromPrivateKey,
  getAddressFromPublicKey,
  getAddressFromPrivateKey,
  encryptPhrase,
  decryptPhrase
} = require('@harmony-js/crypto');

const shardURL = 'https://api.s1.b.hmny.io/'; //테스트
const hmy = new Harmony(
  shardURL,
  {
      chainType: ChainType.Harmony,
      chainId: ChainID.HmyTestnet,
  },
);

/*========== 내 정보 ===============*/
const publicKey = 'one139kun2nv5yyxk4aacz96tnk0zwm3kajehhny7t';
const privateKey = 'c54b419762c419d1986135eadba358438038da9510e3c357540b49270aaa53d1';


const test = async () => {
  try {
    //계정 밸런스
    let res = await hmy.blockchain.getBalance({address: publicKey});
    console.log('밸런스 in ONEs: ' + fromWei(hexToNumber(res.result), Units.one));

    // const request = require('request');

    // let options = {
    //     //url: shardURL + 'address/id=' + publicKey,
    //     url: shardURL,
    //     method: "post",
    //     headers:
    //     { 
    //      "content-type": "application/json"
    //     },
    //     body: JSON.stringify({
    //       "jsonrpc": "2.0",
    //       "id": "1",
    //       "method": "hmyv2_getBalance",
    //       "params": [publicKey]
    //     })
    // };
    
    // request(options, (error, response, body) => {
    //     if (error) {
    //         console.error('An error has occurred: ', error);
    //     } else {
    //         console.log('Post successful: response: ', body);
    //     }
    // });

    //최근 블록
    res = await hmy.blockchain.getBlockNumber();
    console.log('current block number: ' + hexToNumber(res.result));

    //접속 샤드 정보
    res = await hmy.blockchain.getShardingStructure();
    // //harmony.shardingStructures(res.result);
    // console.log(res);

    // for(let i=21890000;i<21891000;i++) {
    //   res = await hmy.blockchain.getBlockByNumber({
    //     blockNumber: numberToHex(i),
    //   });
    //   if(res.result.transactions.length>0) {
    //     console.log(`블록: ${i}   트랜#: ${res.result.transactions.length}`)
    //   }
    // }

    //블록 정보
    res = await hmy.blockchain.getBlockByNumber({
      blockNumber: numberToHex(21890027),
    });
    console.log(`====${shardURL}  21890027 블록 정보====`);
    console.log(res);
    // let tx = res.result.transactions[0].hash;
    // console.log(tx);

    let tx = '0x90eedbf5c0838cbd606eaed6c1df43036d6f5f6da866ce0e33fc05748e169918';
    //트랜잭션 정보
    // res = await hmy.blockchain.getTransactionByHash({txnHash:tx});
    // console.log(`====${tx}  트랜잭션 정보====`);
    // console.log(res);
    //console.log(abiDecoder.decodeMethod(res.result.input));
    //console.log(fromWei(hexToNumber(res.result.value), Units.one));

    //트랜잭션 영수증
    // res = await hmy.blockchain.getTransactionReceipt({txnHash:tx});
    // console.log(`====${tx}  트랜잭션 영수증 정보====`);
    // console.log(res);
    //console.log(fromWei(hexToNumber(res.result.value), Units.one));

    //니모닉 생성
    // const myPhrase = new Wallet().newMnemonic();
    // console.log(`니모닉 코드 생성: ${myPhrase}`);
    // const pwd = '1234';
    // encryptPhrase(myPhrase, pwd).then((value) => {
    //   console.log(`암호화 값: ${value}`);
    //   decryptPhrase(JSON.parse(value), pwd).then(value => {
    //     console.log(`복호화 값: ${value}`);
    //   });
    // });


  
    //Create an empty wallet with messenger
    // const wallet = new Wallet(
    //   new Messenger(
    //     new HttpProvider(shardURL),
    //     ChainType.Harmony,
    //     ChainID.HmyTestnet,
    //   ),
    // );
    // const wallet = new Wallet(
    //   shardURL,
    //   ChainType.Harmony,
    //   ChainID.HmyTestnet,
    // );
    // myPhrase = 'ensure grunt skill tone loop mechanic ethics yellow ball fence border increase';
    // const account = wallet.addByMnemonic(myPhrase,3);
    // console.log(account);
    // console.log(wallet);


    console.log('끝');
    return;
  }
  catch(e) {
    console.log(e);
  }
}
test();


// 2. get wallet ready
// add privateKey to wallet
 const sender = hmy.wallet.addByPrivateKey(privateKey);

/*=============*/
// const account = new Account(); // or const account = Account.new()
// console.log(account);
// const account = Account.add(privateKey);
// console.log(account);

// const account = new Account(
//   privateKey,
//   new Messenger(
//     new HttpProvider('https://rpc.s0.b.hmny.io'),
//     ChainType.Harmony,
//     ChainID.HmyTestnet,
//   ),
// );
// account.getBalance().then(response => {
//     console.log(response);
// });




// 3. get sharding info
async function setSharding() {
  // Harmony is a sharded blockchain, each endpoint have sharding structure,
  // However sharding structure is different between mainnet, testnet and local testnet
  // We need to get sharding info before doing cross-shard transaction
  const res = await harmony.blockchain.getShardingStructure();
  harmony.shardingStructures(res.result);
}


// 4. get transaction payload ready

async function transfer() {
  // run set sharding first, if you want to make a cross-shard transaction
  await setSharding();

  const txn = harmony.transactions.newTx({
    //  token send to
    to: 'one166axnkjmghkf3df7xfvd0hn4dft8kemrza4cd2',
    // amount to send
    value: '10000',
    // gas limit, you can use string
    gasLimit: '210000',
    // send token from shardID
    shardID: 0,
    // send token to toShardID
    toShardID: 0,
    // gas Price, you can use Unit class, and use Gwei, then remember to use toWei(), which will be transformed to BN
    gasPrice: new harmony.utils.Unit('100').asGwei().toWei(),
  });

  // sign the transaction use wallet;

  const signedTxn = await harmony.wallet.signTransaction(txn);

  // Now you can use `Transaction.observed()` to listen events

  signedTxn
    .observed()
    .on('transactionHash', (txnHash) => {
      console.log('');
      console.log('--- hash ---');
      console.log('');
      console.log(txnHash);
      console.log('');
    })
    .on('receipt', (receipt) => {
      console.log('');
      console.log('--- receipt ---');
      console.log('');
      console.log(receipt);
      console.log('');
    })
    .on('cxReceipt', (receipt) => {
      console.log('');
      console.log('--- cxReceipt ---');
      console.log('');
      console.log(receipt);
      console.log('');
    })
    .on('error', (error) => {
      console.log('');
      console.log('--- error ---');
      console.log('');
      console.log(error);
      console.log('');
    });

  // send the txn, get [Transaction, transactionHash] as result

  const [sentTxn, txnHash] = await signedTxn.sendTransaction();

  // to confirm the result if it is already there

  const confiremdTxn = await sentTxn.confirm(txnHash);

  // if the transactino is cross-shard transaction
  if (!confiremdTxn.isCrossShard()) {
    if (confiremdTxn.isConfirmed()) {
      console.log('--- Result ---');
      console.log('');
      console.log('Normal transaction');
      console.log(`${txnHash} is confirmed`);
      console.log('');
      process.exit();
    }
  }
  if (confiremdTxn.isConfirmed() && confiremdTxn.isCxConfirmed()) {
    console.log('--- Result ---');
    console.log('');
    console.log('Cross-Shard transaction');
    console.log(`${txnHash} is confirmed`);
    console.log('');
    process.exit();
  }
}
