const state = {
  inputs: {
    income: 0,
    rent: 0,
    food: 0,
    transport: 0,
    other: 0,
  },
  ui: {
    validationErrors: {},
    loading: false,
    error: null,
  },
};

document.getElementById("submitBtn").addEventListener("click", handleSubmit);

function getInputValue(id) {
  const value = parseFloat(document.getElementById(id).value);
  return isNaN(value) ? 0 : value;
}

//impure; store
function syncInputsFromDOM() {
  state.inputs.income = getInputValue("income"); // income cannot be negative
  state.inputs.rent = getInputValue("rent");
  state.inputs.food = getInputValue("food");
  state.inputs.transport = getInputValue("transport");
  state.inputs.other = getInputValue("other");
}

// pure; evaluates
function validateInputs(inputs) {
  const errors = {};

  if (inputs.income < 0) {
    errors.income = "Income cannot be negative.";
  } else if (inputs.income === 0) {
    errors.income = "Income cannot be zero.";
  }

  Object.entries(inputs).forEach(([key, value]) => {
    if (value < 0 && key !== "income") {
      errors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} cannot be negative.`;
    }
  });

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

//pure; logic; transform
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

//impure; display
function render() {
  const resultEl = document.getElementById("result");
  const errorEl = document.getElementById("errors");
  const loadingEl = document.getElementById("loading");

  const derived = computeDerived(state.inputs);

  // Loading state
  if (state.ui.loading) {
    loadingEl.textContent = "Saving...";
  } else {
    loadingEl.textContent = "";
  }

  // Validation errors
  if (Object.keys(state.ui.validationErrors).length > 0) {
    errorEl.innerHTML = Object.entries(state.ui.validationErrors)
      .map(([field, msg]) => `<div style="color:red;"><strong>${field}:</strong> ${msg}</div>`)
      .join("");
    resultEl.innerHTML = "";
    return;
  } else {
    errorEl.innerHTML = "";
  }

  // Async error
  if (state.ui.error) {
    errorEl.innerHTML = `<div style="color:red;">${state.ui.error}</div>`;
  }

  // Render results
  resultEl.innerHTML = `
    <strong>Total Expenses:</strong> $${derived.totalExpenses.toFixed(2)}<br>
    <strong>Savings:</strong> $${derived.savings.toFixed(2)}<br>
    <strong>Savings %:</strong> ${derived.percentage.toFixed(2)}%<br>
    <strong>Advice:</strong> ${derived.advice}
  `;
}

function handleInput() {
   syncInputsFromDOM();
   render();
}

//Controller / Orchestrator
async function handleSubmit() {
  syncInputsFromDOM();

  const validation = validateInputs(state.inputs);
  state.ui.validationErrors = validation.errors;

  if (!validation.valid) {
    render();
    return;
  }

  state.ui.loading = true;
  state.ui.error = null;
  render();

  try {
    await fakeSaveBudget(state.inputs);
  } catch (err) {
    state.ui.error = err.message;
  } finally {
    state.ui.loading = false;
    render();
  }
}

document.querySelectorAll("input").forEach((input) => {
  input.addEventListener("input", handleInput);
});

function fakeSaveBudget(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate random failure (20% chance)
      if (Math.random() < 0.2) {
        reject(new Error("Failed to save budget. Please try again."));
      } else {
        resolve({ status: "success" });
      }
    }, 1000);
  });
}