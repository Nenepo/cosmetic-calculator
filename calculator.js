

let ingredients = [];
let totalPercentage = 0;

const chemicalIngredients = [
  { name: "Aqua", density: 1.0 }, // Water's density in g/mL
  { name: "Sodium cocoyl glutamate", density: 1.05 },
  { name: "CocoBetaine", density: 1.04 },
  { name: "CocoGlucoside", density: 1.1 },
  { name: "Lauryl glucoside", density: 1.12 },
  { name: "Sodium cocoamphoacetate", density: 1.04 },
  { name: "Sodium Lauryl Glucose Carboxylate", density: 1.15 },
  { name: "Glycerin", density: 1.26 },
  { name: "Curcuma Longa Root Extract", density: 1.02 }, // Estimated for turmeric extract
  { name: "Chamomilla Recutita Flower Extract", density: 1.0 }, // Estimated for herbal extracts
  { name: "Punica Granatum Fruit Extract", density: 1.05 }, // Pomegranate extract
  { name: "Sodium Benzoate", density: 1.44 },
  { name: "Guar hydroxypropyltrimonium chloride", density: 1.01 },
  { name: "Citric Acid", density: 1.66 }, // Density of citric acid anhydrous
  { name: "Bisabolol", density: 0.96 } // Bisabolol's density (lighter than water)
];


const populateDropdown = (ingredients) => {
  const dropdown = document.getElementById('ingredient');

  ingredients.forEach((ingredient) => {
    const option = document.createElement('option');
    option.value = ingredient.name;
    option.text = ingredient.name;
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
      calculatedVolume = calculatedGrams / ingredientData.density;

    }

    const ingredientData = chemicalIngredients.find(ing => ing.name === ( selectedIngredient));

    if (!batchSize && ingredientData.density) {
      calculatedVolume = percentage / ingredientData.density;
    }


    ingredients.push({
      name: manualIngredient || selectedIngredient,
      percentage,
      grams: calculatedGrams ? calculatedGrams.toFixed(2) : "",
      volume: calculatedVolume ? calculatedVolume.toFixed(2) : ""

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
  const inputIds = ['ingredient', 'manualIngredient', 'dropdownPercentage', 'manualPercentage'];

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

  if (hlbToggle.checked) {
    updateOilPhaseTable();
    updateEmulsifierTable();
    document.getElementById('requiredHLB').textContent = '0.00';
    document.getElementById('actualHLB').textContent = '0.00';
    document.getElementById('hlbCompatibility').textContent = '-';
    document.getElementById('hlbCompatibility').style.color = 'black';
  }
};


