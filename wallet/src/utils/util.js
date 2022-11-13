import crypto from 'crypto-js';

export const CONFIG = {
    networkId: "testnet",
    nodeUrl: "https://rpc.testnet.near.org",
    walletUrl: "https://wallet.testnet.near.org",
    helperUrl: "https://helper.testnet.near.org",
    explorerUrl: "https://explorer.testnet.near.org",
}

export const encryptMessage = (message, secret) => {
    const ciphertext = crypto.AES.encrypt(
      JSON.stringify(message), secret
    ).toString();
  
    return ciphertext;
};

export const decryptMessage = (cipherText, secret) => {
    let bytes = crypto.AES.decrypt(cipherText, secret);
    let decryptedText = JSON.parse(bytes.toString(crypto.enc.Utf8));
  
    return decryptedText;
};