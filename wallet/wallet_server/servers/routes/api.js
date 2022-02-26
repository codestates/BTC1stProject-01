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

const shardURL = 'https://api.s0.b.hmny.io/'; //테스트
const hmy = new Harmony(
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
    encryptPhrase(myMnemonic, req.params.PWD).then((value) => {
      console.log(`암호화 값: ${value}`);
      decryptPhrase(JSON.parse(value), req.params.PWD).then(value => {
        console.log(`복호화 값: ${value}`);
      });
    });

    res.json({ message: "ok", data: myMnemonic });
  } catch (err) {
    console.error(err);
  }
});

/*
 *  /api/newaccount/:HDPATH
 */
router.get('/newaccount/:HDPATH', async (req, res, next) => {
  try {
    if(req.params.HDPATH) {
      console.log(`HDPATH: ${req.params.HDPATH}`);
    } else {
      console.log('HD 번호를 입력 받지 않음');
    }
    
    const wallet = new Wallet(
      shardURL,
      ChainType.Harmony,
      ChainID.HmyTestnet,
    );
    myPhrase = 'ensure grunt skill tone loop mechanic ethics yellow ball fence border increase';
    const account = wallet.addByMnemonic(myPhrase,req.params.HDPATH);
    console.log(account);

    let result = {};
    result.privateKey = account.privateKey;
    result.addressForETH = account.address;
    result.addressForONE = converter('one').toBech32(account.address);
    //converter('eth').toHex('eth1pcl5tjla58y7kqywhjv88u7m58v6sm5afc6dwn')
    // 0x0E3f45Cbfda1C9Eb008Ebc9873F3DBA1d9A86E9D
    
    res.json({ message: "ok", data: result });
  } catch (err) {
    console.error(err);
  }
});


module.exports = router;