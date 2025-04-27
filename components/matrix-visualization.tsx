"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";

type MatrixVisualizationProps = {
  plaintext: string;
  keyMatrix: string;
  encrypted: string;
};

export default function MatrixVisualization({
  plaintext = "HELLO",
  keyMatrix = "2,3,1,4",
  encrypted = "LQSOO",
}: MatrixVisualizationProps) {
  const [matrix, setMatrix] = useState<number[][]>([
    [2, 3],
    [1, 4],
  ]);

  useEffect(() => {
    if (keyMatrix) {
      try {
        const values = keyMatrix.split(",").map(val => Number.parseInt(val.trim()));
        if (values.length === 4) {
          setMatrix([
            [values[0], values[1]],
            [values[2], values[3]],
          ]);
        }
      }
      catch (e) {
        console.error(e);

        // Keep default matrix
      }
    }
  }, [keyMatrix]);

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex flex-col items-center space-y-4">
          <div className="grid grid-cols-3 gap-4 w-full">
            <div className="flex flex-col items-center">
              <div className="text-xs text-muted-foreground mb-1">Plaintext</div>
              <div className="font-mono bg-muted p-2 rounded w-full text-center">{plaintext.substring(0, 2)}</div>
            </div>
            <div className="flex items-center justify-center">
              <div className="font-mono text-2xl">×</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-xs text-muted-foreground mb-1">Key Matrix</div>
              <div className="font-mono bg-muted p-2 rounded text-center">
                [
                {matrix[0][0]}
                ,
                {" "}
                {matrix[0][1]}
                ]
                <br />
                [
                {matrix[1][0]}
                ,
                {" "}
                {matrix[1][1]}
                ]
              </div>
            </div>
          </div>

          <div className="font-mono text-2xl">↓</div>

          <div className="flex flex-col items-center">
            <div className="text-xs text-muted-foreground mb-1">Ciphertext</div>
            <div className="font-mono bg-primary/10 p-2 rounded w-full text-center">{encrypted.substring(0, 2)}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
