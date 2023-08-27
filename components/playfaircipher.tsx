const iorj = (str: string) => {
  if (str.includes("j")) {
    return [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
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
  } else {
    return [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
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
  }
};
const generate5x5Matrix = () => {
  const matrix: string[][] = [[], [], [], [], []];
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      matrix[i][j] = " ";
    }
  }
  return matrix;
};
const removespace = (Text: string) => Text.replaceAll(" ", "");
const isEven = (val: number) => val % 2 === 0;
const IsonlyAlpha = (key: string, plain_text: string) =>
  /^[a-zA-Z]+$/.test(plain_text.toUpperCase()) &&
  /^[a-zA-Z]+$/.test(key.toUpperCase());

const encrypt = (plain_text: string, key: string): string => {
  plain_text = removespace(plain_text);
  key = removespace(key);


  if (!IsonlyAlpha(key, plain_text)) {
    throw new Error("Value and key only can be Alphabet");
  }
  if (key.includes("i") && key.includes("j")) {
    throw new Error("Key can't Consist `I` and `J` together");
  }
  if (!key.includes("i") && plain_text.includes("i")) {
    throw new Error("If plain text consist I, then Key must have i");
  } else if (!key.includes("j") && plain_text.includes("j")) {
    throw new Error("If plain text consist j, then Key  must have j");
  }
  const alpha = iorj(key);

  const Matrix: string[][] = generate5x5Matrix();

  const pairedvalues = makePair(plain_text);

  key = removeMultipleOccurence((key));

  let i: number = 0;
  let j: number = 0;
  key.split("").forEach((element) => {
    Matrix[i][j] = element.toLowerCase();
    j++;
    if (j == 5) {
      i++;
      j = 0;
    }
  });
  alpha.forEach((element) => {
    if (!key.includes(element)) {
      Matrix[i][j] = element.toLowerCase();
      j++;
      if (j == 5) {
        i++;
        j = 0;
      }
    }
  });
  let Newvalue: string = "";

  pairedvalues.forEach((element) => {
    const Coords: CoordsofPair = {
      first: searchinMatrix(element[0].toLowerCase(), Matrix),
      second: searchinMatrix(element[1].toLowerCase(), Matrix),
    };


    const NewCoords = encryptusingvirtualbox(Coords);
    const NewValueoffirst = Matrix[NewCoords.first.column][NewCoords.first.row];
    const NewValueofsecond =
      Matrix[NewCoords.second.column][NewCoords.second.row];

    Newvalue += NewValueoffirst + NewValueofsecond;
  });
  return Newvalue.toUpperCase();
};

const removeMultipleOccurence = (plaintext: string) => {
  plaintext = plaintext.toLowerCase();
  let newstr: string = "";
  plaintext.split("").map((e) => {
    if (!newstr.includes(e)) {
      newstr += e;
    }
  });
  return newstr;
};
const AddXtoSamePair = (plaintext: string) => {
  let newstr: string = plaintext;
  plaintext.split("").map((e) => {
    newstr = newstr.replaceAll(`${e + e}`, `${e + "x" + e}`);
  });
  return newstr;
};

const searchinMatrix = (char: string, matrix: string[][]): rawcoord => {
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      if (char === matrix[i][j]) {
        return { row: j, column: i };
      }
    }
  }
  return { row: 0, column: 0 };
};

type rawcoord = {
  column: number;
  row: number;
};

type CoordsofPair = {
  first: rawcoord;
  second: rawcoord;
};

