"use client";
import Inputformforpf from "@/components/Inputformforpf";
import playfaircipher from "@/components/playfaircipher";
import Image from "next/image";
import React, { useState } from "react";

const Playfaircipher = () => {
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
            <span>PLAYFAIR</span> <span> CIPHER</span>
          </h1>
          <p className="px-8 sm:text-lg text-justify text-sm">
            The technique encrypts pairs of letters (bigrams or digrams),
            instead of single letters as in the simple substitution cipher and
            rather more complex Vigenère cipher systems then in use. The
            Playfair is thus significantly harder to break since the frequency
            analysis used for simple substitution ciphers does not work with it.
            The frequency analysis of bigrams is possible, but considerably more
            difficult. With 600[1] possible bigrams rather than the 26 possible
            monograms (single symbols, usually letters in this context), a
            considerably larger cipher text is required in order to be useful.
          </p>
          <span
            className="lg:hidden"
            onClick={() => {
              const element: HTMLElement | null =
                document.getElementById("Encryptforpfc");
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
            <h1 className="text-2xl" id="Encryptforpfc">Encrypt</h1>
            <Inputformforpf
              title="Plain Text"
              heading="Encrypt"
              method={playfaircipher.encrypt}
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
            <Inputformforpf
              title="Cipher Text"
              heading="Decrypt"
              method={playfaircipher.decrypt}
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

export default Playfaircipher;
