/*
problem
- take a string that verbally expresses an arithmetic operation and return an integer that evaluates to the result of the operation.
- division should be rounded to the nearest whole number, with 5 rounding up.
- invalid string should return "Invalid input".
- valid operators are plus, minus, times or multiplied by, over or divided by.

examples
- What is 3 plus seven? returns 10.
- What is 4 minus 3? returns 1.
- What is 2 multiplied by/times 3? returns 6.
- What is 10 divided by/over 2? returns 5.

algorithm
- input is a string.
- valid string is string that contains a number, space, one of the operators, space, number.
- pull expression from surrounding string.
- replace "mulitipled by" with "times" and "divided by" with "over" (easier to perform next step with one-word expressions).
- split by space into array, e.g. change `1 plus 1` into `['1', 'plus', '1'].
- convert the two operands from strings to numbers.
- evaluate expression and return result.
  - use a switch statement to evaluate the term in the middle of the array (e.g. 'plus')
  - in each switch case, perform the appropriate operation and return the result.
*/

function arithmetic(string) {
  let regex = /-?\d+ (plus|minus|times|multiplied by|over|divided by) -?\d+/
  let expressionString = string.match(regex)[0];
  expressionString = expressionString.replace('divided by', 'over');
  expressionString = expressionString.replace('multiplied by', 'times');

  let expressionArray = expressionString.split(' ');
  expressionArray[0] = parseInt(expressionArray[0], 10);
  expressionArray[2] = parseInt(expressionArray[2], 10);

  switch (expressionArray[1]) {
    case 'plus': return expressionArray[0] + expressionArray[2]; 
    case 'minus': return expressionArray[0] - expressionArray[2]; 
    case 'times': return expressionArray[0] * expressionArray[2]; 
    case 'over': return Math.round(expressionArray[0] / expressionArray[2]); 
  }
}

// console.log(arithmetic('what is 1 plus 1?'));
// console.log(arithmetic('what is 7 minus 3?'));
// console.log(arithmetic('what is -31 times -2?'));
// console.log(arithmetic('what is 2 multiplied by 31?'));
// console.log(arithmetic('what is 17 over -3?'));
// console.log(arithmetic('what is 12 divided by 4?'));

/*
- Input is a string.
- Output is an array of all substrings of the string.
- Split the string into an array of characters.
- Map each character to an array of all the substrings that begin with the character. 
  - Use `flatMap` to avoid having to flatten each array.
  - Use `slice` to get substrings.
*/

function substrings(string) {
  let result = [];
  let strLen = string.length;
  for (let idx = 0; idx < strLen; idx++) {
    for (let idx2 = idx; idx2 < strLen; idx2++) {
      result.push(string.slice(idx, idx2 + 1));
    }
  }

  return result;
}

// console.log(substrings('abcdef'));

function getCoords(board, piece) {
  return board.map((row, index) => {
    if (row.indexOf(piece) !== -1) return [index, row.indexOf(piece)];
  }).filter((el) => el)[0];
}

function canCapture(boardString) {
  board = boardString.split('\n').map((row) => row.split(' '));
  let bIndex = getCoords(board, 'B');
  let wIndex = getCoords(board, 'W');

  return (bIndex[0] === wIndex[0]) || (bIndex[1] === wIndex[1]) ||
  Math.abs(bIndex[0] - wIndex[0]) === Math.abs(bIndex[1] - wIndex[1]);
}

// console.log(canCapture(
// `_ B _ _ _ _ _ _
// _ _ _ _ _ _ _ _
// _ _ _ _ _ _ _ _
// _ _ _ _ _ _ _ _
// _ _ _ _ _ _ _ _
// _ _ _ _ _ _ _ _
// _ _ _ _ _ _ _ _
// _ _ _ _ _ _ _ W`));

// x < y || x === undefined && y

function compareVersions(version1, version2) {
  let regex = /^\d+(\.\d+)*$/
  if (!regex.test(version1) || !regex.test(version2)) {
    return null;
  }

  let v1 = version1.split('.').map(Number);
  let v2 = version2.split('.').map(Number);
  let longest = Math.max(v1.length, v2.length);

  for (let i = 0; i < longest; i++) {
    if (v1[i] < v2[i] || (!v1[i]) && v2[i] ) return -1;
    if (v1[i] > v2[i] || v1[i] && (!v2[i])) return 1;
  }

  return 0;
}

// console.log(compareVersions('0.1.2.3', '0.1.2'));
// console.log(compareVersions('0.1.2', '0.1.2'));
// console.log(compareVersions('0.1.1', '0.1.2'));
// console.log(compareVersions('0.1', '0.1.2'));
// console.log(compareVersions('1.0', '0.1.2'));
// console.log(compareVersions('1.2.0', '1.2.0.0'));
console.log(compareVersions('1', '1'));            // 0
console.log(compareVersions('1.1', '1.0'));        // 1
console.log(compareVersions('2.3.4', '2.3.5'));    // -1
console.log(compareVersions('1.a', '1'));          // null
console.log(compareVersions('.1', '1'));           // null
console.log(compareVersions('1.', '2'));           // null
console.log(compareVersions('1..0', '2.0'));       // null
console.log(compareVersions('1.0', '1.0.0'));      // 0
console.log(compareVersions('1.0.0', '1.1'));      // -1
console.log(compareVersions('1.0', '1.0.5'));      // -1


/* 
- A version number consists of number segments, each separated by a single period. For example, the number `1.12.4` has three segments: 1, 12 and 4.
- To compare two version numbers, compare number segments individually from left to right. 
- In such a comparison, if the two numbers are not equal, then the version number with the higher segment is higher. For example. the number `1.13.3` is higher than `1.12.5`.
- If one version number is longer (i.e. has more segments) than the other, and they are otherwise equal, the longer version number is the higher one. For example, `1.2.1.3` is higher than `1.2.1`.
- Exception to that: a final number segment `0` is equivalent to no segment, e.g. `1.2.1.0` is equivalent to `1.2.1`.

- If the leftmost number is higher, return 1.
- If the rightmost number is higher, return -1.
- If the numbers are equivalent, return 0.
- If either of the numbers is invalid, return null.
  - A version number with characters other than numbers or periods is invalid. 
  - A version number that begins or ends with a period, or has more than one period in a row, is invalid.
*/

