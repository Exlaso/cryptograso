"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import React, { FormEvent, useState } from "react";

const Inputform = ({
  heading,
  title,
  method,
  returner,
}: {
  heading: string;
  title: string;
  method: (plain_text: string, key: number) => string;
  returner: (encryptedvalue: string) => void;
}) => {
  const [inputvalue, setinputvalue] = useState<string>("");
  const [keyvalue, setkeyvalue] = useState<string>("");
  const [errormessage, seterror] = useState<string>("");

  const formsubmithandler = (form: FormEvent): void => {
    try {
      form.preventDefault();
      const val = method(inputvalue, parseInt(keyvalue));
      returner(val);
    } catch (error: { message: string } | any) {
      seterror(error.message);
      console.error(error);
    }
  };
  return (
    <form
      action="/"
      onSubmit={formsubmithandler}
      className="flex flex-col gap-3 justify-center items-start w-full"
    >
      <label htmlFor={title}>{title}</label>
      <input
        type="text"
        onInput={(e: FormEvent<HTMLInputElement>) => {
          seterror("");
          setinputvalue(e.currentTarget.value);
        }}
        value={inputvalue}
        id={title}
        placeholder={title}
        className="p-3 rounded-lg text-black w-full"
      />
      <label htmlFor={`Key${title}`}>{`Key for ${method.name}`}</label>
      <div className="w-full">
        <input
          type="number"
          onInput={(e: FormEvent<HTMLInputElement>) => {
            seterror("");
            setkeyvalue(e.currentTarget.value);
          }}
          value={keyvalue}
          id={`Key${title}`}
          placeholder={`Key for ${method.name}`}
          className="p-3 rounded-lg text-black w-full"
        />
        <div className={`grid ${errormessage === ""?"grid-rows-[0fr]":"grid-rows-[1fr]"} duration-200 overflow-hidden`}>
          <span className="bg-red-500 w-full min-h-0 block h-full duration-200 ">
            Error: {errormessage}
          </span>
        </div>
      </div>
      <motion.button
        initial={{ backgroundColor: "#0a0a0a", scale: 1 }}
        whileTap={{ scale: 0.95 }}
        whileHover={{ backgroundColor: "#1f1f1f" }}
        type="submit"
        className=" py-3 px-10 rounded-sm flex justify-center items-center gap-2"
      >
        {heading === "Encrypt" ? (
          <Image className="invert"
            src={"/no_encryption_FILL0_wght400_GRAD0_opsz48.svg"}
            height={20}
            width={20}
            alt="Encrypt"
          />
        ) : (
          <Image className="invert"
            src={"/enhanced_encryption_FILL0_wght400_GRAD0_opsz48.svg"}
            height={20}
            width={20}
            alt="Encrypt"
          />
        )}{" "}
        {heading}
      </motion.button>
    </form>
  );
};

export default Inputform;
