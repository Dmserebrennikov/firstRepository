'use strict';

function encode(text) {
  let asciiCode = [...text].map(char => char.codePointAt(0));
  let binaryCode = asciiCode.map(item => item.toString(2).padStart(8, '0'));
  let tripledCode = binaryCode.map(item =>
    item
      .split('')
      .map(num => num.repeat(3))
      .join(''),
  );

  return tripledCode.join('');
}

function decode(bits) {
  function split(str, n) {
    if (str) {
      return [str.slice(0, n), split(str.slice(n), n)].flat();
    } else return [];
  }

  function correctBits() {
    return split(bits, 3).map(i => (+i[0] + +i[1] + +i[2] <= 1 ? 0 : 1));
  }

  function getBinaryCode(arr, n) {
    return arr.length
      ? [arr.slice(0, n).join(''), ...getBinaryCode(arr.slice(n), n)]
      : [];
  }

  let binaryCode = getBinaryCode(correctBits(), 8);
  let word = binaryCode
    .map(code => String.fromCharCode(parseInt(code, 2)))
    .join('');
  return word;
}
/*
console.log(
  decode(
    '000111111000111000000000000111111000000111000111000111111111111000000111',
  ),
);
*/

console.log(encode('hey'));
