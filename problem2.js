/*
1. Strip out all non-numeric characters.
2. Split remaning characters individually into an array.
3. Reverse the array.
4. Transform the digits from String type to Number type.
5. Use `reduce` to iterate through the array of digits.
6. For each iteration:
   a. If the element's index is even, add it to the accumulator.
   b. If odd:
      1) Double it. 
      2) If the result is greater than 10, subtract 9. 
      3) Add the result to the accumulator.
7. If the result of the `reduce` operation is divisble by 10, return true. If not, return false.
*/

function isValidLuhnFormulaNumber(strNumber) {
  if (!strNumber) return false;

  let numbers = strNumber.replace(/\D/g, '').split('').reverse().map(Number);

  let checkSum = numbers.reduce((acc, num, index) => {
    if (index % 2 === 0) return acc + num;

    num *= 2;
    return acc + (num >= 10 ? num - 9 : num);
  }, 0);

  return checkSum % 10 === 0;
}

console.log(validateCheckSum('2323 2005 7766 3554'));
console.log(isValidLuhnFormulaNumber("2323 2005 7766 3554") === true);  // ignore non-digit characters like spaces
console.log(isValidLuhnFormulaNumber('1111') === false)
console.log(isValidLuhnFormulaNumber('8763 ') === true); // handles subtracting 9 from digits doubled > 9
console.log(isValidLuhnFormulaNumber('8763') === true);
console.log(isValidLuhnFormulaNumber('.--8-7;6-3.. ')) //=== true);
console.log(isValidLuhnFormulaNumber('') === false); // input empty string
console.log(isValidLuhnFormulaNumber() === false); // no input string
console.log(isValidLuhnFormulaNumber('5') === false)  // input string is of size 1; no numbers get doubled checksum is 5; false
console.log(isValidLuhnFormulaNumber('0') === true)  // input string is of size 1; input number is a zero; checksum is 0
console.log(isValidLuhnFormulaNumber('00') === true)  // input string is of size 1; input number is a zero; checksum is 0
console.log(isValidLuhnFormulaNumber('000') === true)  // input string is of size 1; input number is a zero; checksum is 0
console.log(isValidLuhnFormulaNumber("-2-3-2-3-2-0-0-5 -7-7-6-6-3-5-5-4") === true)  // ignore negative signs; just grab digits
console.log(isValidLuhnFormulaNumber("-0.1110") === false)  // ignore negative signs, and decimal points when looking at number order; calculate front/ end  0's in number order
console.log(isValidLuhnFormulaNumber('3554') === false); // 6+5+1+4 ; sums to 15; not a checksum
console.log(isValidLuhnFormulaNumber('1115') === true) 
console.log(isValidLuhnFormulaNumber('00208') === true)
