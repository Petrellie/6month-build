function getInputValue(id) {
  return Number(document.getElementById(id).value) || 0;
}

function calculateSavings(income, expenses) {
  return income - expenses;
}

function calculatePercentage(savings, income) {
  if (income <= 0) return 0;
  return (savings / income) * 100;
}

function getAdvice(savings, percentage) {
  if (savings < 0) return "You are overspending.";
  if (percentage >= 20) return "Healthy saving.";
  return "Moderate saving.";
}

function renderResult(totalExpenses, savings, percentage, message) {
  document.getElementById("result").innerHTML = `
    <strong>Total Expenses:</strong> $${totalExpenses}<br>
    <strong>Savings:</strong> $${savings}<br>
    <strong>Savings %:</strong> ${percentage.toFixed(2)}%<br>
    <strong>Advice:</strong> ${message}
  `;
}

function calculate() {
  const income = getInputValue("income");
  const rent = getInputValue("rent");
  const food = getInputValue("food");
  const transport = getInputValue("transport");
  const other = getInputValue("other");

  const totalExpenses = rent + food + transport + other;
  const savings = calculateSavings(income, totalExpenses);
  const percentage = calculatePercentage(savings, income);
  const message = getAdvice(savings, percentage);

  renderResult(totalExpenses, savings, percentage, message);
}