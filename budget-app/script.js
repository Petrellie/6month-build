function calculate() {

  const income = Number(document.getElementById("income").value);
  const rent = Number(document.getElementById("rent").value);
  const food = Number(document.getElementById("food").value);
  const transport = Number(document.getElementById("transport").value);
  const other = Number(document.getElementById("other").value);

  const totalExpenses = rent + food + transport + other;
  const savings = income - totalExpenses;
  const savingsPercentage = (savings / income) * 100; 

}