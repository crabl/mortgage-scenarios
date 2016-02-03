'use strict';

function effectiveRate(rate, compound_periods, payment_schedule) {
  return Math.pow(1 + (rate / compound_periods), compound_periods / payment_schedule) - 1;
}

export function payment(amount, annual_rate, number_of_payments, payment_schedule) {
    var PV = amount;
    var r = effectiveRate(annual_rate, 2, payment_schedule); // Canadian mortgages are compounded semi-annually
    var n = number_of_payments;

  if (r === 0) {
    return PV / n;
  }

  // This is the formula to obtain payments for an annuity due based on the "present value" of the vehicle
  // which is actually the future value of the principal at the simple daily interest rate over the number
  // of days until the first payment of the annuity due occurs.
  //
  // In this instance, the variable 'n' represents the number of distinct monthly payments:
  //
  //  0    1    2             47   48
  //  |____|____|____ ... ____|____|
  //  P    PV                      FV
  //
  // More info: http://www.financeformulas.net/Annuity-Due-Payment-from-Present-Value.html

    return PV * (r / (1 - Math.pow(1 + r, -n)));
}

// Source: http://www.cmhc-schl.gc.ca/en/co/moloin/moloin_005.cfm (as of Dec. 28, 2015)
export function cmhc(down_payment_percent) {
  // if (down_payment_percent > 0.35) {
  if (down_payment_percent >= 0.20) {
    return 0;
  // } else if (down_payment_percent >= 0.35) {
  //   return 0.60 / 100
  // } else if(down_payment_percent >= 0.25) {
  //   return 0.75 / 100
  // } else if(down_payment_percent >= 0.20) {
  // return 1.25 / 100
  } else if(down_payment_percent >= 0.15) {
    return 1.80 / 100
  } else if(down_payment_percent >= 0.10) {
    return 2.40 / 100
  } else if(down_payment_percent >= 0.05) {
    return 3.60 / 100
  } else {
    return 3.85 / 100;
  }
}

export function gdsr(gross_income, monthly_expenses, payment, schedule) {
  return (monthly_expenses + (payment * schedule / 12 )) / (gross_income / 12);
}

export function cmhcPayment(housePrice, downPaymentPercent, mortgageRate, amortization, paymentsPerYear) {
  const downPaymentAmount = housePrice * downPaymentPercent;
  const cmhcAmount = cmhc(downPaymentPercent);
  const mortgagedAmount = housePrice + cmhcAmount - downPaymentAmount;
  const numberOfPayments = amortization * paymentsPerYear;
  const mortgagePayment = payment(mortgagedAmount, mortgageRate, numberOfPayments, paymentsPerYear);
  return mortgagePayment;
}
