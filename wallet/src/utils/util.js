import { generateSeedPhrase } from "near-seed-phrase";
import { KeyPair } from "near-api-js";
import crypto from 'crypto-js';

export const generateSeed = () => {
    const {seedPhrase, publicKey, secretKey} = generateSeedPhrase();
    const recoveryKeyPair = KeyPair.fromString(secretKey);
    return {
        seedPhrase: seedPhrase,
        address: recoveryKeyPair.getPublicKey().toString(),
        secret: recoveryKeyPair.secretKey
    };
}

export const encryptMessage = (message, secret) => {
    const ciphertext = crypto.AES.encrypt(
      JSON.stringify(message),
      secret
    ).toString();
  
    return ciphertext;
};