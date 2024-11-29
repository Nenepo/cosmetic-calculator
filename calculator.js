

let ingredients = [];
let totalPercentage = 0;

const chemicalIngredients = [
  "Aqua",
  "Sodium cocoyl glutamate",
  "CocoBetaine",
  "CocoGlucoside",
  "Lauryl glucoside",
  "Sodium cocoamphoacetate",
  "Sodium Lauryl Glucose Carboxylate",
  "Glycerin",
  "Curcuma Longa Root Extract",
  "Chamomilla Recutita Flower Extract",
  "Punica Granatum Fruit Extract",
  "Sodium Benzoate",
  "Guar hydroxypropyltrimonium chloride",
  "Citric Acid",
  "Bisabolol"
];


const populateDropdown = (ingredients) => {
  const dropdown = document.getElementById('ingredient');

  ingredients.forEach((ingredient) => {
    const option = document.createElement('option');
    option.value = ingredient;
    option.text = ingredient;
    dropdown.appendChild(option);
  });

}

populateDropdown(chemicalIngredients);






function addIngredient(type) {

  let percentage, manualIngredient, selectedIngredient, calculatedGrams, calculatedVolume = 0
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
      calculatedVolume = (batchSize / percentage) * 100;

    }

    ingredients.push({
      name: manualIngredient || selectedIngredient,
      percentage,
      grams: calculatedGrams,
      volume: calculatedVolume  ? calculatedVolume.toFixed(2) : ""

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
      <th> (%)</th>
      <th> (grams)</th>
            <th> (vol)</th>

      <th>Actions</th>
    </tr>
  `;

  ingredients.forEach((data, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${data.name}</td>
      <td>${data.percentage ? data.percentage : ''}</td>
      <td>${data.grams ? data.grams : ''}</td>
      <td>${data.volume ? data.volume : ''}</td>

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
  const inputIds = ['ingredient', 'manualIngredient', 'dropdownPercentage', 'manualPercentage', 'grams', ];

  inputIds.forEach(id => {
    const input = document.getElementById(id);
    if (input) {
      input.value = '';
    }
  });


}

const resetCalculator = () => {
  clearInputs();

  document.getElementById('batchSize').value = '';
 document.getElementById("instructions").value = '';
  // Clear ingredients array
  ingredients = [];
  renderIngredients()
  // Reset total percentage display
  totalPercentage = 0;
  document.getElementById('totalPercentage').textContent = '0%';

  // Reset HLB-related ingredients and values
  oilPhaseIngredients = [];
  emulsifierIngredients = [];

  const hlbToggle = document.getElementById('hlbToggle');

  if (hlbToggle.checked ) {
    updateOilPhaseTable();
    updateEmulsifierTable();
    document.getElementById('requiredHLB').textContent = '0.00';
    document.getElementById('actualHLB').textContent = '0.00';
    document.getElementById('hlbCompatibility').textContent = '-';
    document.getElementById('hlbCompatibility').style.color = 'black';
  }
};


