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


module.exports = router;