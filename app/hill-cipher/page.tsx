"use client";

import HillCipher from "@/components/hillcipher";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { CopyIcon, InfoIcon, KeyIcon, LockIcon, RefreshCwIcon, UnlockIcon } from "lucide-react";
import { useState } from "react";

export default function HillCipherPage() {
  const [plainText, setPlainText] = useState("");
  const [keyMatrix, setKeyMatrix] = useState(""); // Added key matrix input
  const [encryptedText, setEncryptedText] = useState("");
  const [decryptedText, setDecryptedText] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleEncrypt = () => {
    try {
      setError("");
      // You can modify this to use the key matrix if your HillCipher component supports it
      const encrypted = HillCipher.encrypt(plainText);
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
      // Implement decryption using your HillCipher component
      const decrypted = HillCipher.decrypt ? HillCipher.decrypt(encryptedText) : "Decryption not implemented";
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
    setKeyMatrix("");
    setEncryptedText("");
    setDecryptedText("");
    setError("");
  };

  return (
    <main className="container mx-auto py-8 px-4">
      <div className="flex flex-col items-center mb-10">
        <h1 className="text-5xl font-bold tracking-tight gradient mb-4">
          Hill Cipher
        </h1>
        <p className="text-center text-muted-foreground max-w-2xl">
          A classical polygraphic substitution cipher that operates on blocks of letters using matrix multiplication.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <KeyIcon className="h-5 w-5" />
                Hill Cipher Encryption Tool
              </CardTitle>
              <CardDescription>Encrypt or decrypt messages using the Hill Cipher algorithm</CardDescription>
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
                    <Label htmlFor="keymatrix">Key Matrix (Optional)</Label>
                    <Input
                      id="keymatrix"
                      placeholder="e.g., 2,3,1,4 for a 2x2 matrix"
                      value={keyMatrix}
                      onChange={e => setKeyMatrix(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Enter comma-separated values for your key matrix. Leave empty to use default key.
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
                    <Label htmlFor="decryptkeymatrix">Key Matrix (Optional)</Label>
                    <Input
                      id="decryptkeymatrix"
                      placeholder="e.g., 2,3,1,4 for a 2x2 matrix"
                      value={keyMatrix}
                      onChange={e => setKeyMatrix(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Enter comma-separated values for your key matrix. Leave empty to use default key.
                    </p>
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
                About Hill Cipher
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                The Hill Cipher is a polygraphic substitution cipher based on linear algebra, invented by Lester S. Hill
                in 1929.
              </p>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How it works</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm mb-2">
                      The Hill Cipher divides the plaintext into blocks of fixed length and treats each block as a
                      vector. These vectors are then multiplied by a key matrix to produce the ciphertext.
                    </p>
                    <p className="text-sm">
                      For decryption, the inverse of the key matrix is used to transform the ciphertext back to
                      plaintext.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger>Mathematical foundation</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm mb-2">For a 2×2 Hill Cipher with key matrix K:</p>
                    <div className="bg-muted p-3 rounded-md mb-2 font-mono text-sm">
                      K = [a b]
                      <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;[c d]
                    </div>
                    <p className="text-sm mb-2">
                      Encryption: C = K × P (mod 26)
                      <br />
                      Decryption: P = K⁻¹ × C (mod 26)
                    </p>
                    <p className="text-sm">Where K⁻¹ is the matrix inverse, P is plaintext, and C is ciphertext.</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger>Security considerations</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm">
                      The Hill Cipher is vulnerable to known-plaintext attacks. Its security depends on the key matrix
                      being invertible and the difficulty of determining the key without sufficient plaintext-ciphertext
                      pairs. While not secure by modern standards, it remains an important historical cipher and
                      educational tool.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Matrix Visualization</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center p-4 bg-muted/30 rounded-md">
                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-3 bg-primary/10 rounded-md">
                    <p className="text-xs text-muted-foreground mb-1">Key Matrix (K)</p>
                    <div className="font-mono">
                      [a b]
                      <br />
                      [c d]
                    </div>
                  </div>
                  <div className="p-3 bg-primary/10 rounded-md">
                    <p className="text-xs text-muted-foreground mb-1">Inverse Matrix (K⁻¹)</p>
                    <div className="font-mono">
                      [d -b]
                      <br />
                      [-c a]
                    </div>
                  </div>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="text-sm text-center text-muted-foreground">
                <p>The determinant must be non-zero and coprime with 26 for the key matrix to be valid.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
