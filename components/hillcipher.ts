// Hill Cipher implementation

class HillCipher {
  // Default key matrix (2x2)
  private static defaultKeyMatrix = [
    [2, 3],
    [1, 4],
  ];

  // Method to convert text to numbers (A=0, B=1, ..., Z=25)
  private static textToNumbers(text: string): number[] {
    return text
      .toUpperCase()
      .replace(/[^A-Z]/g, "")
      .split("")
      .map(char => char.charCodeAt(0) - 65);
  }

  // Method to convert numbers back to text
  private static numbersToText(numbers: number[]): string {
    return numbers.map(num => String.fromCharCode((((num % 26) + 26) % 26) + 65)).join("");
  }

  // Method to parse key matrix from string input
  private static parseKeyMatrix(keyString: string): number[][] {
    if (!keyString.trim()) {
      return this.defaultKeyMatrix;
    }

    try {
      const values = keyString.split(",").map(val => Number.parseInt(val.trim()));

      // For simplicity, we'll assume a 2x2 matrix
      if (values.length === 4) {
        return [
          [values[0], values[1]],
          [values[2], values[3]],
        ];
      }

      return this.defaultKeyMatrix;
    }
    catch (error) {
      console.error(error);

      return this.defaultKeyMatrix;
    }
  }

  // Calculate determinant of a 2x2 matrix
  private static determinant(matrix: number[][]): number {
    return (matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0]) % 26;
  }

  // Calculate modular multiplicative inverse
  private static modInverse(a: number, m: number): number {
    a = ((a % m) + m) % m;
    for (let x = 1; x < m; x++) {
      if ((a * x) % m === 1) {
        return x;
      }
    }
    throw new Error("Modular inverse does not exist");
  }

  // Calculate inverse of a 2x2 matrix
  private static inverseMatrix(matrix: number[][]): number[][] {
    const det = this.determinant(matrix);
    if (det === 0) {
      throw new Error("Matrix is not invertible");
    }

    const detInv = this.modInverse(det, 26);

    // Adjugate matrix
    const adj = [
      [matrix[1][1], -matrix[0][1]],
      [-matrix[1][0], matrix[0][0]],
    ];

    // Multiply adjugate by determinant inverse
    return [
      [(((adj[0][0] * detInv) % 26) + 26) % 26, (((adj[0][1] * detInv) % 26) + 26) % 26],
      [(((adj[1][0] * detInv) % 26) + 26) % 26, (((adj[1][1] * detInv) % 26) + 26) % 26],
    ];
  }

  // Matrix multiplication for 2x2 matrix and a vector
  private static matrixMultiply(matrix: number[][], vector: number[]): number[] {
    return [
      (matrix[0][0] * vector[0] + matrix[0][1] * vector[1]) % 26,
      (matrix[1][0] * vector[0] + matrix[1][1] * vector[1]) % 26,
    ];
  }

  // Encrypt method
  public static encrypt(plaintext: string, keyString = ""): string {
    const keyMatrix = this.parseKeyMatrix(keyString);
    const numbers = this.textToNumbers(plaintext);

    // Pad with 'X' (23) if odd length
    if (numbers.length % 2 !== 0) {
      numbers.push(23); // 'X'
    }

    const result: number[] = [];

    // Process pairs of characters
    for (let i = 0; i < numbers.length; i += 2) {
      const pair = [numbers[i], numbers[i + 1]];
      const encrypted = this.matrixMultiply(keyMatrix, pair);
      result.push(...encrypted);
    }

    return this.numbersToText(result);
  }

  // Decrypt method
  public static decrypt(ciphertext: string, keyString = ""): string {
    try {
      const keyMatrix = this.parseKeyMatrix(keyString);
      const inverseMatrix = this.inverseMatrix(keyMatrix);
      const numbers = this.textToNumbers(ciphertext);

      if (numbers.length % 2 !== 0) {
        throw new Error("Ciphertext length must be even");
      }

      const result: number[] = [];

      // Process pairs of characters
      for (let i = 0; i < numbers.length; i += 2) {
        const pair = [numbers[i], numbers[i + 1]];
        const decrypted = this.matrixMultiply(inverseMatrix, pair);
        result.push(...decrypted);
      }

      return this.numbersToText(result);
    }
    catch (error) {
      console.error("Decryption error:", error);
      return "Decryption failed. Check if the key matrix is invertible.";
    }
  }
}

export default HillCipher;
