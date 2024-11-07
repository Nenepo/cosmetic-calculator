

const chemicalProperties = {
  'acetic acid': { molWeight: 60.05, ka: 1.8e-5, type: 'acid' },
  'aniline': { molWeight: 93.13, kb: 4.3e-10, type: 'base' },
  'ammonia': { molWeight: 17.03, kb: 1.8e-5, type: 'base' },
  'arsenic acid': { molWeight: 141.94, ka: 5.8e-3, type: 'acid' }, // First Ka value
  'arsenious acid': { molWeight: 125.94, ka: 6.0e-10, type: 'acid' },
  'benzoic acid': { molWeight: 122.12, ka: 6.3e-5, type: 'acid' },
  'boric acid': { molWeight: 61.83, ka: 7.3e-10, type: 'acid' },
  'carbonic acid': { molWeight: 62.03, ka: 4.3e-7, type: 'acid' }, // First Ka value
  'chlorous acid': { molWeight: 68.45, ka: 1.2e-2, type: 'acid' },
  'citric acid': { molWeight: 192.12, ka: 7.4e-4, type: 'acid' }, // First Ka value
  'formic acid': { molWeight: 46.03, ka: 1.8e-4, type: 'acid' },
  'hydrocyanic acid': { molWeight: 27.03, ka: 4.9e-10, type: 'acid' },
  'hydrofluoric acid': { molWeight: 20.01, ka: 6.8e-4, type: 'acid' },
  'hydrosulfuric acid': { molWeight: 34.08, ka: 9.6e-8, type: 'acid' },
  'hydrochloric acid': { molWeight: 36.46, ka: 1e7, type: 'acid' }, // Strong acid
  'hypochlorous acid': { molWeight: 52.46, ka: 3.0e-8, type: 'acid' },
  'nitric acid': { molWeight: 63.01, ka: 1e7, type: 'acid' }, // Strong acid
  'nitrous acid': { molWeight: 47.01, ka: 4.5e-4, type: 'acid' },
  'perchloric acid': { molWeight: 100.46, ka: 1e7, type: 'acid' }, // Strong acid
  'phenol': { molWeight: 94.11, ka: 1.3e-10, type: 'acid' },
  'phenol acid': { molWeight: 94.11, ka: 1.3e-10, type: 'acid' }, // Same as phenol
  'phosphoric acid': { molWeight: 97.99, ka: 7.5e-3, type: 'acid' }, // First Ka value
  'phosphorous acid': { molWeight: 81.99, ka: 5.0e-2, type: 'acid' }, // First Ka value
  'sodium hydroxide': { molWeight: 40.00, kb: 1e7, type: 'base' }, // Strong base
  'sulfuric acid': { molWeight: 98.08, ka: 1e7, type: 'acid' }, // Strong acid
  'sulfurous acid': { molWeight: 82.08, ka: 1.5e-2, type: 'acid' } // First Ka value
};



const weightPpt = document.getElementById('weight');
const volPpt = document.getElementById('vol');
const concPpt = document.getElementById('conc');

const chemicalCalc = document.getElementById('chemicalCalc');
const calculatePh = document.getElementById('calculatePh');


// Add event listeners for radio/checkbox changes
weightPpt.addEventListener('change', handleInputTypeChange);
volPpt.addEventListener('change', handleInputTypeChange);
concPpt.addEventListener('change', handleInputTypeChange);

function handleInputTypeChange(event) {
  // Uncheck other options
  if (event.target.id === 'weight') {
    volPpt.checked = false;
    concPpt.checked = false;
    chemicalCalc.innerHTML = `
      <div class="ph1">
        <div>
          <label for="weightInput">Weight of acid or base (grams)</label>
          <input type="number" id="weightInput" step="0.01" />
        </div>
      </div>`;
  } else if (event.target.id === 'vol') {
    weightPpt.checked = false;
    concPpt.checked = false;
    chemicalCalc.innerHTML = `
      <div class="ph1">
        <div>
          <label for="volInput">Volume (mL)</label>
          <input type="number" id="volInput" step="0.01" />
        </div>
      </div>`;
  } else if (event.target.id === 'conc') {
    weightPpt.checked = false;
    volPpt.checked = false;
    chemicalCalc.innerHTML = `
      <div class="ph1">
        <div>
          <label for="concOfAcidOrBase">Concentration of acid or base (molarity)</label>
          <input type="number" id="concOfAcidOrBase" step="0.0001" />
        </div>
        <div>
          <label for="volOfAcidOrBase">Volume of acid or base (liters)</label>
          <input type="number" id="volOfAcidOrBase" step="0.01" />
        </div>
        <div>
          <label for="totalVolume">Total volume of solution including acid/base (liters)</label>
          <input type="number" id="totalVolume" step="0.01" />
        </div>
      </div>`;
  }
}


