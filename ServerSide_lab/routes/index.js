var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  const Web3 = require('web3');
  var Tx = require('ethereumjs-tx').Transaction;
  const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
  web3.eth.getAccounts(console.log);

  const contractAddress = '0x65698ff04c6B945BEaFAB1Ae8CC7b8b11d4eD8cEb';
  const ABI = require('./test.abi.json');
  var TestContract = new web3.eth.Contract(ABI, contractAddress);


  // const contractAddress = '0x5f6f30DD07371a6121B4f7aBD5a4d65A02DD076b';
  // const ABI = require('YOUR_ABI_FILE');
  const account = '0x48fb8e5B5eDAa9920c7A94e3691936eB45f764f';
  const privateKey = Buffer.from('47c6369405462e1e7d2ba7ee1d8518fc25ed7109cb2ffa41b17420933b763e8b', 'hex');
  const doctorid = 234;
  const patientid = 123;
  const measurement = 110;

  var TestContract = new web3.eth.Contract(ABI, contractAddress);
  const _data = TestContract.methods.saveMeasurement(doctorid , patientid , measurement).encodeABI();
  web3.eth.getTransactionCount(account)
  .then(nonce => {
   var rawTx = {
   nonce: nonce,
  gasPrice: '0x20000000000',
  gasLimit: '0x27511',
  to: contractAddress,
  value: 0,
  data: _data
   }
   var tx = new Tx(rawTx);
   tx.sign(privateKey);
   var serializedTx = tx.serialize();
   web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
   .on('receipt', console.log);
  });


  res.render('index', { title: 'Express' });
});

module.exports = router;