const encryptusingvirtualbox = (coords: CoordsofPair): CoordsofPair => {
  if (
    coords.first.column === coords.second.column &&
    coords.first.row === coords.second.row
  ) {
    return coords;
  }
  if (coords.first.column === coords.second.column) {
    return {
      first: { row: (coords.first.row + 1) % 5, column: coords.second.column },
      second: {
        row: (coords.second.row + 1) % 5,
        column: coords.second.column,
      },
    };
  }
  if (coords.first.row === coords.second.row) {
    return {
      first: { column: coords.first.column + (1 % 5), row: coords.second.row },
      second: {
        column: coords.second.column + (1 % 5),
        row: coords.second.row,
      },
    };
  }
  const newfirstcoord: rawcoord = {
    column: coords.first.column,
    row: coords.second.row,
  };
  const newsecondcoord: rawcoord = {
    column: coords.second.column,
    row: coords.first.row,
  };
  return { first: newfirstcoord, second: newsecondcoord };
};

const makePair = (str: string) => {
  str = AddXtoSamePair(str);
  const newarray: string[] = [];
  if (!isEven(str.length)) str += "x";
  str.split("").map((e, i) => {
    if (isEven(i)) {
      newarray.push(`${e + str[i + 1]}`);
    }
  });
  return newarray;
};

function mod(n: number, p: number) {
  if (n < 0) {
    n = p - (Math.abs(n) % p);
  }

  return n % p;
}

const decrypt = (plain_text: string, key: string): string => {
  plain_text = removespace(plain_text);
  key = removespace(key);


  if (!IsonlyAlpha(key, plain_text)) {
    throw new Error("Value and key only can be Alphabet");
  }
  if (key.includes("i") && key.includes("j")) {
    throw new Error("Key can't Consist `I` and `J` together");
  }
  if (!key.includes("i") && plain_text.includes("i")) {
    throw new Error("If plain text consist I, then Key must have i");
  } else if (!key.includes("j") && plain_text.includes("j")) {
    throw new Error("If plain text consist j, then Key  must have j");
  }
  const alpha = iorj(key);

  const Matrix: string[][] = generate5x5Matrix();

  const pairedvalues = makePair(plain_text);

  key = removeMultipleOccurence((key));

  let i: number = 0;
  let j: number = 0;
  key.split("").forEach((element) => {
    Matrix[i][j] = element.toLowerCase();
    j++;
    if (j == 5) {
      i++;
      j = 0;
    }
  });
  alpha.forEach((element) => {
    if (!key.includes(element)) {
      Matrix[i][j] = element.toLowerCase();
      j++;
      if (j == 5) {
        i++;
        j = 0;
      }
    }
  });
  let Newvalue: string = "";

  pairedvalues.forEach((element) => {
    const Coords: CoordsofPair = {
      first: searchinMatrix(element[0].toLowerCase(), Matrix),
      second: searchinMatrix(element[1].toLowerCase(), Matrix),
    };


    const NewCoords = decryptusingvirtualbox(Coords);
    const NewValueoffirst = Matrix[NewCoords.first.column][NewCoords.first.row];
    const NewValueofsecond =
      Matrix[NewCoords.second.column][NewCoords.second.row];

    Newvalue += NewValueoffirst + NewValueofsecond;
  });
  return Newvalue.toUpperCase();
};

const decryptusingvirtualbox = (coords: CoordsofPair): CoordsofPair => {
  if (
    coords.first.column === coords.second.column &&
    coords.first.row === coords.second.row
  ) {
    return coords;
  }
  if (coords.first.column === coords.second.column) {
    return {
      first: {
        row: mod(coords.first.row - 1, 5),
        column: coords.second.column,
      },
      second: {
        row: mod(coords.second.row - 1, 5),
        column: coords.second.column,
      },
    };
  }
  if (coords.first.row === coords.second.row) {
    return {
      first: {
        column: mod(coords.first.column - 1, 5),
        row: coords.second.row,
      },
      second: {
        column: mod(coords.second.column - 1, 5),
        row: coords.second.row,
      },
    };
  }
  const newfirstcoord: rawcoord = {
    column: coords.first.column,
    row: coords.second.row,
  };
  const newsecondcoord: rawcoord = {
    column: coords.second.column,
    row: coords.first.row,
  };
  return { first: newfirstcoord, second: newsecondcoord };
};

const playfaircipher = {
  encrypt,
  decrypt,
};

export default playfaircipher;
