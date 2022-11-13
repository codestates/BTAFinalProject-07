import { generateSeedPhrase, parseSeedPhrase } from "near-seed-phrase";
import { KeyPair } from "near-api-js";
import crypto from 'crypto-js';

export const CONFIG = {
    networkId: "testnet",
    nodeUrl: "https://rpc.testnet.near.org",
    walletUrl: "https://wallet.testnet.near.org",
    helperUrl: "https://helper.testnet.near.org",
    explorerUrl: "https://explorer.testnet.near.org",
}

export const generateSeed = (password) => {
    const {seedPhrase, secretKey, publicKey} = generateSeedPhrase();
    const hashMnemonic = encryptMessage(seedPhrase, password);
    const hashSecretkey = encryptMessage(secretKey, password);

    return {
        mnemonic: hashMnemonic,
        publicKey: publicKey,
        secretKey: hashSecretkey,
    };
}

export const parseSeed = (mnemonic) => {
    const {seedPhrase, secretKey} = parseSeedPhrase(mnemonic);
    const keyPair = KeyPair.fromString(secretKey);

    return {
        mnemonic: seedPhrase,
        secretKey: keyPair.secretKey,
        address: keyPair.publicKey.toString()
    }
}

export const encryptMessage = (message, secret) => {
    const ciphertext = crypto.AES.encrypt(
      JSON.stringify(message),
      secret
    ).toString();
  
    return ciphertext;
};

export const decryptMessage = (cipherText, secret) => {
    let bytes = crypto.AES.decrypt(cipherText, secret);
    let decryptedText = JSON.parse(bytes.toString(crypto.enc.Utf8));
  
    return decryptedText;
};