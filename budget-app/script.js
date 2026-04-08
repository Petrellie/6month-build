const state = {
  inputs: {
    income: 0,
    rent: 0,
    food: 0,
    transport: 0,
    other: 0,
  },
  derived: {
    totalExpenses: 0,
    savings: 0,
    percentage: 0,
    advice: "",
  },
  ui: {
    loading: false,
    error: null,
    validationErrors: {},
  },
};

function getInputValue(id) {
  const value = parseFloat(document.getElementById(id).value);
  return isNaN(value) ? 0 : value;
}

function syncInputsFromDOM() {
  state.inputs.income = Math.max(0, getInputValue("income")); // income cannot be negative
  state.inputs.rent = getInputValue("rent");
  state.inputs.food = getInputValue("food");
  state.inputs.transport = getInputValue("transport");
  state.inputs.other = getInputValue("other");
}

// pure
function validateInputs(inputs) {
  const errors = {};

  if (inputs.income === 0) {
    errors.income = "Income cannot be zero.";
  }

  Object.entries(inputs).forEach(([key, value]) => {
    if (value < 0) {
      errors[key] = "Value cannot be negative.";
    }
  });

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

//pure; logic
function computeDerived(inputs) {
  const totalExpenses =
    inputs.rent + inputs.food + inputs.transport + inputs.other;

  const savings = inputs.income - totalExpenses;
  const percentage =
    inputs.income === 0 ? 0 : (savings / inputs.income) * 100;

  let advice = "Good job!";
  if (savings < 0) advice = "You are overspending!";
  else if (percentage < 20) advice = "Try to save more.";

  return {
    totalExpenses,
    savings,
    percentage,
    advice,
  };
}

function render() {
  const resultEl = document.getElementById("result");
  const errorEl = document.getElementById("errors");

  // Render validation errors
  if (Object.keys(state.ui.validationErrors).length > 0) {
    errorEl.innerHTML = Object.values(state.ui.validationErrors)
      .map((err) => `<div style="color:red;">${err}</div>`)
      .join("");
    resultEl.innerHTML = "";
    return;
  } else {
    errorEl.innerHTML = "";
  }

  const d = state.derived;

  resultEl.innerHTML = `
    <strong>Total Expenses:</strong> $${d.totalExpenses.toFixed(2)}<br>
    <strong>Savings:</strong> $${d.savings.toFixed(2)}<br>
    <strong>Savings %:</strong> ${d.percentage.toFixed(2)}%<br>
    <strong>Advice:</strong> ${d.advice}
  `;
}

//Controller / Orchestrator
function handleInput() {
  syncInputsFromDOM();

  const validation = validateInputs(state.inputs);
  state.ui.validationErrors = validation.errors;

  if (!validation.valid) {
    render();
    return;
  }

  state.derived = computeDerived(state.inputs);
  render();
}

document.querySelectorAll("input").forEach((input) => {
  input.addEventListener("input", handleInput);
});