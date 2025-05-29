import {Navbar} from "@/components/navbar";

import "./globals.css";

import type {Metadata} from "next";
import Script from "next/script";


export const metadata: Metadata = {
  title: "Cryptograso - Encryption & Decryption tool",
  description: "Encrypt and Decrypt your message with ease",
  metadataBase: new URL("https://cryptograso.exlaso.in/"),
  icons: {
    icon: {
      url: "/icon.png",
      type: "image/png",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IE",
    url: "https://cryptograso.exlaso.in/",
    title: "Cryptograso - Encryption & Decryption tool",
    description: "Encrypt and Decrypt your message with ease",
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
  ],
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
      <Script defer src="https://analytics.vedantbhavsar.com/script.js" data-website-id="c26d034e-5fb3-40f4-817c-42d310b58a12"></Script>
    </html>
  );
}
