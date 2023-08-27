"use client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Menu from "./Menu";

const Navbar = () => {
  const [ismenuopen, setIsmenuopen] = useState<boolean>(false);
  const Menuclickhandler = () => setIsmenuopen((prev) => !prev);

  return (
    <header>
      <AnimatePresence> {ismenuopen && <Menu setIsmenuopen={setIsmenuopen}/>}</AnimatePresence>
      <nav className="absolute top-0 w-full h-[8vh] z-40    px-4 flex justify-between items-center ">
        <Link
          href={"/"}
          className="gradient text-xl"
        >
          CRYPTOGRASO
        </Link>
        <motion.ul
          initial={{ scale: 1, opacity: 1 }}
          whileTap={{ scale: 0.9, opacity: 9 }}
          onClick={Menuclickhandler}
        >
          <Image
            className="invert"
            src={
              ismenuopen
                ? "/close_FILL0_wght400_GRAD0_opsz48.svg"
                : "/menu_FILL0_wght400_GRAD0_opsz48.svg"
            }
            width={40}
            height={40}
            alt="Menu bars"
          ></Image>
        </motion.ul>
      </nav>
      <div className="w-full h-[8vh]"></div>
    </header>
  );
};

export default Navbar;
