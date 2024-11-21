function printResults() {
  // Create a new window for printing
  const printWindow = window.open('', '_blank');

  // Get formula details
  const formulaName = document.getElementById('formulaName').value || 'Untitled Formula';
  const batchSize = document.getElementById('batchSize').value || '0';
  const totalPercentage = document.getElementById('totalPercentage').textContent;
  const isHLBEnabled = document.getElementById('hlbToggle').checked;

  // Get ingredients table
  const ingredientTable = document.getElementById('ingredientTable');
  const ingredients = Array.from(ingredientTable.rows).slice(1); // Skip header row

  // Get pH calculation results if they exist
  const phResults = document.getElementById('results').innerHTML;

  // get instructions
  const instructions = document.getElementById("instructions").value || 'no instructions';

  // Create print content
  let printContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>${formulaName}</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        h1 { color: #333; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f5f5f5; }
        .summary { margin: 20px 0; }
        .results-section { margin: 30px 0; }
        @media print {
          button { display: none; }
        }
      </style>
    </head>
    <body>
      <h1>${formulaName}</h1>
      
      <div class="summary">
        <p><strong>Batch Size:</strong> ${batchSize} grams</p>
        <p><strong>Total Percentage:</strong> ${totalPercentage}</p>
        ${isHLBEnabled ? '<p><strong>HLB System:</strong> Enabled</p>' : ''}

      </div>

      <div class="results-section">
        <h2>Ingredients</h2>
        <table>
          <tr>
            <th>Ingredient</th>
            <th>Percentage (%)</th>
            <th>Weight (g)</th>
          </tr>
  `;

  // Add ingredient rows
  ingredients.forEach(row => {
    printContent += `
      <tr>
        <td>${row.cells[0].textContent}</td>
        <td>${row.cells[1].textContent}</td>
        <td>${row.cells[2].textContent}</td>
      </tr>
    `;
  });
 ` <p><strong>Instructions:</strong> ${instructions}</p>`

  printContent += `
      </table>
    </div>
  `;

  // Add pH results if they exist
  if (phResults) {
    printContent += `
      <div class="results-section">
        <h2>pH Calculations</h2>
        ${phResults}
      </div>
    `;
  }

  // Add footer with date
  printContent += `
      <div class="footer">
        <p><small>Generated on: ${new Date().toLocaleString()}</small></p>
      </div>
      
      <button onclick="window.print()" style="margin: 20px 0;">Print Document</button>
    </body>
    </html>
  `;

  // Write to the new window and trigger print
  printWindow.document.write(printContent);
  printWindow.document.close();
}

// Add click event listener to print button
document.querySelector('.print').addEventListener('click', printResults);