/*
Problem 

1. Given a string with a defined "shorthand," rewrite the string in full.
2. String is a set of numbers as strings, separated by the delimiters `,`, `:`, `..` or `-`.
   a. `-`, `:` and `..` all have the equivalent meaning of "range delimiter." I will use `-` 
      in the following to refer to a range delimiter, so a reference to `-` may be 
      understood to mean a reference to any one of these.
3. The output of the input string is a string of numbers, each separated by a comma and a 
   space. The numbers in the input string are each optionally modified in the output as 
   described in the following.
4. Each number must meet these criteria, as it relates to the number preceding it:
   a. It must be higher than the preceding number.
   b. It must end with the digits given.
   c. Therefore:
      1) With two numbers `a` and `b` separated by `,`: if `Number(a)` is lower than 
         `Number(b)`, leave `a` and `b` as they are.
      2) With two numbers `a` and `b` separated by `,`: if `Number(a)` is higher than 
         `Number(b)` change `Number(b)` to the lowest number higher than `Number(a)` that 
         ends in `b`'s digits, expressed as a string.'
      3) Note: `a` is not necessarily the original number in the input; it is the output 
         number as possibly modified by applying the above criteria as it relates to the 
         number that precedes it. The "output `a`," if you will.
   d. Example: `'4,5,3,21,25,2'` returns `'4, 5, 13, 21, 25, 32'`.
   e. Example: `'59, 03, 7, 5, 93, 001'` returns `'59, 103, 107, 115, 193, 1001'`.
   f. Example: `'9,8,8,8,7,7,6'` returns `'9, 18, 28, 38, 47, 57, 66'`.
5. With two numbers `a` and `b` separated by `-`: modify the two numbers to a string of 
   comma-separated digits consisting of all integers the lowest of which is `a`, and the 
   highest of which is `b` as modified in the previous paragraph (paragraph 5).
   a, Example: `'7,6-5,7'` returns `'7, 16, 17, 18, 19, 21, 22, 23, 24, 25, 27'` (i.e. 
      `17`, `16` through `25`, `27`). Likewise for `'7,6:5,7'` and `'7,6..5,7'`.
6. Assumptions (do not need to be verified): 
   a. Input string consists of:
      1) a series of digits.
      2) optionally followed by any number of the following:
         a) One and only one delimiter (p. 2), AND
         b) A series of digits.
7. Preconditions (must be verified): none.

Algorithm

1. Input: a string. Relevant characters are digits, commas, `:`, `..`, `-`.
2. Replace `:` and `..` with `-`.
3. Split string into an array ("shortNums"), where each element is a set of contiguous 
   digits or a delimiter.
4. Declare a result array ("result"); initialize it to the first element in shortNums.
5. Starting with the third element (index `2`), iterate shortNums by every other element 
   (i.e. iterate the digits, skipping over the delimiters). For each digit sequence 
   ("integer"), store to a variable "fullNumber" the return value of a function 
   ("getFullNumber") that implements these instructions:
   a. Take two arguments, "previousNumber" and "currentNumber", which are, respectively, the 
      integer in result's last element and the integer in the current iteration of the 
      shortNums array.
   b. Convert these two arguments to their numeric values ("numPrevious" and "numCurrent").
   c. Convert the shorthand value of currentNumber to the full value, using this algorithm:
      1) If numCurrent is greater than numPrevious, return currentNumber as is.
      2) Otherwise:
         a) Declare a variable "incrementor"; initialize it to 10 to the power of the length 
            of currentNumber.
         b) Add incrementor to numCurrent as many times as necessary to make current number 
            larger than previous number.
         c) Convert numCurrent to a string and return it.
6. If the previous element is not a '-' (i.e. is a ','): 
   a. Push fullNumber onto result.
7. Otherwise, call a function ("getNumberRange") that implements these instructions:
   a. Function takes two arguments, "previousNumber" and "fullNumber", where previousNumber is 
      the last element in result, and fullNumber is the value described in 5 and 6a.
   b. Declare two variables ("start" and "stop"), which are, respectively, previousNumber and 
      fullNumber converted to number type.
   c. Create an array of integers, where the first number is one more than start, and the last 
      number is fullNumber, all expressed as string values.
   d. return this array.
   e. Push the return value of getNumberRange onto result.
   h. Flatten result.
8. Join the result array into a string, delimited by ", ", and return it.
*/

function getFullNumber(previousNumber, currentNumber) {
  const numPrevious = Number(previousNumber);                                         // 5b
  let numCurrent = Number(currentNumber);                                             // 5b

  if (numPrevious > numCurrent) {                                                     // 5c2
    const incrementor = 10 ** currentNumber.length;                                   // 5c2a

    while (numPrevious > numCurrent) {
      numCurrent += incrementor;                                                      // 5c2b
    }

    return String(numCurrent);                                                        // 5c2c
  }
  return currentNumber;                                                               // 5c1
}

function getNumberRange(previousNumber, fullNumber) {                                 // 7a
  const [start, stop] = [Number(previousNumber), Number(fullNumber)];                 // 7b
  return Array.from({ length: stop - start }, (_, idx) => String(start + idx + 1));   // 7c, 7d
}

function convertShorthandNumbers(shortNumString) {                                    // 1
  const shortNums = shortNumString.replace(/\.\.|:/g, '-').match(/\d+|[,-]/g);        // 2, 3

  let result = [shortNums[0]];                                                        // 4

  for (let idx = 2; idx < shortNums.length; idx += 2) {                               // 5
    const previousNumber = result[result.length - 1];
    const fullNumber = getFullNumber(previousNumber, shortNums[idx]);                 // 5a

    if (shortNums[idx - 1] === '-') {
      result.push(getNumberRange(previousNumber, fullNumber));                        // 7, 7e
      result = result.flat();                                                         // 7h
    } else {                                                                          // 6
      result.push(fullNumber);                                                        // 6a
    }
  }

  return result.join(', ');                                                           // 8
}

console.log(convertShorthandNumbers('103, 1'));
console.log(convertShorthandNumbers('545, 64..1'));
