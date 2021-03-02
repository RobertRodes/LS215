var isPalindrome = function(x) {
  return String(x) === String(x).split("").reverse().join("");
};

console.log(
  isPalindrome(0203),//true
  isPalindrome(-121),//false
)

159