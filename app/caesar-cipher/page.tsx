"use client";

import CaesarCipher from "@/components/caesar-cipher";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { CopyIcon, InfoIcon, KeyIcon, LockIcon, RefreshCwIcon, UnlockIcon } from "lucide-react";
import { useState } from "react";

export default function CaesarCipherPage() {
  const [plainText, setPlainText] = useState("");
  const [shift, setShift] = useState(3);
  const [encryptedText, setEncryptedText] = useState("");
  const [decryptedText, setDecryptedText] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleEncrypt = () => {
    try {
      setError("");
      const encrypted = CaesarCipher.encrypt(plainText, shift);
      setEncryptedText(encrypted);
    }
    catch (err) {
      console.error(err);
      setError("Encryption failed. Please check your input.");
    }
  };

  const handleDecrypt = () => {
    try {
      setError("");
      const decrypted = CaesarCipher.decrypt(encryptedText, shift);
      setDecryptedText(decrypted);
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
    setShift(3);
    setEncryptedText("");
    setDecryptedText("");
    setError("");
  };

  return (
    <main className="container mx-auto py-8 px-4">
      <div className="flex flex-col items-center mb-10">
        <h1 className="text-5xl font-bold tracking-tight gradient mb-4">
          Caesar Cipher
        </h1>
        <p className="text-center text-muted-foreground max-w-2xl">
          One of the simplest and most widely known encryption techniques, named after Julius Caesar.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <KeyIcon className="h-5 w-5" />
                Caesar Cipher Encryption Tool
              </CardTitle>
              <CardDescription>
                Encrypt or decrypt messages using the Caesar Cipher
                algorithm
              </CardDescription>
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
                    <div className="flex justify-between">
                      <Label htmlFor="shift">
                        Shift Value:
                        {shift}
                      </Label>
                      <span className="text-sm text-muted-foreground">(0-25)</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <Slider
                        id="shift"
                        min={0}
                        max={25}
                        step={1}
                        value={[shift]}
                        onValueChange={value => setShift(value[0])}
                        className="flex-1"
                      />
                      <Input
                        type="number"
                        min={0}
                        max={25}
                        value={shift}
                        onChange={e => setShift(Number(e.target.value))}
                        className="w-16"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={handleEncrypt} className="flex-1">
                      Encrypt
                    </Button>
                    <Button
                      variant="outline"
                      onClick={resetForm}
                      className="flex items-center gap-1"
                    >
                      <RefreshCwIcon className="h-4 w-4" />
                      {" "}
                      Reset
                    </Button>
                  </div>

                  {encryptedText && (
                    <div className="mt-4 space-y-2">
                      <Label>Encrypted Result</Label>
                      <div className="relative">
                        <div
                          className="p-3 border rounded-md bg-muted/50 break-all"
                        >
                          {encryptedText}
                        </div>
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
                    <div className="flex justify-between">
                      <Label htmlFor="decryptshift">
                        Shift Value:
                        {shift}
                      </Label>
                      <span className="text-sm text-muted-foreground">(0-25)</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <Slider
                        id="decryptshift"
                        min={0}
                        max={25}
                        step={1}
                        value={[shift]}
                        onValueChange={value => setShift(value[0])}
                        className="flex-1"
                      />
                      <Input
                        type="number"
                        min={0}
                        max={25}
                        value={shift}
                        onChange={e => setShift(Number(e.target.value))}
                        className="w-16"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={handleDecrypt} className="flex-1">
                      Decrypt
                    </Button>
                    <Button
                      variant="outline"
                      onClick={resetForm}
                      className="flex items-center gap-1"
                    >
                      <RefreshCwIcon className="h-4 w-4" />
                      {" "}
                      Reset
                    </Button>
                  </div>

                  {decryptedText && (
                    <div className="mt-4 space-y-2">
                      <Label>Decrypted Result</Label>
                      <div className="relative">
                        <div
                          className="p-3 border rounded-md bg-muted/50 break-all"
                        >
                          {decryptedText}
                        </div>
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
                About Caesar Cipher
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                The Caesar Cipher is one of the earliest known encryption techniques, dating back to
                Julius Caesar who
                used it to communicate with his generals.
              </p>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How it works</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm mb-2">
                      The Caesar Cipher works by shifting each letter in the plaintext by a fixed
                      number of positions
                      down the alphabet. For example, with a shift of 3:
                    </p>
                    <ul className="list-disc pl-5 text-sm space-y-1 mb-2">
                      <li>A becomes D</li>
                      <li>B becomes E</li>
                      <li>Z becomes C (wrapping around)</li>
                    </ul>
                    <p className="text-sm">
                      To decrypt, you simply shift in the opposite direction by the same amount.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger>Mathematical representation</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm mb-2">For each letter in the plaintext:</p>
                    <div className="bg-muted p-3 rounded-md mb-2 font-mono text-sm">
                      Encryption: E(x) = (x + k) mod 26
                      <br />
                      Decryption: D(x) = (x - k) mod 26
                    </div>
                    <p className="text-sm">
                      Where x is the position of the letter (A=0, B=1, ..., Z=25) and k is the
                      shift value.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger>Security considerations</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm">
                      The Caesar Cipher is extremely weak by modern standards. With only 25
                      possible shifts, an attacker
                      can easily try all possibilities (brute force attack). It's also vulnerable
                      to frequency analysis,
                      where common letters in the language can be identified by their frequency in
                      the ciphertext.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Visualization</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center p-4 bg-muted/30 rounded-md">
                <div className="space-y-4 w-full">
                  <div className="grid grid-cols-26 text-center text-xs overflow-x-auto pb-2">
                    {Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)).map((char, i) => (
                      <div key={i} className="w-8 p-1 border-r last:border-r-0 font-mono">
                        {char}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-26 text-center text-xs overflow-x-auto pb-2">
                    {Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + (
                      (
                        i + shift
                      ) % 26
                    ))).map(
                      (char, i) => (
                        <div
                          key={i}
                          className={`w-8 p-1 border-r last:border-r-0 font-mono ${
                            i === 0 ? "bg-primary/20 rounded" : ""
                          }`}
                        >
                          {char}
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="text-sm text-center text-muted-foreground">
                <p>
                  The alphabet is shifted by
                  {" "}
                  {shift}
                  {" "}
                  position
                  {shift !== 1 ? "s" : ""}
                  .
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
