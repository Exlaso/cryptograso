export const algos = () => {
  return [
    {
      iscreated: true,
      title: "CEASOR CIPHER",
      short_desc:
        "The Caesar cipher is a simple substitution cipher where each letter in the plaintext is shifted a fixed number of places down or up the alphabet.",
      href: "/CEASORCIPHER",
      enc_dec_supported: true,
      desc: "In cryptography, a Caesar cipher, also known as Caesar's cipher, the shift cipher, Caesar's code, or Caesar shift, is one of the simplest and most widely known encryption techniques. It is a type of substitution cipher in which each letter in the plaintext is replaced by a letter some fixed number of positions down the alphabet. For example, with a left shift of 3, D would be replaced by A, E would become B, and so on. The method is named after Julius Caesar, who used it in his private correspondence.",
    },
    {
      iscreated: true,
      title: "PLAYFAIR CIPHER",
      short_desc:
        "The Playfair cipher is a digraph substitution cipher that encrypts pairs of letters in the plaintext into digraphs using a key-based polyalphabetic approach.",
      href: "/PLAYFAIRCIPHER",
      enc_dec_supported: true,
      desc: "The technique encrypts pairs of letters (bigrams or digrams), instead of single letters as in the simple substitution cipher and rather more complex Vigenère cipher systems then in use. The Playfair is thus significantly harder to break since the frequency analysis used for simple substitution ciphers does not work with it. The frequency analysis of bigrams is possible, but considerably more difficult. With 600[1] possible bigrams rather than the 26 possible monograms (single symbols, usually letters in this context), a considerably larger cipher text is required in order to be useful.",
    },
    {
      iscreated: true,
      title: "HILL CIPHER",
      short_desc:
        "The Hill cipher is a polygraphic substitution cipher that transforms groups of letters in the plaintext into ciphertext using matrix multiplication with a predefined encryption key.",
      href: "/HILLCIPHER",
      enc_dec_supported: false,
      desc: "The Hill cipher is a cryptographic algorithm that operates on blocks of plaintext letters and uses matrix multiplication with a predefined matrix key to transform these blocks into ciphertext, enhancing security through its mathematical structure.",
    },
    {
      iscreated: false,
      title: "VIGENERE CIPHER",
      short_desc:
        "The Vigenère cipher is a polyalphabetic substitution cipher that encrypts text by shifting letters based on a keyword, creating varied letter-to-letter relationships.",
      href: "/VIGNERCIPHER",
      enc_dec_supported: true,
      desc: "The Vigenère cipher is a method of encrypting alphabetic text by using a simple form of polyalphabetic substitution, where each letter in the plaintext is shifted by a corresponding letter in a repeating keyword, creating a more secure encryption compared to simpler substitution ciphers.",
    },
  ];
};
