const express = require('express');
const router = express.Router();
const config = require('../config/config');
const hostURI = config.development.host_metadata;
const converter = require('bech32-converting');

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

let shardURL = 'https://api.s0.b.hmny.io/'; //앤드포인트 URL
let hmy = new Harmony(
  shardURL,
  {
      chainType: ChainType.Harmony,
      chainId: ChainID.HmyTestnet,
  },
);


/*
 *  /api
 */
router.get('/mnemonic/:PWD', async (req, res, next) => {
  try {
    if(req.params.PWD) {
      console.log(`PWD: ${req.params.PWD}`);
    } else {
      console.log('암호를 입력받지 않음');
    }
    
    //니모닉 생성
    const myMnemonic = new Wallet().newMnemonic();
    console.log(`니모닉 코드 생성: ${myMnemonic}`);
    
    //암호화
    let encData = await encryptPhrase(myMnemonic, req.params.PWD);
    console.log(encData);

    //복호화
    // decryptPhrase(JSON.parse(value), req.params.PWD).then(value => {
    //   console.log(`복호화 값: ${value}`);
    // });


    res.json({ message: "ok", data: {
      mnemonic: myMnemonic,
      encData: encData
    }});
  } catch (err) {
    console.error(err);
  }
});

/*
 *  /api/newaccount/:HDPATH
 */
router.get('/newaccount', async (req, res, next) => {
  console.log('======== 계정 생성 =========')
  try {
    let hdpath, pwd, mnemonic;
    if(req.query) {
      hdpath = req.query.hdpath;
      pwd = req.query.pwd;
      mnemonic = req.query.mnemonic;
    }

    //니모닉 코드 복호화
    let myPhrase = await decryptPhrase(JSON.parse(mnemonic), pwd);
    console.log(myPhrase);
    
    const wallet = new Wallet(
      shardURL,
      ChainType.Harmony,
      ChainID.HmyTestnet,
    );
    const account = wallet.addByMnemonic(myPhrase,req.query.hdpath);
    console.log(account);

    let result = {};
    result.addressForETH = account.address;
    result.addressForONE = converter('one').toBech32(account.address);
    //converter('eth').toHex('eth1pcl5tjla58y7kqywhjv88u7m58v6sm5afc6dwn')
    // 0x0E3f45Cbfda1C9Eb008Ebc9873F3DBA1d9A86E9D

    //개인키 암호화
    let encPrivateKey = await encryptPhrase(account.privateKey, pwd);
    result.privateKey = encPrivateKey;
    console.log('사용자 패스워드로 암호화된 개인키');
    console.log(encPrivateKey);
    
    res.json({ message: "ok", data: result });
  } catch (err) {
    console.error(err);
  }
});


/*
 *  /api/balance
 */
router.get('/balance', async (req, res, next) => {
  console.log('======== 밸런스 조회 =========')
  try {
    let myAddress, myShard, myNetwork;
    if(req.query.address) {
      myAddress = req.query.address;
      myShard = req.query.shard;
      myNetwork = req.query.network;
    }
    console.log(`샤드번호 :  ${myShard}`);
    console.log(`네트워크 :  ${myNetwork}`);

    let networkType;
    if(myNetwork == 'mainnet') {
      networkType = 't';
    } else {
      networkType = 'b';
    }
    
    //만약 샤드 정보가 변경되었다면 hmy 객체 변경
    let myEndpoint = `https://api.s${myShard}.${networkType}.hmny.io/`;
    console.log(`엔드포인트 : ${myEndpoint}`)
    if(shardURL != myEndpoint) {
      shardURL = myEndpoint;
      hmy = new Harmony(
        shardURL,
        {
            chainType: ChainType.Harmony,
            chainId: ChainID.HmyTestnet,
        },
      );
    }

    //계정 밸런스
    let balance = await hmy.blockchain.getBalance({address: myAddress});
    let result = fromWei(hexToNumber(balance.result), Units.one);
    console.log('밸런스 in ONEs: ' + result);
    
    res.json({ message: "ok", data: result });
  } catch (err) {
    console.error(err);
  }
});


/*
 *  /api/privateKey?encdata=${encPrivateKey}&pwd=${pwd}
 */
router.get('/privateKey', async (req, res, next) => {
  console.log('======== 개인키 조회 =========')
  try {
    let myEncData, myPwd;
    if(req.query) {
      myEncData = req.query.encdata;
      myPwd = req.query.pwd;
    }

    //니모닉 코드 복호화
    let decPrivateKey = await decryptPhrase(JSON.parse(myEncData), myPwd);
    console.log(decPrivateKey);
    
    res.json({ message: "ok", data: decPrivateKey });
  } catch (err) {
    console.error(err);
  }
});         


/*
 *  /api/transfer?data=${data}
 */
router.get('/transfer', async (req, res, next) => {
  console.log('======== 코인 전송 =========')
  try {
    let myData;
    if(req.query) {
      myData = JSON.parse(req.query.data);
    }

    console.log(myData);


    res.json({ message: "ok", data: 'ok'});
  } catch (err) {
    console.error(err);
    res.json({ message: "ok", data: 'failed'});
  }
});  

module.exports = router;