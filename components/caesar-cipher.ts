// Caesar Cipher implementation

class CaesarCipher {
  // Method to encrypt plaintext using Caesar Cipher
  public static encrypt(plaintext: string, shift: number): string {
    // Ensure shift is between 0-25
    shift = ((shift % 26) + 26) % 26;

    return this.processText(plaintext, (charCode, isUpperCase) => {
      // Apply shift
      const base = isUpperCase ? 65 : 97; // ASCII 'A' or 'a'
      return String.fromCharCode(((charCode - base + shift) % 26) + base);
    });
  }

  // Method to decrypt ciphertext using Caesar Cipher
  public static decrypt(ciphertext: string, shift: number): string {
    // For decryption, we use the opposite shift
    return this.encrypt(ciphertext, 26 - (shift % 26));
  }

  // Helper method to process text
  private static processText(text: string, charProcessor: (charCode: number, isUpperCase: boolean) => string): string {
    return text
      .split("")
      .map((char) => {
        const charCode = char.charCodeAt(0);

        // Check if character is a letter
        if ((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122)) {
          const isUpperCase = charCode >= 65 && charCode <= 90;
          return charProcessor(charCode, isUpperCase);
        }

        // Return non-alphabetic characters unchanged
        return char;
      })
      .join("");
  }
}

export default CaesarCipher;
