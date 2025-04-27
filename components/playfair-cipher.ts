// Playfair Cipher implementation

type PlayfairResult = {
  ciphertext: string;
  plaintext?: string;
  keyMatrix: string[][];
};

class PlayfairCipher {
  // Generate the 5x5 key matrix from the key
  private static generateKeyMatrix(key: string): string[][] {
    // Convert key to uppercase and remove non-alphabetic characters
    const processedKey = key.toUpperCase().replace(/[^A-Z]/g, "");

    // Replace J with I
    const alphabet = "ABCDEFGHIKLMNOPQRSTUVWXYZ"; // Note: No J

    // Create a set to track used characters
    const usedChars = new Set<string>();

    // Start with the key
    const matrixChars: string[] = [];

    // Add key characters (without duplicates)
    for (const char of processedKey) {
      const charToAdd = char === "J" ? "I" : char;
      if (!usedChars.has(charToAdd)) {
        usedChars.add(charToAdd);
        matrixChars.push(charToAdd);
      }
    }

    // Add remaining alphabet characters
    for (const char of alphabet) {
      if (!usedChars.has(char)) {
        usedChars.add(char);
        matrixChars.push(char);
      }
    }

    // Create 5x5 matrix
    const matrix: string[][] = [];
    for (let i = 0; i < 5; i++) {
      matrix.push(matrixChars.slice(i * 5, (i + 1) * 5));
    }

    return matrix;
  }

  // Find the position of a character in the matrix
  private static findPosition(matrix: string[][], char: string): [number, number] {
    const charToFind = char === "J" ? "I" : char;

    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 5; col++) {
        if (matrix[row][col] === charToFind) {
          return [row, col];
        }
      }
    }

    throw new Error(`Character ${char} not found in matrix`);
  }

  // Prepare plaintext for encryption
  private static prepareText(text: string): string {
    // Convert to uppercase and remove non-alphabetic characters
    let prepared = text.toUpperCase().replace(/[^A-Z]/g, "");

    // Replace J with I
    prepared = prepared.replace(/J/g, "I");

    // Split into pairs and handle repeated letters
    const pairs: string[] = [];
    let i = 0;

    while (i < prepared.length) {
      if (i + 1 >= prepared.length) {
        // Add X if the last character is alone
        pairs.push(`${prepared[i]}X`);
        break;
      }

      if (prepared[i] === prepared[i + 1]) {
        // Insert X between repeated letters
        pairs.push(`${prepared[i]}X`);
        i++;
      }
      else {
        pairs.push(prepared[i] + prepared[i + 1]);
        i += 2;
      }
    }

    return pairs.join("");
  }

  // Encrypt plaintext using Playfair Cipher
  public static encrypt(plaintext: string, key: string): PlayfairResult {
    const matrix = this.generateKeyMatrix(key);
    const prepared = this.prepareText(plaintext);
    let result = "";

    // Process each pair of characters
    for (let i = 0; i < prepared.length; i += 2) {
      const char1 = prepared[i];
      const char2 = prepared[i + 1];

      const [row1, col1] = this.findPosition(matrix, char1);
      const [row2, col2] = this.findPosition(matrix, char2);

      let newChar1: string, newChar2: string;

      if (row1 === row2) {
        // Same row - take characters to the right (with wraparound)
        newChar1 = matrix[row1][(col1 + 1) % 5];
        newChar2 = matrix[row2][(col2 + 1) % 5];
      }
      else if (col1 === col2) {
        // Same column - take characters below (with wraparound)
        newChar1 = matrix[(row1 + 1) % 5][col1];
        newChar2 = matrix[(row2 + 1) % 5][col2];
      }
      else {
        // Rectangle - take characters at the other corners
        newChar1 = matrix[row1][col2];
        newChar2 = matrix[row2][col1];
      }

      result += newChar1 + newChar2;
    }

    return {
      ciphertext: result,
      keyMatrix: matrix,
    };
  }

  // Decrypt ciphertext using Playfair Cipher
  public static decrypt(ciphertext: string, key: string): PlayfairResult {
    const matrix = this.generateKeyMatrix(key);
    const processed = ciphertext.toUpperCase().replace(/[^A-Z]/g, "");
    let result = "";

    // Process each pair of characters
    for (let i = 0; i < processed.length; i += 2) {
      if (i + 1 >= processed.length)
        break; // Skip incomplete pair

      const char1 = processed[i];
      const char2 = processed[i + 1];

      const [row1, col1] = this.findPosition(matrix, char1);
      const [row2, col2] = this.findPosition(matrix, char2);

      let newChar1: string, newChar2: string;

      if (row1 === row2) {
        // Same row - take characters to the left (with wraparound)
        newChar1 = matrix[row1][(col1 + 4) % 5]; // +4 is equivalent to -1 mod 5
        newChar2 = matrix[row2][(col2 + 4) % 5];
      }
      else if (col1 === col2) {
        // Same column - take characters above (with wraparound)
        newChar1 = matrix[(row1 + 4) % 5][col1];
        newChar2 = matrix[(row2 + 4) % 5][col2];
      }
      else {
        // Rectangle - take characters at the other corners
        newChar1 = matrix[row1][col2];
        newChar2 = matrix[row2][col1];
      }

      result += newChar1 + newChar2;
    }

    return {
      plaintext: result,
      ciphertext,
      keyMatrix: matrix,
    };
  }
}

export default PlayfairCipher;
