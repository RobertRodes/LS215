function cycleArray(array, callback) {
  let nextIndex = 0;

  const cycleIterator = {
    next: function(...rest) {
      callback(array[nextIndex], ...rest);
      nextIndex = nextIndex === array.length - 1 ? 0 : nextIndex + 1;
    }
  }

  return cycleIterator;
}

const cycleCallback = (currentRail, cryptoIndex, railFence) => {
  railFence[currentRail].push(cryptoIndex);
}

function makeRailFence(stringSize, railCount) {
  let zigZagPattern = Array.from({length: railCount}, (_, index) => index);
  zigZagPattern = zigZagPattern.concat(zigZagPattern.slice(1, -1).reverse());

  const railFence = Array.from({ length: railCount }, () => [] );
  const cycler = cycleArray(zigZagPattern, cycleCallback);

  for (let index = 0; index < stringSize; index++) {
    cycler.next(index, railFence);
  }
  return railFence.flat();
}

function railCipherEncrypt(plainText, railCount) {
  const plainTextStripped = plainText.replace(/[^a-z]/ig, '').toUpperCase();
  const codeTemplate = makeRailFence(plainTextStripped.length, railCount);
  const cryptoText = Array(plainTextStripped.length);

  codeTemplate.forEach((idxValue) => {
    cryptoText.push(plainTextStripped[idxValue]);
  });

  return cryptoText.join('');
}

function railCipherDecrypt(cryptoText, railCount) {
  const codeTemplate = makeRailFence(cryptoText.length, railCount);
  const railKey = [];

  codeTemplate.forEach((idxValue, index) => {
    railKey.push([idxValue, cryptoText[index]]);
  })

  return railKey.sort((a, b) => a[0] - b[0]).map((arr) => arr[1]).join('');
}

console.log(railCipherEncrypt('We are discovered flee at once', 3));
// WECRLTEERDSOEEFEAOCAIVDEN
console.log(railCipherDecrypt('WECRLTEERDSOEEFEAOCAIVDEN', 3));
// WEAREDISCOVEREDFLEEATONCE

console.log(railCipherEncrypt('Urne daegwamlican hlaf syle us to-daeg.', 7));
console.log(railCipherDecrypt('UIURLCESNMALTEANYODWHSDAGLFAGEAE', 7));

