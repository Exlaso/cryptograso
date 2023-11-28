import React, { FC } from "react";
const smallalpha = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];
const bigalpha = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];



const encrypt = (plain_text: string, key: number) => {
if (plain_text === "") {
throw new Error("Plain Text Can't Be empty")  
}
if (Number.isNaN(key)) {
  throw new Error("Key Can't Be empty")  
  
}

  let Encrypted_string: string = "";
  let encrypted_index: number;
  let plain_text_char_index: number;
  removespace(plain_text)
    .split("")
    .forEach((plain_text_char) => {
      if (plain_text_char.toUpperCase() === plain_text_char) {
        plain_text_char_index = bigalpha.indexOf(plain_text_char);
        encrypted_index = mod(plain_text_char_index + key,26);
        Encrypted_string += bigalpha[encrypted_index];
      } else {
        plain_text_char_index = smallalpha.indexOf(plain_text_char);
        encrypted_index = mod(plain_text_char_index + key,26);
        Encrypted_string += smallalpha[encrypted_index];
      }
    });
  return Encrypted_string;
};

function mod(n: number, p: number) {
  if (n < 0) {
    n = p - (Math.abs(n) % p);
  }

  return n % p;
}

const removespace = (Text: string) => Text.replaceAll(" ", "");
const decrypt = (cipher_text: string, key: number) => {

  if (cipher_text === "") {
    throw new Error("Plain Text Can't Be empty")  
    }
    if (Number.isNaN(key)) {
      throw new Error("Key Can't Be empty")  
      
    }
  let Decrypted_string: string = "";
  let Decrypted_index: number;
  let cipher_text_char_index: number;

  removespace(cipher_text)
    .split("")
    .forEach((cipher_text_char) => {
      if (cipher_text_char.toUpperCase() === cipher_text_char) {
        cipher_text_char_index = bigalpha.indexOf(cipher_text_char);
        Decrypted_index = mod(cipher_text_char_index - key, 26);
        Decrypted_string += bigalpha[Decrypted_index];
      } else {
        cipher_text_char_index = smallalpha.indexOf(cipher_text_char);
        Decrypted_index = mod(cipher_text_char_index - key, 26);
        Decrypted_string += smallalpha[Decrypted_index];
      }
    });
  return Decrypted_string;
};
const ceasorcipher ={
  encrypt,
  decrypt
}
export default ceasorcipher;