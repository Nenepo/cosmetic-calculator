let ingredients = [];
let totalPercentage = 0;



// fetch ingredients from an api
// ph calculator
// figure out the hlb system
// make it mobile responsive

function addIngredient(type) {

  let percentage, manualIngredient, selectedIngredient, calculatedGrams = 0
  const batchSize = parseFloat(document.getElementById('batchSize').value);


  if (type === 'dropdown') {
    percentage = parseFloat(document.getElementById('dropdownPercentage').value);
    selectedIngredient = document.getElementById('ingredient').value;

  } else if (type === 'manual') {
    percentage = parseFloat(document.getElementById('manualPercentage').value);
    manualIngredient = document.getElementById('manualIngredient').value;
  }

  if (
    ((manualIngredient || selectedIngredient) !== '') && !isNaN(percentage)) {
    // Calculate grams only if `batchSize` is a valid number
    if (batchSize) {
      calculatedGrams = (percentage / 100) * batchSize;
    }
    ingredients.push({
      name: manualIngredient || selectedIngredient,
      percentage,
      grams: calculatedGrams
    });
    renderIngredients();
    calculateTotal();
    clearInputs();
  } else {
    alert((manualIngredient || selectedIngredient) && isNaN(percentage) ? 'Please enter a valid percentage for your ingredient' : 'Please enter a valid ingredient and percentage.');

  }
}

// Render the ingredients in the table
function renderIngredients() {
  const table = document.getElementById('ingredientTable');
  table.innerHTML = `
    <tr>
      <th>Ingredient</th>
      <th>Percentage (%)</th>
      <th>Weight (grams)</th>
      <th>Actions</th>
    </tr>
  `;

  ingredients.forEach((data, index) => {
    const row = document.createElement('tr');
    console.log(data.grams)
    row.innerHTML = `
      <td>${data.name}</td>
      <td>${data.percentage ? data.percentage : ''}</td>
      <td>${data.grams ? data.grams : ''}</td>
      <td><button onclick="deleteIngredient(${index})">Delete</button></td>
    `;
    table.appendChild(row);
  });
}

// Delete ingredient from the list
function deleteIngredient(index) {
  ingredients.splice(index, 1);
  renderIngredients();
  calculateTotal();
}

// Calculate total percentage of all ingredients
function calculateTotal() {
  totalPercentage = ingredients.reduce((acc, curr) => acc + (curr.percentage || 0), 0);
  document.getElementById('totalPercentage').textContent = `${totalPercentage}%`;
}


function clearInputs() {
  const inputIds = ['ingredient', 'manualIngredient', 'dropdownPercentage', 'manualPercentage', 'grams'];

  inputIds.forEach(id => {
    const input = document.getElementById(id);
    if (input) {
      input.value = '';
    }
  });


}

const resetCalculator = () => {
  clearInputs();

  document.getElementById('batchSize').textContent = '';

  // Clear ingredients array
  ingredients = [];

  // Re-render the empty ingredient table
  renderIngredients();

  // Reset total percentage display
  totalPercentage = 0;
  document.getElementById('totalPercentage').textContent = '0%';
}