import Navbar from "@/components/Navbar";
import "./globals.css";
import type {Metadata} from "next";
import {Montserrat} from "next/font/google";

const montserrat = Montserrat({subsets: ["latin"]});

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
    authors: [
        {
            name: "Vedant Bhavsar",
            url: "https://exlaso.in"
        }
    ],
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


    ]
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body className={montserrat.className}>
        <Navbar/>
        {children}
        </body>
        </html>
    );
}
