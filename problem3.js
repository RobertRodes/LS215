/*
Problem
1. Given a string of "blocks," where:
   a. Each block is separated by (three) spaces.
   b. Each block consists of two letters separated by a colon (':').
2. For a string input (a "word"), determine whether the word meets the block rules.
3. Block rules:
   a. Each word character must appear in a block.
   b. No block may be used more than once.
4. Preconditions:
   a. Input is upper case.
      1) If input is not upper case, force it to upper case.
5. Assumptions:
   a. Input has no spaces, no non-alpha characters.

Algorithm
1. Split given string into an array of blocks, splitting by (any number of contiguous) spaces. 
2. Transform (i.e. map) each block into a subarray with two letters each (split each element by colon).
2. Iterate characters in word input with `for` loop.
3. For each character, convert to upper case, then use `findIndex` and `includes` to find the character in the block set.
4. If not found (`findIndex` returns `-1`), return false. If found, use `splice` to remove the block at the found index from the block set.
5. After iterating the characters, if we haven't returned false yet, return true.
*/

function isBlockWord(word) {
  let blocks = 'B:O   X:K D:Q C:P N:A G:T R:E F:S J:W H:U V:I L:Y Z:M';
  blocks = blocks.split(/\s+/).map((block) => block.split(':'));
  word = word.toUpperCase();

  for (let index = 0; index < word.length; index++) {
    let blockIndex = blocks.findIndex((block) => block.includes(word[index]));
    if (blockIndex === -1) return false;

    blocks.splice(blockIndex, 1);
  }

  return true;
}

console.log(isBlockWord('BATCH'));      // true
console.log(isBlockWord('jest'));       // true
console.log(isBlockWord('BOTCH'));      // false
console.log(isBlockWord('ADAM'));       // false
console.log(isBlockWord('MAZE'));       // false
