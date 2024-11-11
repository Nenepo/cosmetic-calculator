const HLB_VALUES_EMULSIFIERS = {
  "Beeswax": 12,
  "Candelilla Wax": 14,
  "Carnauba Wax": 12,
  "Cetyl Alcohol Flakes": 15.5,
  "Emulsifying Wax Conditioning": 14.9,
  "Emulsifying Wax Conditioning Plus": 14.9,
  "Emulsifying Wax Soft & Silky": 14.9,
  "Emulsifying Wax Traditional": 14.9,
  "Polysorbate 20": 16.7,
  "Polysorbate 80": 15,
  "Smooth & Creamy Lotion Bar Additive": 4.5,
  "Stearic Acid": 15,
  "Ceteareth-20": 15.2,
  "Cetearyl Glucoside": 11,
  "Ceteth-10": 12.9,
  "Ceteth-2": 5.3,
  "Ceteth-20": 15.7,
  "Cocamide MEA": 13.5,
  "Conditioning Emulsifier": 15,
  "Emulsifying Wax NF": 15,
  "Glyceryl Laurate": 5.2,
  "Glyceryl Stearate": 3.8,
  "Glyceryl Stearate and PEG-100 Stearate": 11,
  "Glyceryl Stearate SE": 5.8,
  "Glycol Distearate": 1,
  "Glycol Stearate": 2.9,
  "Isoceteth-20": 15.7,
  "Isosteareth-20": 15,
  "Lauramide DEA": 15,
  "Laureth-23": 16.9,
  "Laureth-4": 9.7,
  "Lecithin": 4,
  "Linoleamide DEA": 10,
  "Methyl Glucose Sesquistearate": 6.6,
  "Nature Mulse (aka Natramulse)": 3.8,
  "Oleth-10": 12.4,
  "Oleth-10/Polyoxyl 10 Oleyl Ether NF": 12.4,
  "Oleth-2": 4.9,
  "Oleth-20": 15.3,
  "PEG-100 Stearate": 18.8,
  "PEG-20 Almond Glycerides": 10,
  "PEG-20 Methyl Glucose Sesquistearate": 15,
  "PEG-25 Hydrogenated Castor Oil": 10.8,
  "PEG-30 Dipolyhydroxystearate": 5.5,
  "PEG-4 Dilaurate": 6,
  "PEG-40 Sorbitan Peroleate": 9,
  "PEG-60 Almond Glycerides": 15,
  "PEG-7 Esters Olive Oil": 11,
  "PEG-8 Laurate": 13,
  "PEG-80 Sorbitan Laurate": 19.1,
  "Polysorbate 60": 14.9,
  "Polysorbate 85": 11,
  "Propylene Glycol Isostearate": 2.5,
  "Sodium Stearoyl Lactylate": 8.3,
  "Sorbitan Isostearate": 4.7,
  "Sorbitan Laurate": 8.6,
  "Sorbitan Oleate": 4.3,
  "Sorbitan Sesquioleate": 3.7,
  "Sorbitan Stearate": 4.7,
  "Sorbitan Stearate and Sucrose Cocoate": 6,
  "Sorbitan Trioleate": 1.8,
  "Stearamide MEA": 11,
  "Steareth-2": 4.9,
  "Steareth-21": 15.5
};
const HLB_VALUES_OIL_PHASE = {
  "Almond Oil NF": 6,
  "Anhydrous Lanolin USP": 10,
  "Apricot Kernel Oil": 7,
  "Avocado Oil": 7,
  "Babassu Oil": 8,
  "Beeswax": 12,
  "Borage Seed Oil": 7,
  "Brazil Nut Oil": 8,
  "C12-15 Alkyl Benzoate": 13,
  "Canola Oil": 7,
  "Caprylic/Capric Triglyceride": 11,
  "Carnauba Wax": 12,
  "Carrot Root Extract": 6,
  "Carrot Seed Oil": 6,
  "Castor Oil": 14,
  "Ceresin": 8,
  "Cetearyl Alcohol NF": 15.5,
  "Cetyl Alcohol": 15.5,
  "Cetyl Esters": 10,
  "Cetyl Palmitate": 10,
  "Cocoa Butter": 6,
  "Coconut Oil": 8,
  "Cyclomethicone": 7.75,
  "Diisopropyl Adipate": 9,
  "Dimethicone": 5,
  "Dog Rose Hips Oil": 7,
  "Emu Oil": 8,
  "Evening Primrose Oil": 7,
  "Grape Seed Oil": 7,
  "Hemp Oil": 7,
  "Hybrid Safflower Oil": 9,
  "Isopropyl Myristate": 11.5,
  "Isopropyl Palmitate": 11.5,
  "Jojoba Oil": 6.5,
  "Kokum Butter": 8,
  "Kukui Nut Oil": 7,
  "Lanolin": 10,
  "Macadamia Nut Oil": 7,
  "Mango Seed Butter": 8,
  "Meadowfoam Seed Oil": 6.5
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
            ${Object.keys(HLB_VALUES_OIL_PHASE)
          .filter(ing => HLB_VALUES_OIL_PHASE[ing] < 12)
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
            ${Object.keys(HLB_VALUES_EMULSIFIERS)
      .filter(ing => HLB_VALUES_EMULSIFIERS[ing] >= 12)
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

  const hlbValue = HLB_VALUES_EMULSIFIERS[ingredient] || HLB_VALUES_OIL_PHASE[ingredient] ;

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