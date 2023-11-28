import React, {FunctionComponent} from "react";
import {Metadata} from "next";

interface typesforlayout {
    children: React.ReactNode
}

export const metadata:Metadata = {
    title: "PLAYFAIR CIPHER - Encryption & Decryption tool",
    description: "Encrypt and Decrypt your message with PLAYFAIR CIPHER",
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
        url: "https://cryptograso.exlaso.in/PLAYFAIRCIPHER",
        title: "PLAYFAIR CIPHER - Encryption & Decryption tool",
        description: "Encrypt and Decrypt your message with PLAYFAIR CIPHER",
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
        "PLAYFAIR CIPHER",
        "PLAYFAIR CIPHER Encryption",
        "PLAYFAIR CIPHER Decryption",

    ]


}
const layout: FunctionComponent<typesforlayout> = ({children}) => {
    return children
}
export default layout