const hlbValues = {
  'mineral oil': 10,
  'paraffin oil': 10,
  'castor oil': 14,
  'olive oil': 7,
  'coconut oil': 8,
  'shea butter': 6,
  'cocoa butter': 6,
  'isopropyl myristate': 11.5,
  'cetyl alcohol': 15.5,
  'polysorbate 20': 16.7,
  'polysorbate 60': 14.9,
  'polysorbate 80': 15,
  'span 20': 8.6,
  'span 60': 4.7,
  'span 80': 4.3,
  'glyceryl monostearate': 3.8,
  'ceteareth-20': 15.2,
  'steareth-20': 15.3,
  'cetearyl alcohol': 15.5,
};

// HTML structure when HLB toggle is checked
function createHLBSection() {
  return `
    <div id="hlbCalculator" class="hlb-section">
      <h3>HLB Calculator</h3>
      
      <div class="oil-phase">
        <h4>Oil Phase Ingredients</h4>
        <div class="dropdown-ingredient">
          <select id="oilIngredient">
            <option value="">Select oil/butter/ester</option>
            ${Object.keys(hlbValues)
          .filter(ing => hlbValues[ing] < 12)
           .map(ing => `<option value="${ing}">${ing}</option>`)
            .join('')}
          </select>
          <input type="number" id="oilPercentage" placeholder="%" min="0" max="100" step="0.1">
          <button onclick="addHLBIngredient('oil')">Add</button>
        </div>
        <table id="oilPhaseTable">
          <tr>
            <th>Ingredient</th>
            <th>(%)</th>
            <th>HLB Value</th>
            <th>Req HLB</th>
            <th>Action</th>
          </tr>
        </table>
      </div>

      <div class="emulsifier-phase">
        <h4>Emulsifiers</h4>
        <div class="dropdown-ingredient">
          <select id="emulsifierIngredient">
            <option value="">Select emulsifier</option>
            ${Object.keys(hlbValues)
      .filter(ing => hlbValues[ing] >= 12)
      .map(ing => `<option value="${ing}">${ing}</option>`)
      .join('')}
          </select>
          <input type="number" id="emulsifierPercentage" placeholder="%" min="0" max="100" step="0.1">
          <button onclick="addHLBIngredient('emulsifier')">Add</button>
        </div>
        <table id="emulsifierTable">
          <tr>
            <th>Ingredient</th>
            <th>(%)</th>
            <th>HLB Value</th>
            <th>Action</th>
          </tr>
        </table>
      </div>

      <div id="hlbResults">
        <h4>HLB Analysis</h4>
        <p>Required HLB: <span id="requiredHLB">0</span></p>
        <p>Actual HLB: <span id="actualHLB">0</span></p>
        <p>Compatibility: <span id="hlbCompatibility" >-</span></p>
      </div>
    </div>
  `;
}

// Add variables to store HLB ingredients
let oilPhaseIngredients = [];
let emulsifierIngredients = [];

// Toggle the display of HLB calculator
const hlbToggle = document.getElementById('hlbToggle');
const hlbSectionDiv = document.getElementById('hlb-section');

hlbToggle.addEventListener('change', function () {
  if (hlbToggle.checked) {
    hlbSectionDiv.innerHTML = createHLBSection();
  } else {
    hlbSectionDiv.innerHTML = ''; // Clear the section
    oilPhaseIngredients = [];
    emulsifierIngredients = [];
  }
});

function addHLBIngredient(type) {
  const ingredient = type === 'oil'
    ? document.getElementById('oilIngredient').value
    : document.getElementById('emulsifierIngredient').value;

  const percentage = parseFloat(type === 'oil'
    ? document.getElementById('oilPercentage').value
    : document.getElementById('emulsifierPercentage').value);

  if (!ingredient || isNaN(percentage) || percentage <= 0 || percentage > 100) {
    alert('Please select an ingredient and enter a valid percentage between 0 and 100');
    return;
  }

  const hlbValue = hlbValues[ingredient];

  if (type === 'oil') {
    oilPhaseIngredients.push({ name: ingredient, percentage, hlbValue });
    updateOilPhaseTable();
  } else {
    emulsifierIngredients.push({ name: ingredient, percentage, hlbValue });
    updateEmulsifierTable();
  }

  calculateHLBCompatibility();

  // Clear inputs
  if (type === 'oil') {
    document.getElementById('oilIngredient').value = '';
    document.getElementById('oilPercentage').value = '';
  } else {
    document.getElementById('emulsifierIngredient').value = '';
    document.getElementById('emulsifierPercentage').value = '';
  }
}

function updateOilPhaseTable() {
  const table = document.getElementById('oilPhaseTable');
  table.innerHTML = `
    <tr>
      <th>Ingredient</th>
      <th>(%)</th>
      <th>HLB Value</th>
      <th>Req HLB</th>
      <th>Action</th>
    </tr>
  `;

  oilPhaseIngredients.forEach((ing, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${ing.name}</td>
      <td>${ing.percentage}</td>
      <td>${ing.hlbValue}</td>
      <td>${(ing.percentage * ing.hlbValue / 100).toFixed(2)}</td>
      <td><button onclick="deleteHLBIngredient('oil', ${index})">Delete</button></td>
    `;
    table.appendChild(row);
  });
}

function updateEmulsifierTable() {
  const table = document.getElementById('emulsifierTable');
  table.innerHTML = `
    <tr>
      <th>Ingredient</th>
      <th>(%)</th>
      <th>HLB Value</th>
      <th>Action</th>
    </tr>
  `;

  emulsifierIngredients.forEach((ing, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${ing.name}</td>
      <td>${ing.percentage}</td>
      <td>${ing.hlbValue}</td>
      <td><button onclick="deleteHLBIngredient('emulsifier', ${index})">Delete</button></td>
    `;
    table.appendChild(row);
  });
}

function deleteHLBIngredient(type, index) {
  if (type === 'oil') {
    oilPhaseIngredients.splice(index, 1);
    updateOilPhaseTable();
  } else {
    emulsifierIngredients.splice(index, 1);
    updateEmulsifierTable();
  }
  calculateHLBCompatibility();
}

function calculateHLBCompatibility() {
  // Calculate required HLB (weighted average of oil phase)
  let totalOilPercentage = oilPhaseIngredients.reduce((sum, ing) => sum + ing.percentage, 0);
  let requiredHLB = oilPhaseIngredients.reduce((sum, ing) =>
    sum + (ing.percentage * ing.hlbValue / totalOilPercentage), 0);

  // Calculate actual HLB from emulsifiers
  let totalEmulsifierPercentage = emulsifierIngredients.reduce((sum, ing) => sum + ing.percentage, 0);
  let actualHLB = emulsifierIngredients.reduce((sum, ing) =>
    sum + (ing.percentage * ing.hlbValue / totalEmulsifierPercentage), 0);

  // Update display
  document.getElementById('requiredHLB').textContent = requiredHLB.toFixed(2);
  document.getElementById('actualHLB').textContent = actualHLB.toFixed(2);

  // Check compatibility
  const hlbDifference = Math.abs(requiredHLB - actualHLB);
  const compatibilitySpan = document.getElementById('hlbCompatibility');

  if (hlbDifference <= 2) {
    compatibilitySpan.textContent = 'Compatible - Good emulsion stability expected';
    compatibilitySpan.style.color = '#32CD32';
  } else if (hlbDifference <= 4) {
    compatibilitySpan.textContent = 'Moderately Compatible - May require additional stabilization';
    compatibilitySpan.style.color = '#FF4500';
  } else {
    compatibilitySpan.textContent = 'Incompatible - Emulsion likely to separate'
  }
}