import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LockIcon } from "lucide-react";
import Link from "next/link";

export const ciphers = [
  {
    name: "Caesar Cipher",
    description: "A simple substitution cipher that shifts letters by a fixed amount",
    path: "/caesar-cipher",
    color: "from-red-600 to-orange-600",
  },
  {
    name: "Hill Cipher",
    description: "A polygraphic substitution cipher based on linear algebra",
    path: "/hill-cipher",
    color: "from-purple-600 to-blue-600",
  },
  {
    name: "Playfair Cipher",
    description: "A manual symmetric encryption technique using a 5×5 table of letters",
    path: "/playfair-cipher",
    color: "from-green-600 to-teal-600",
  },
  {
    name: "Vigenère Cipher",
    description: "A method of encrypting text using a series of interwoven Caesar ciphers",
    path: "/vigenere-cipher",
    color: "from-blue-600 to-indigo-600",
  },
];

export default function CipherNavigation() {
  return (
    <Card className="shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <LockIcon className="h-5 w-5" />
          <h2 className="text-xl font-semibold">Cipher Navigation</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ciphers.map(cipher => (
            <Link href={cipher.path} key={cipher.path} className="block">
              <Button
                variant="outline"
                className="w-full h-auto flex flex-col items-start p-4 gap-1 text-left hover:bg-muted/50"
              >
                <span className={`text-lg font-medium bg-gradient-to-r ${cipher.color} bg-clip-text text-transparent`}>
                  {cipher.name}
                </span>
                <span className="text-sm text-muted-foreground whitespace-break-spaces">{cipher.description}</span>
              </Button>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
