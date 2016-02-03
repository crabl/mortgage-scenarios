'use strict';

// Source: http://www.lethbridge.ca/living-here/My-Taxes/Pages/Calculators/Residential.aspx (Updated May 2015)

export function municipal(propertyValue) {
  let propertyTax = Math.round(propertyValue * 100.00 * 0.007614) / 100.00;
  let educationTax = Math.round(propertyValue * 100.00 * 0.002413) / 100.00;
  let greenAcresTax = Math.round(propertyValue * 100.00 * 0.000126) / 100.00;
  let totalTax = Math.round((propertyTax+educationTax+greenAcresTax) * 100.00) / 100.00;

  return totalTax;
}

export function federal_income_tax(gross_income) {
  
}

export function alberta_income_tax(gross_income) {

}

export function income(gross_income) {
  return federal_income_tax(gross_income) + alberta_income_tax(gross_income);
}
