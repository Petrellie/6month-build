
let state = {
  income: 0,
  rent: 0,
  food: 0,
  transport: 0,
  other: 0,
  totalExpenses: 0,
  savings: 0,
  percentage: 0,
  advice: ""
};

function updateState() {
  state.income = getInputValue("income");
  state.rent = getInputValue("rent");
  state.food = getInputValue("food");
  state.transport = getInputValue("transport");
  state.other = getInputValue("other");

  state.totalExpenses =
    state.rent + state.food + state.transport + state.other;

  state.savings = calculateSavings(
    state.income,
    state.totalExpenses
  );

  state.percentage = calculatePercentage(
    state.savings,
    state.income
  );

  state.advice = getAdvice(
    state.savings,
    state.percentage
  );
}

function renderResult() {
  document.getElementById("result").innerHTML = `
    <strong>Total Expenses:</strong> $${state.totalExpenses}<br>
    <strong>Savings:</strong> $${state.savings}<br>
    <strong>Savings %:</strong> ${state.percentage.toFixed(2)}%<br>
    <strong>Advice:</strong> ${state.advice}
  `;
}

function handleInput() {
  updateState();
  renderResult();
}

["income", "rent", "food", "transport", "other"].forEach(id => {
  document
    .getElementById(id)
    .addEventListener("input", handleInput);
});

// document
//   .getElementById("calculateBtn")
//   .addEventListener("click", calculate);

function validateInputs(income, rent, food, transport, other) {
  if (income <= 0) {
    return "Income must be greater than 0.";
  }

  if (rent < 0 || food < 0 || transport < 0 || other < 0) {
    return "Expenses cannot be negative.";
  }

  return null;
}

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

  const errorMessage = validateInputs(income, rent, food, transport, other);

  if (errorMessage) {
    document.getElementById("error").innerText = errorMessage;
    document.getElementById("result").innerHTML = "";
    return;
  }

  document.getElementById("error").innerText = "";

  const totalExpenses = rent + food + transport + other;
  const savings = calculateSavings(income, totalExpenses);
  const percentage = calculatePercentage(savings, income);
  const message = getAdvice(savings, percentage);

  renderResult(totalExpenses, savings, percentage, message);
}