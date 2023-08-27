const alphabet = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  
  const addatotext = (text: string, matrixsize: number) => {
    for (let i = text.length; i < matrixsize * matrixsize; i++) {
      text += "a";
    }
    return text;
  };
  const removespace = (Text: string) => Text.replaceAll(" ", "");
  
  const isEven = (val: number) => val % 2 === 0;
  const encrypt = (plain_text: string, key: string): string => {
      plain_text = removespace(plain_text);
      key = removespace(key);
    if (!plain_text) {
      throw new Error("Plain Text Can't Be Empty");
    }
    if (!key) {
      throw new Error("Key Can't Be Empty");
    }
    if (!/^[a-zA-Z]+$/.test(plain_text)) {
      throw new Error("Plain Text only can be Alphabet");
    }
    if (!/^[a-zA-Z]+$/.test(key)) {
      throw new Error("Key only can be Alphabet");
    }
    key = key.substring(9, -1);
  
    const matrixsize = FindMatrixSize(key);
    const keymatrix: number[][] = MakekeyMatrix(key, matrixsize);
  
    const pairofplainttext = makePair(
      addatotext(plain_text, matrixsize),
      matrixsize
    );
  
    const textmatrix: number[][] = [];
    pairofplainttext.forEach((element) => {
      if (matrixsize === 2) {
        textmatrix.push(Make1x2Matrix(element));
      } else {
        textmatrix.push(Make1x3Matrix(element));
      }
    });
    let encryptedstring: string = "";
    const newencryptvalues = multiplymatrices(keymatrix, textmatrix, matrixsize);
  
    for (const ele of newencryptvalues) {
      for (const inner of ele) {
        encryptedstring += alphabet[inner];
      }
    }
  
    return encryptedstring;
  };
  
  const multiplymatrices = (
    FirstMatrix: number[][],
    SecondMatrix: number[][],
    size: number
  ) => {
    var newmatrix: number[][] = [];
    for (let i = 0; i < SecondMatrix.length; i++) {
      newmatrix[i] = crossmultiply(FirstMatrix, SecondMatrix[i]);
    }
  
    return newmatrix;
  };
  
  function mod(n: number, p: number) {
    if (n < 0) {
      n = p - (Math.abs(n) % p);
    }
  
    return n % p;
  }
  const crossmultiply = (amat: number[][], bmat: number[]) => {
    const newmatrix: number[] = [];
    let sum: number = 0;
    for (let i: number = 0; i < amat.length; i++) {
      let sum = 0;
      for (let j: number = 0; j < amat.length; j++) {
        sum += amat[i][j] * bmat[j];
      }
      newmatrix.push(mod(sum, 26));
    }
    return newmatrix;
  };
  
  const makePair = (text: string, size: number) => {
    let matrix: string[] = [];
  
    for (let i = 0; i < text.length; i++) {
      if (size === 2) {
        matrix.push(`${text[i]}${text[i + 1]}`);
      } else {
        matrix.push(`${text[i]}${text[i + 1]}${text[i + 2]}`);
      }
  
      i += size - 1;
    }
  
    return matrix;
  };
  const Make1x2Matrix = (text: string): number[] => {
    let matrix: number[] = [];
    const pair = makePair(text, 2);
  
    pair.forEach((ele) => {
      matrix[0] = alphabet.indexOf(ele[0].toLowerCase());
      matrix[1] = alphabet.indexOf(ele[1].toLowerCase());
    });
    return matrix;
  };
  const Make1x3Matrix = (pair: string): number[] => {
    let matrix: number[] = [];
    matrix[0] = alphabet.indexOf(pair[0].toLowerCase());
    matrix[1] = alphabet.indexOf(pair[1].toLowerCase());
    matrix[2] = alphabet.indexOf(pair[2].toLowerCase());
    return matrix;
  };
  
  const FindMatrixSize = (key: string): number => {
    if (key.length > 0 && key.length < 5) {
      return 2;
    } else if (key.length > 4 && key.length < 10) {
      return 3;
    } else {
      return 3;
    }
  };
  const Create2x2Matrix = (): number[][] => {
    let matrix: number[][] = [[], []];
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 2; j++) {
        matrix[i][j] = 0;
      }
    }
    return matrix;
  };
  const Create3x3Matrix = (): number[][] => {
    let matrix: number[][] = [[], [], []];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        matrix[i][j] = 0;
      }
    }
    return matrix;
  };
  
  const MakekeyMatrix = (key: string, matrixsize: number): number[][] => {
    const matrix = matrixsize === 2 ? Create2x2Matrix() : Create3x3Matrix();
  
    let i = 0,
      j = 0;
  
    key.split("").forEach((element) => {
      matrix[i][j] = alphabet.indexOf(element.toLowerCase());
      j++;
      if (j === matrixsize) {
        i++;
        j = 0;
      }
    });
    return matrix;
  };
  console.log(encrypt("exlaso", "exla"));
//   "exlaso", "exla" zssreq