/*
Use String.prototype.replace to remove all non-digit characters.
Use RegExp.prototype.test to test whether the remaining digits meet the specification criteria.
If test returns false, return 0000000000.
Otherwise, use String.prototype.slice to return the last 10 characters of the string.// function SMSPhone(phone) {
*/

function SMSPhone(phone) {
  phone = phone.replace(/[\D]/g, '');
  if (!/^1?(\d){10}/.test(phone)) return '0000000000';
  return phone.slice(-10);
}

console.log(SMSPhone('1+(938) 234-7121'));
console.log(SMSPhone('0038) 234-7121'));
console.log(SMSPhone('938)xx 234-7121938234'));
console.log(SMSPhone('38) 234-7121'));