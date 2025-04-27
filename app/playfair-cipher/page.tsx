"use client";

import PlayfairCipher from "@/components/playfair-cipher";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { CopyIcon, EyeIcon, InfoIcon, KeyIcon, LockIcon, RefreshCwIcon, UnlockIcon } from "lucide-react";
import { useState } from "react";

export default function PlayfairCipherPage() {
  const [plainText, setPlainText] = useState("");
  const [key, setKey] = useState("MONARCHY");
  const [encryptedText, setEncryptedText] = useState("");
  const [decryptedText, setDecryptedText] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [keyMatrix, setKeyMatrix] = useState<string[][]>([]);
  const [showMatrix, setShowMatrix] = useState(false);

  const handleEncrypt = () => {
    try {
      setError("");
      const result = PlayfairCipher.encrypt(plainText, key);
      setEncryptedText(result.ciphertext);
      setKeyMatrix(result.keyMatrix);
      setShowMatrix(true);
    }
    catch (err) {
      console.error(err);

      setError("Encryption failed. Please check your input.");
    }
  };

  const handleDecrypt = () => {
    try {
      setError("");
      const result = PlayfairCipher.decrypt(encryptedText, key);
      setDecryptedText(result.plaintext || "");
      setKeyMatrix(result.keyMatrix);
      setShowMatrix(true);
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
    setKey("MONARCHY");
    setEncryptedText("");
    setDecryptedText("");
    setError("");
    setShowMatrix(false);
  };

  return (
    <main className="container mx-auto py-8 px-4">
      <div className="flex flex-col items-center mb-10">
        <h1 className="text-5xl font-bold tracking-tight gradient mb-4">
          {" "}
          Playfair Cipher
        </h1>
        <p className="text-center text-muted-foreground max-w-2xl">
          A manual symmetric encryption technique that uses a 5×5 table of letters for digraph substitution.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <KeyIcon className="h-5 w-5" />
                Playfair Cipher Encryption Tool
              </CardTitle>
              <CardDescription>Encrypt or decrypt messages using the Playfair Cipher algorithm</CardDescription>
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
                    <p className="text-xs text-muted-foreground">
                      Note: J is replaced with I in Playfair Cipher. Non-alphabetic characters are removed.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="key">Key</Label>
                    <Input
                      id="key"
                      placeholder="Enter key (e.g., MONARCHY)"
                      value={key}
                      onChange={e => setKey(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      The key is used to generate the 5x5 matrix for encryption.
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
                      placeholder="Enter key (e.g., MONARCHY)"
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
                About Playfair Cipher
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                The Playfair cipher was invented by Charles Wheatstone in 1854, but named after Lord Playfair who
                promoted its use. It was the first practical digraph substitution cipher.
              </p>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How it works</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm mb-2">
                      The Playfair cipher encrypts pairs of letters (digraphs) instead of single letters:
                    </p>
                    <ol className="list-decimal pl-5 text-sm space-y-1 mb-2">
                      <li>
                        Create a 5×5 matrix using a keyword, filling remaining cells with unused letters (I/J share a
                        cell)
                      </li>
                      <li>Split plaintext into pairs of letters, adding 'X' if needed to complete a pair</li>
                      <li>For each pair, apply the following rules:</li>
                    </ol>
                    <ul className="list-disc pl-8 text-sm space-y-1 mb-2">
                      <li>If letters are in the same row, use letters to their right (wrapping if necessary)</li>
                      <li>If letters are in the same column, use letters below them (wrapping if necessary)</li>
                      <li>If letters form a rectangle, use letters at the other corners of the rectangle</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger>Key matrix generation</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm mb-2">The key matrix is generated as follows:</p>
                    <ol className="list-decimal pl-5 text-sm space-y-1 mb-2">
                      <li>Write the keyword, removing duplicate letters</li>
                      <li>Fill the remaining cells with unused letters of the alphabet</li>
                      <li>Traditionally, I and J share the same cell (usually I)</li>
                    </ol>
                    <p className="text-sm">
                      For example, with the key "MONARCHY", the matrix begins with "MONARC HY" followed by the remaining
                      letters of the alphabet.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger>Security considerations</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm">
                      The Playfair cipher was a significant improvement over simple substitution ciphers. It resists
                      frequency analysis of single letters, as the most common letters in the language are now spread
                      across multiple digraphs. However, it is still vulnerable to frequency analysis of digraphs and
                      other cryptanalytic techniques. It's no longer considered secure for sensitive communications but
                      remains an important historical cipher.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>Key Matrix</CardTitle>
              <Button variant="outline" size="sm" className="h-8 gap-1" onClick={() => setShowMatrix(!showMatrix)}>
                <EyeIcon className="h-4 w-4" />
                {showMatrix ? "Hide" : "Show"}
                {" "}
                Matrix
              </Button>
            </CardHeader>
            <CardContent>
              {showMatrix && keyMatrix.length > 0
                ? (
                    <div className="p-4 bg-muted/30 rounded-md">
                      <div className="grid grid-cols-5 gap-1 text-center">
                        {keyMatrix.map((row, rowIndex) =>
                          row.map((cell, colIndex) => (
                            <div
                              key={`${rowIndex}-${colIndex}`}
                              className="w-10 h-10 flex items-center justify-center border rounded-md font-mono bg-background"
                            >
                              {cell}
                            </div>
                          )),
                        )}
                      </div>
                    </div>
                  )
                : (
                    <div className="text-center p-6 text-muted-foreground">
                      {showMatrix
                        ? "Generate a key matrix by encrypting or decrypting a message."
                        : "Click 'Show Matrix' to view the key matrix after encryption/decryption."}
                    </div>
                  )}
              <Separator className="my-4" />
              <div className="text-sm text-center text-muted-foreground">
                <p>
                  The 5×5 matrix is derived from your key:
                  {key || "MONARCHY"}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
