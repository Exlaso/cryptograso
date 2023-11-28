"use client";

import { algos } from "@/lib/data";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import Image from "next/image";

const Algoscard = ({
  title,
  href,
  both,
  id,
  iscreated,
  varients,
  desc,
}: {
  title: string;
  id: string;
  href: string;
  desc: string;
  varients: any;
  iscreated: boolean;
  both: boolean;
}) => (
  <motion.div
    id={id}
    variants={varients}
    whileInView={varients}
    whileHover={{ backgroundColor: "black" }}
    className={` p-6  rounded-md  ${!iscreated && "brightness-50"}`}
  >
    <Link
      href={href}
      onClick={(e) => {
        if (!iscreated) {
          e.preventDefault();
        }
      }}
      className="grid gap-4"
    >
      <h1 className="text-xl font-bold">{title}</h1>
      <p>{desc}</p>
      <div className="flex gap-3 justify-start items-center flex-wrap grow">
        <motion.span className="bg-green-500 p-1 rounded-md cursor-pointer flex gap-1 justify-center items-center">
          <Image
            className="invert"
            src={"/no_encryption_FILL0_wght400_GRAD0_opsz48.svg"}
            height={20}
            width={20}
            alt="Encrypt"
          />{" "}
          Encrypt
        </motion.span>
        {both && (
          <motion.span className="bg-red-500 p-1 rounded-md cursor-pointer  flex gap-1 justify-center items-center">
            <Image
              className="invert"
              src={"/enhanced_encryption_FILL0_wght400_GRAD0_opsz48.svg"}
              height={20}
              width={20}
              alt="Encrypt"
            />{" "}
            Decrypt
          </motion.span>
        )}
        {!iscreated && <p>This Algorithm is Under Development</p>}
      </div>
    </Link>
  </motion.div>
);

export default function Home() {
  const varients: any = {
    hidden: {
      opacity: 0,
      x: 10,
    },
    visible: {
      opacity: 1,
      x: 0,
    },
  };
  const dataarr: {
    title: string;
    href: string;
    iscreated: boolean;
    desc: string;
    enc_dec_supported: boolean;
    short_desc: string;
  }[] = algos();
  return (
    <main className="flex h-screen flex-col items-center justify-between p-24 max-sm:p-0">
      <div className="grid grid-cols-2 max-lg:grid-cols-1  w-full">
        <div className="flex justify-start py-20 gap-10 items-center flex-col h-screen">
          <h1 className="text-6xl flex flex-wrap justify-center items-center  text-neutral-950 gradient tracking-widest font-semibold ">
            <span>Crypto</span>
            <span>Graso</span>
          </h1>
          <p className="px-14">
            Experience ultimate data security with our encryption software.
            Encrypt and decrypt with ease using advanced algorithms like Caesar,
            Playfair, Vigenère, and Hill ciphers. Your data, your control.
          </p>
          <p className="text-right w-full px-14">
            by:{" "}
            <a
              href="https://exlaso.vercel.app"
              className="gradient underline border-b border-b-blue-600 underline-offset-4 text-right w-full"
            >
              Vedant Bhavsar
            </a>
          </p>
          <span
            className="lg:hidden"
            onClick={() => {
              const element: HTMLElement | null =
                document.getElementById("algocard0");
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
        <motion.div
          variants={varients}
          transition={{
            duration: 1,
            staggerChildren: 0.3,
          }}
          initial={"hidden"}
          animate={"visible"}
          className="flex flex-col gap-3 p-3 pb-20  rounded-xl"
        >
          {dataarr.map((data, i) => (
            <React.Fragment key={i}>
              <Algoscard
                varients={varients}
                id={`algocard${i}`}
                iscreated={data.iscreated}
                title={data.title}
                desc={data.short_desc}
                href={data.href}
                both={data.enc_dec_supported}
              />
              <hr />
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    </main>
  );
}
