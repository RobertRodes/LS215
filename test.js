const isPrime = num => {
  for(let i = 2, sqRoot = Math.sqrt(num); i <= sqRoot; i++) {
    if(num % i === 0) return false; 
  }
  return num > 1;
}

console.log([7, 5, 2, 4, 6].map(isPrime));


let invoices = { 
  unpaid: [],
  paid: [],
  unknown: [],
}

invoices.add = function(name, amount) {
  this.unpaid.push({
    name, 
    amount,
  });
}

invoices.totalDue = function() {
  return this.unpaid.reduce((sum, obj) => sum + obj.amount, 0);
}

invoices.totalPaid = function() {
  return this.paid.reduce((sum, obj) => sum + obj.amount, 0);
}

invoices.getIndex = function(arr, name) {
  return arr.findIndex(inv => inv.name === name);
}

invoices.payInvoice = function(name) {
  const invIndex = this.getIndex(this.unpaid, name); 
  if (invIndex === -1) {
    this.unknown.push({name, amount: undefined});
    return;
  }
  this.paid.push(this.unpaid[invIndex]);
  this.unpaid.splice(invIndex, 1);
}

invoices.add('Due North Development', 250);
invoices.add('Moonbeam Interactive', 187.50);
invoices.add('Slough Digital', 300);


invoices.add('Bob', 100000);
invoices.add('John', 10000);
invoices.add('Dave', 5000);

invoices.payInvoice('Bob');
invoices.payInvoice('John');
invoices.payInvoice('Pete');
console.log(invoices);
console.log(invoices.totalPaid());