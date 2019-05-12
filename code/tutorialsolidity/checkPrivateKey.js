const keythereum = require('keythereum');

const key = keythereum.importFromFile("0xcaf98cc34ebb97f3e5a62219d33b62d5d1f53a05", "/opt/data/ethereumprivate/");
const privateKey = keythereum.recover("password1234", key);
console.log(privateKey.toString('hex'));