const chemicalSelect = document.getElementById('chemicalSelect');
const resultsDiv = document.getElementById('results');

chemicalSelect.addEventListener('change', (event) => {

  const selectedChemical = event.target.value;
  console.log(selectedChemical)


  const properties = chemicalProperties[selectedChemical];

  if (properties) {
    resultsDiv.textContent = `Calculated pH: ${result.toFixed(2)}`;

  } else {
    resultsDiv.textContent = '';
  }
});

const selectedChemical = document.getElementById('chemical');

// pH Calculation Functions

// pH calculation based on weight
function calculatePhFromWeight(weight, chemical, totalVolume = 1) {
  if (!chemicalProperties[chemical]) {
    throw new Error('Chemical not found in database');
  }

  const { molWeight, ka, kb, type } = chemicalProperties[chemical];
  const moles = weight / molWeight;
  const concentration = moles / totalVolume;

  if (type === 'acid') {
    if (ka >= 1) { // Strong acid
      return -Math.log10(concentration);
    } else { // Weak acid
      const h3o = Math.sqrt(ka * concentration);
      return -Math.log10(h3o);
    }
  } else { // Base
    if (kb >= 1) { // Strong base
      return 14 + Math.log10(concentration);
    } else { // Weak base
      const oh = Math.sqrt(kb * concentration);
      return 14 - (-Math.log10(oh));
    }
  }
}

// pH calculation based on volume
function calculatePhFromVolume(volume, chemical, concentration = 1) {

  // Convert volume to liters
  const volumeInLiters = volume / 1000;
  return calculatePhFromConcentration(concentration, volumeInLiters, volumeInLiters, chemical);
}

// pH calculation based on concentration
function calculatePhFromConcentration(concentration, volumeOfAcidBase, totalVolume, chemical) {
  if (!chemicalProperties[chemical]) {
    throw new Error('Chemical not found in database');
  }
  // Calculate the final concentration after dilution
  const finalConcentration = (concentration * volumeOfAcidBase) / totalVolume;
  const { ka, kb, type } = chemicalProperties[chemical];

  if (type === 'acid') {
    if (ka >= 1) { // Strong acid
      return -Math.log10(finalConcentration);
    } else { // Weak acid
      const h3o = Math.sqrt(ka * finalConcentration);
      return -Math.log10(h3o);
    }
  } else { // Base
    if (kb >= 1) { // Strong base
      return 14 + Math.log10(finalConcentration);
    } else { // Weak base
      const oh = Math.sqrt(kb * finalConcentration);
      return 14 - (-Math.log10(oh));
    }
  }

}


calculatePh.addEventListener('click', () => {
  try {
    const selectedChemical = chemicalSelect.value;
    if (!selectedChemical) {
      throw new Error('Please select a chemical');
    }

    let result = 0;

    if (weightPpt.checked) {
      const weight = parseFloat(document.getElementById('weightInput').value);
      if (isNaN(weight)) throw new Error('Please enter a valid weight');
      result = calculatePhFromWeight(weight, selectedChemical);
    }
    else if (volPpt.checked) {
      const volume = parseFloat(document.getElementById('volInput').value);
      if (isNaN(volume)) throw new Error('Please enter a valid volume');
      result = calculatePhFromVolume(volume, selectedChemical);
    }
    else if (concPpt.checked) {
      const concentration = parseFloat(document.getElementById('concOfAcidOrBase').value);
      const volumeOfAcidBase = parseFloat(document.getElementById('volOfAcidOrBase').value);
      const totalVolume = parseFloat(document.getElementById('totalVolume').value);

      if (isNaN(concentration) || isNaN(volumeOfAcidBase) || isNaN(totalVolume)) {
        throw new Error('Please enter valid numbers for all fields');
      }

      result = calculatePhFromConcentration(
        concentration,
        volumeOfAcidBase,
        totalVolume,
        selectedChemical
      );
    }
    // Display result
    const resultsDiv = document.getElementById('results');
    resultsDiv.textContent = `Calculated pH: ${result.toFixed(2)}`;
    resultsDiv.style.padding = '10px';
    resultsDiv.style.marginTop = '10px';
    resultsDiv.style.backgroundColor = '#f0f0f0';
    resultsDiv.style.borderRadius = '4px';

  } catch (error) {
    document.getElementById('results').textContent = `Error: ${error.message}`;
  }
});

if (weightPpt.checked) {
  chemicalCalc.innerHTML = `
    <div class="ph1">
      <div>
        <label for="weightInput">Weight of acid or base (grams)</label>
        <input type="number" id="weightInput" step="0.01" />
      </div>
    </div>`;
}
