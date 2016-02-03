import Table from 'cli-table';

import { cmhcPayment } from './mortgage';

const params = {
  grossIncome: 0,
  housePrice: 245000,
  mortgageRate: 0.0289,
  paymentsPerYear: 26,
  startAmort: 25,
  endAmort: 15,
  startDown: 0.05,
  endDown: 0.25
};

let downPayments = [];
for (let i = params.startDown; i <= params.endDown; i += 0.01) {
  downPayments.push(i);
}

let amortizations = [];
for (let i = params.startAmort; i >= params.endAmort; i -= 1) {
  amortizations.push(i);
}

const table = new Table({ head: ['', ...amortizations] });

for (let i = 0; i < downPayments.length; i++) {
  const { housePrice, paymentsPerYear, mortgageRate } = params;
  const downPaymentPercent = downPayments[i];
  const downPaymentAmount = housePrice * downPaymentPercent;
  const key = `${downPaymentAmount.toFixed(0)} (${(downPaymentPercent * 100).toFixed(1)} %)`;

  table.push({
    [key]: amortizations.map(amortization => {
      // calculate mortgage
      const mortgagePayment = cmhcPayment(housePrice, downPaymentPercent, mortgageRate, amortization, paymentsPerYear);
      return mortgagePayment.toFixed(2);
    })
  });
}

console.log(table.toString());
