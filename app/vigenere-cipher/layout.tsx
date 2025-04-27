import type { Metadata } from "next";
import type { FunctionComponent } from "react";
import type React from "react";

type typesforlayout = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: "VIGENERE CIPHER - Encryption & Decryption tool",
  description: "Encrypt and Decrypt your message with VIGENERE CIPHER",
  icons: {
    icon: {
      url: "/icon.png",
      type: "image/png",
    },
  },
  authors: [
    {
      name: "Vedant Bhavsar",
      url: "https://exlaso.in",
    },
  ],
  openGraph: {
    type: "website",
    locale: "en_IE",
    url: "https://cryptograso.exlaso.in/vigenere-cipher",
    title: "VIGENERE CIPHER - Encryption & Decryption tool",
    description: "Encrypt and Decrypt your message with VIGENERE CIPHER",
    images: [
      {
        url: "/icon.png",
        width: 1000,
        height: 1000,
        alt: "Cryptograso",
      },
    ],
  },
  keywords: [
    "Encryption",
    "Decryption",
    "Vedant Bhavsar",
    "Exlaso",
    "Cryptograso",
    "Exlaso Cryptograso",
    "VIGENERE CIPHER",
    "VIGENERE CIPHER Encryption",
    "VIGENERE CIPHER Decryption",
  ],
};

const layout: FunctionComponent<typesforlayout> = ({ children }) => {
  return children;
};
export default layout;
