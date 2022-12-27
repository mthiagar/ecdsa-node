const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");

const privateKey = secp.utils.randomPrivateKey();

console.log("Private Key:", toHex(privateKey));
console.log("Raw Private Key:", privateKey); 

const publicKey = secp.getPublicKey(privateKey);

console.log(toHex(publicKey));

// public keys should be last 20 bytes of kechack hash

// security: sign intention (message, or transaction) on client side
// Server will recover from signature the address of the person that sent the message
// Only person who owns the private key of the public address entered, could have signed that message 