function calculate() {

  const income = Number(document.getElementById("income").value);
  const rent = Number(document.getElementById("rent").value);
  const food = Number(document.getElementById("food").value);
  const transport = Number(document.getElementById("transport").value);
  const other = Number(document.getElementById("other").value);

  const totalExpenses = rent + food + transport + other;
  const savings = income - totalExpenses;
  const savingsPercentage = (savings / income) * 100;
  
  let message = "";

  if (savings < 0) {
    message = "You are overspending.";
  } else if (savingsPercentage >= 20) {
    message = "Healthy saving.";
  } else {
    message = "Moderate saving.";
  }

  document.getElementById("result").innerText =
    "Total Expenses: $" + totalExpenses +
    "\nSavings: $" + savings +
    "\nSavings %: " + savingsPercentage.toFixed(2) + "%" +
    "\nAdvice: " + message;

}