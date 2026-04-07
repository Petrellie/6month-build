let state = {
  inputs: {
    income: 0,
    rent: 0,
    food: 0,
    transport: 0,
    other: 0
  },
  derived: {
    totalExpenses: 0,
    savings: 0,
    percentage: 0,
    advice: ""
  }
};

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

// function renderResult(totalExpenses, savings, percentage, message) {
//   document.getElementById("result").innerHTML = `
//     <strong>Total Expenses:</strong> $${totalExpenses}<br>
//     <strong>Savings:</strong> $${savings}<br>
//     <strong>Savings %:</strong> ${percentage.toFixed(2)}%<br>
//     <strong>Advice:</strong> ${message}
//   `;
// }

// function calculate() {
//   const income = getInputValue("income");
//   const rent = getInputValue("rent");
//   const food = getInputValue("food");
//   const transport = getInputValue("transport");
//   const other = getInputValue("other");

//   const errorMessage = validateInputs(income, rent, food, transport, other);

//   if (errorMessage) {
//     document.getElementById("error").innerText = errorMessage;
//     document.getElementById("result").innerHTML = "";
//     return;
//   }

//   document.getElementById("error").innerText = "";

//   const totalExpenses = rent + food + transport + other;
//   const savings = calculateSavings(income, totalExpenses);
//   const percentage = calculatePercentage(savings, income);
//   const message = getAdvice(savings, percentage);

//   renderResult(totalExpenses, savings, percentage, message);
// }

function updateState() {
  state.inputs.income = getInputValue("income");
  state.inputs.rent = getInputValue("rent");
  state.inputs.food = getInputValue("food");
  state.inputs.transport = getInputValue("transport");
  state.inputs.other = getInputValue("other");

  const totalExpenses =
    state.inputs.rent +
    state.inputs.food +
    state.inputs.transport +
    state.inputs.other;

  const savings = calculateSavings(
    state.inputs.income,
    totalExpenses
  );

  const percentage = calculatePercentage(
    savings,
    state.inputs.income
  );
  
  const advice = getAdvice(savings, percentage);

  state.derived.totalExpenses = totalExpenses;
  state.derived.savings = savings;
  state.derived.percentage = percentage;
  state.derived.advice = advice;
}

function renderResult() {
  const d = state.derived;

  document.getElementById("result").innerHTML = `
    <strong>Total Expenses:</strong> $${d.totalExpenses}<br>
    <strong>Savings:</strong> $${d.savings}<br>
    <strong>Savings %:</strong> ${d.percentage.toFixed(2)}%<br>
    <strong>Advice:</strong> ${d.advice}
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