var balance;

balance = function (procedure,payments) {
  var total_procedure = 0;
  procedure.forEach(function(data) {
    total_procedure = total_procedure + data.price;
  });

  var total_payments = 0;
  payments.forEach(function(data) {
    total_payments = total_payments + data.amount;
  });
  var balance = total_procedure - total_payments;

  return balance.toLocaleString("en-US");
};

module.exports = balance;
