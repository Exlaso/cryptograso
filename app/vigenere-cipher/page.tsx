"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import VigenereCipher from "@/components/vigenere-cipher";
import { CopyIcon, InfoIcon, KeyIcon, LockIcon, RefreshCwIcon, UnlockIcon } from "lucide-react";
import { useState } from "react";

export default function VigenereCipherPage() {
  const [plainText, setPlainText] = useState("");
  const [key, setKey] = useState("KEY");
  const [encryptedText, setEncryptedText] = useState("");
  const [decryptedText, setDecryptedText] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [keyStream, setKeyStream] = useState("");

  const handleEncrypt = () => {
    try {
      setError("");
      const result = VigenereCipher.encrypt(plainText, key);
      setEncryptedText(result.ciphertext || "");
      setKeyStream(result.keyStream);
    }
    catch (err) {
      console.error(err);

      setError("Encryption failed. Please check your input.");
    }
  };

  const handleDecrypt = () => {
    try {
      setError("");
      const result = VigenereCipher.decrypt(encryptedText, key);
      setDecryptedText(result.plaintext || "");
      setKeyStream(result.keyStream);
    }
    catch (err) {
      console.error(err);

      setError("Decryption failed. Please check your input.");
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetForm = () => {
    setPlainText("");
    setKey("KEY");
    setEncryptedText("");
    setDecryptedText("");
    setError("");
    setKeyStream("");
  };

  return (
    <main className="container mx-auto py-8 px-4">
      <div className="flex flex-col items-center mb-10">
        <h1 className="text-5xl font-bold tracking-tight gradient mb-4">
          {" "}
          Vigenère Cipher
        </h1>
        <p className="text-center text-muted-foreground max-w-2xl">
          A method of encrypting alphabetic text by using a simple form of polyalphabetic substitution.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <KeyIcon className="h-5 w-5" />
                Vigenère Cipher Encryption Tool
              </CardTitle>
              <CardDescription>Encrypt or decrypt messages using the Vigenère Cipher algorithm</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="encrypt" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="encrypt" className="flex items-center gap-2">
                    <LockIcon className="h-4 w-4" />
                    {" "}
                    Encrypt
                  </TabsTrigger>
                  <TabsTrigger value="decrypt" className="flex items-center gap-2">
                    <UnlockIcon className="h-4 w-4" />
                    {" "}
                    Decrypt
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="encrypt" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="plaintext">Plain Text</Label>
                    <Textarea
                      id="plaintext"
                      placeholder="Enter text to encrypt..."
                      value={plainText}
                      onChange={e => setPlainText(e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="key">Key</Label>
                    <Input
                      id="key"
                      placeholder="Enter key (e.g., KEY)"
                      value={key}
                      onChange={e => setKey(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      The key will be repeated to match the length of your message.
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={handleEncrypt} className="flex-1">
                      Encrypt
                    </Button>
                    <Button variant="outline" onClick={resetForm} className="flex items-center gap-1">
                      <RefreshCwIcon className="h-4 w-4" />
                      {" "}
                      Reset
                    </Button>
                  </div>

                  {encryptedText && (
                    <div className="mt-4 space-y-2">
                      <Label>Encrypted Result</Label>
                      <div className="relative">
                        <div className="p-3 border rounded-md bg-muted/50 break-all">{encryptedText}</div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2"
                          onClick={() => copyToClipboard(encryptedText)}
                        >
                          <CopyIcon className="h-4 w-4" />
                        </Button>
                      </div>
                      {copied && <p className="text-xs text-green-500">Copied to clipboard!</p>}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="decrypt" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="ciphertext">Cipher Text</Label>
                    <Textarea
                      id="ciphertext"
                      placeholder="Enter text to decrypt..."
                      value={encryptedText}
                      onChange={e => setEncryptedText(e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="decryptkey">Key</Label>
                    <Input
                      id="decryptkey"
                      placeholder="Enter key (e.g., KEY)"
                      value={key}
                      onChange={e => setKey(e.target.value)}
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={handleDecrypt} className="flex-1">
                      Decrypt
                    </Button>
                    <Button variant="outline" onClick={resetForm} className="flex items-center gap-1">
                      <RefreshCwIcon className="h-4 w-4" />
                      {" "}
                      Reset
                    </Button>
                  </div>

                  {decryptedText && (
                    <div className="mt-4 space-y-2">
                      <Label>Decrypted Result</Label>
                      <div className="relative">
                        <div className="p-3 border rounded-md bg-muted/50 break-all">{decryptedText}</div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2"
                          onClick={() => copyToClipboard(decryptedText)}
                        >
                          <CopyIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </TabsContent>
              </Tabs>

              {error && (
                <Alert variant="destructive" className="mt-4">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <InfoIcon className="h-5 w-5" />
                About Vigenère Cipher
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                The Vigenère cipher was invented by Blaise de Vigenère in the 16th century and is a method of encrypting
                alphabetic text using a series of interwoven Caesar ciphers.
              </p>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How it works</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm mb-2">
                      The Vigenère cipher uses a keyword to determine the shift value for each letter in the plaintext:
                    </p>
                    <ol className="list-decimal pl-5 text-sm space-y-1 mb-2">
                      <li>The key is repeated to match the length of the plaintext</li>
                      <li>Each letter of the key determines the shift for the corresponding plaintext letter</li>
                      <li>
                        For example, with key "KEY" and plaintext "HELLO":
                        <ul className="list-disc pl-5 mt-1">
                          <li>K (shift 10) + H = R</li>
                          <li>E (shift 4) + E = I</li>
                          <li>Y (shift 24) + L = J</li>
                          <li>K (shift 10) + L = V</li>
                          <li>E (shift 4) + O = S</li>
                        </ul>
                      </li>
                    </ol>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger>Mathematical representation</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm mb-2">For each letter in the plaintext:</p>
                    <div className="bg-muted p-3 rounded-md mb-2 font-mono text-sm">
                      Encryption: C
                      <sub>i</sub>
                      {" "}
                      = (P
                      <sub>i</sub>
                      {" "}
                      + K
                      <sub>i mod m</sub>
                      ) mod 26
                      <br />
                      Decryption: P
                      <sub>i</sub>
                      {" "}
                      = (C
                      <sub>i</sub>
                      {" "}
                      - K
                      <sub>i mod m</sub>
                      ) mod 26
                    </div>
                    <p className="text-sm">
                      Where P is plaintext, C is ciphertext, K is the key, i is the position in the text, and m is the
                      length of the key.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger>Security considerations</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm">
                      The Vigenère cipher was considered "unbreakable" for three centuries until Friedrich Kasiski
                      published a general method of deciphering in 1863. The cipher is vulnerable to:
                    </p>
                    <ul className="list-disc pl-5 text-sm space-y-1 mt-2">
                      <li>Kasiski examination (finding repeated sequences in the ciphertext)</li>
                      <li>Frequency analysis (once the key length is known)</li>
                      <li>Index of coincidence methods</li>
                    </ul>
                    <p className="text-sm mt-2">
                      While more secure than simple substitution ciphers, it's not suitable for modern secure
                      communications.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Key Visualization</CardTitle>
            </CardHeader>
            <CardContent>
              {keyStream
                ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 gap-2">
                        <div className="p-3 bg-muted/30 rounded-md">
                          <p className="text-xs text-muted-foreground mb-1">Key Stream:</p>
                          <div className="font-mono break-all">{keyStream}</div>
                        </div>
                        <div className="p-3 bg-muted/30 rounded-md">
                          <p className="text-xs text-muted-foreground mb-1">Visualization:</p>
                          <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                              <tbody>
                                <tr className="border-b">
                                  <td className="p-1 font-semibold w-20">Plaintext:</td>
                                  <td className="p-1 font-mono">
                                    {plainText
                                      .toUpperCase()
                                      .replace(/[^A-Z]/g, "")
                                      .split("")
                                      .map((char, i) => (
                                        <span key={i} className="inline-block w-6 text-center">
                                          {char}
                                        </span>
                                      ))}
                                  </td>
                                </tr>
                                <tr className="border-b">
                                  <td className="p-1 font-semibold">Key:</td>
                                  <td className="p-1 font-mono">
                                    {keyStream.split("").map((char, i) => (
                                      <span key={i} className="inline-block w-6 text-center">
                                        {char}
                                      </span>
                                    ))}
                                  </td>
                                </tr>
                                <tr>
                                  <td className="p-1 font-semibold">Ciphertext:</td>
                                  <td className="p-1 font-mono">
                                    {encryptedText.split("").map((char, i) => (
                                      <span key={i} className="inline-block w-6 text-center">
                                        {char}
                                      </span>
                                    ))}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                : (
                    <div className="text-center p-6 text-muted-foreground">
                      Encrypt or decrypt a message to see the key visualization.
                    </div>
                  )}
              <Separator className="my-4" />
              <div className="text-sm text-center text-muted-foreground">
                <p>
                  The key "
                  {key}
                  " is repeated to match the length of your message.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
