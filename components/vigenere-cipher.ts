// Vigenère Cipher implementation

type VigenereResult = {
  ciphertext?: string;
  plaintext?: string;
  keyStream: string;
};

class VigenereCipher {
  // Generate the key stream by repeating the key to match the length of the text
  private static generateKeyStream(text: string, key: string): string {
    // Process text to only include alphabetic characters
    const processedText = text.toUpperCase().replace(/[^A-Z]/g, "");

    // Process key to only include alphabetic characters
    const processedKey = key.toUpperCase().replace(/[^A-Z]/g, "");

    if (processedKey.length === 0) {
      throw new Error("Key must contain at least one letter");
    }

    let keyStream = "";
    let keyIndex = 0;

    // Generate key stream by repeating the key
    for (let i = 0; i < processedText.length; i++) {
      keyStream += processedKey[keyIndex];
      keyIndex = (keyIndex + 1) % processedKey.length;
    }

    return keyStream;
  }

  // Encrypt plaintext using Vigenère Cipher
  public static encrypt(plaintext: string, key: string): VigenereResult {
    // Process plaintext to only include alphabetic characters
    const processedText = plaintext.toUpperCase().replace(/[^A-Z]/g, "");

    // Generate key stream
    const keyStream = this.generateKeyStream(processedText, key);

    let result = "";

    // Encrypt each character
    for (let i = 0; i < processedText.length; i++) {
      const plainChar = processedText.charCodeAt(i) - 65; // A=0, B=1, ..., Z=25
      const keyChar = keyStream.charCodeAt(i) - 65;

      // Apply Vigenère formula: (plaintext + key) mod 26
      const encryptedChar = (plainChar + keyChar) % 26;

      // Convert back to letter
      result += String.fromCharCode(encryptedChar + 65);
    }

    return {
      ciphertext: result,
      keyStream,
    };
  }

  // Decrypt ciphertext using Vigenère Cipher
  public static decrypt(ciphertext: string, key: string): VigenereResult {
    // Process ciphertext to only include alphabetic characters
    const processedText = ciphertext.toUpperCase().replace(/[^A-Z]/g, "");

    // Generate key stream
    const keyStream = this.generateKeyStream(processedText, key);

    let result = "";

    // Decrypt each character
    for (let i = 0; i < processedText.length; i++) {
      const cipherChar = processedText.charCodeAt(i) - 65; // A=0, B=1, ..., Z=25
      const keyChar = keyStream.charCodeAt(i) - 65;

      // Apply Vigenère formula: (ciphertext - key + 26) mod 26
      const decryptedChar = (cipherChar - keyChar + 26) % 26;

      // Convert back to letter
      result += String.fromCharCode(decryptedChar + 65);
    }

    return {
      plaintext: result,
      keyStream,
    };
  }
}

export default VigenereCipher;
