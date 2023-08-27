"use client";
import Inputform from "@/components/Inputform";
import ceasorcipher from "@/components/ceasorcipher";
import Image from "next/image";
import React, { useState } from "react";

const CeasorCipher = () => {
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
            <span>CEASOR</span>
            <span>CIPHER</span>
          </h1>
          <p className="px-8 sm:text-lg text-justify text-sm">
            In cryptography, a Caesar cipher, also known as Caesar&apos;s
            cipher, the shift cipher, Caesar&apos;s code, or Caesar shift, is
            one of the simplest and most widely known encryption techniques. It
            is a type of substitution cipher in which each letter in the
            plaintext is replaced by a letter some fixed number of positions
            down the alphabet. For example, with a left shift of 3, D would be
            replaced by A, E would become B, and so on. The method is named
            after Julius Caesar, who used it in his private correspondence.
          </p>
          <span
            className="lg:hidden"
            onClick={() => {
              const element: HTMLElement | null =
                document.getElementById("Encryptforcc");
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
          <div className="gap-4 grid w-full py-10 ">
            <h1 className="text-2xl" id="Encryptforcc">Encrypt</h1>
            <Inputform
              title="Plain Text"
              heading="Encrypt"
              method={ceasorcipher.encrypt}
              returner={getencryptedvalue}
            />
          </div>
          {encryptedstring && (
            <h2 className="text-xl text-green-500 break-all">
              Encryption = {encryptedstring}
            </h2>
          )}
          <div className="gap-4 grid w-full">
            <h1 className="text-2xl">Decrypt</h1>
            <Inputform
              title="Cipher Text"
              heading="Decrypt"
              method={ceasorcipher.decrypt}
              returner={getdecryptedstring}
            />
          </div>
          {decryptedstring && (
            <h2 className="text-xl text-red-500">
              Decryption = {decryptedstring}
            </h2>
          )}
        </div>
      </div>
    </main>
  );
};

export default CeasorCipher;
