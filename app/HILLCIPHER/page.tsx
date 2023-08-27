"use client";
import Inputformforpf from "@/components/Inputformforpf";
import HillCipher from "@/components/hillcipher";
import Image from "next/image";
import React, { useState } from "react";

const Hillcipher = () => {
  const [encryptedstring, setencryptedstring] = useState<string>("");
  const [decryptedstring, setdecryptedstring] = useState<string>("");

  const getencryptedvalue = (encryptedvalue: string): void =>
    setencryptedstring(encryptedvalue);
  const getdecryptedstring = (encryptedvalue: string): void =>
    setdecryptedstring(encryptedvalue);

  return (
    <main className="flex h-auto flex-col items-center justify-between p-24 max-sm:p-0">
      <div className="grid grid-cols-2 max-lg:grid-cols-1  w-full">
        <div className="flex justify-start py-20 gap-10 items-center flex-col h-auto">
          <h1 className="text-6xl flex flex-wrap justify-center items-center  text-neutral-950 gradient tracking-widest font-semibold">
            <span>HILL</span> <span> CIPHER</span>
          </h1>
          <p className="px-8 sm:text-lg text-justify text-sm">
            The Hill Cipher stands as a classical encryption method within the
            realm of cryptography. It operates by dividing the plaintext message
            into blocks of fixed length, treating each block as a vector of
            numerical values corresponding to the characters. These vectors are
            then multiplied by a secret key matrix, resulting in encrypted
            vectors that constitute the ciphertext. During decryption, the
            inverse of the key matrix is employed to revert the process and
            recover the original plaintext. The security of the Hill Cipher
            hinges on the mathematical properties of matrix operations,
            rendering it more resilient against basic cryptographic attacks
            compared to simpler substitution ciphers.
          </p>
          <span
            className="lg:hidden"
            onClick={() => {
              const element: HTMLElement | null =
                document.getElementById("EncryptforHC");
              element?.scrollIntoView();
            }}
          >
            <Image
              className="invert"
              src={"/arrow-down-double-fill.svg"}
              height={50}
              width={50}
              alt="Arrow"
            />
          </span>
        </div>
        <div className="flex flex-col gap-3 p-3 pb-20 justify-evenly items-start  w-full rounded-xl">
          <div className="gap-4 grid w-full ">
            <h1
              className="text-2xl"
              id="EncryptforHC"
            >
              Encrypt
            </h1>
            <Inputformforpf
              title="Plain Text"
              heading="Encrypt"
              method={HillCipher.encrypt}
              returner={getencryptedvalue}
            />
          </div>
          {encryptedstring && (
            <h2 className="text-xl text-green-500 break-all">
              Encryption = {encryptedstring}
            </h2>
          )}
        </div>
      </div>
    </main>
  );
};

export default Hillcipher;
