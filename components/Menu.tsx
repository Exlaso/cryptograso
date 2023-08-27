import { algos } from "@/lib/data";
import { motion } from "framer-motion";
import Link from "next/link";
import React, { Dispatch, SetStateAction } from "react";
const Menu = ({
  setIsmenuopen,
}: {
  setIsmenuopen: Dispatch<SetStateAction<boolean>>;
}) => {
  const dataalgo: {
    title: string;
    href: string;
    iscreated: boolean;
    desc: string;
    enc_dec_supported: boolean;
    short_desc: string;
  }[] = algos();
  return (
    <motion.div
      initial={{ y: "-140%", opacity: 1 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: "-140%", opacity: 1 }}
      transition={{
        easings: "linear",
      }}
      className="fixed top-0 h-1/2 bg-black w-full pt-[8vh] z-30"
    >
      <div className="flex justify-evenly items-center gap-3 flex-col w-full  list-none h-full">
        {[
          { title: "HOME", href: "/", iscreated: true },
          ...dataalgo,
          {
            title: "ABOUT VEDANT",
            href: "https://exlaso.vercel.app",
            iscreated: true,
          },
        ].map((data) => {
          if (data.iscreated) {
            return (
              <motion.li
                key={data.title}
                initial={{ y: -100, opacity: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <Link
                  href={data.href}
                  onClick={() => {
                    setIsmenuopen(false);
                  }}
                >
                  {" "}
                  {data.title}
                </Link>
              </motion.li>
            );
          }
        })}
      </div>
    </motion.div>
  );
};

export default Menu;
