
function createRandomPromise(promiseName) {
  const delay = Math.floor(Math.random() * 3) + 1;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ name: promiseName, timeTaken: delay });
    }, delay * 1000);
  });
}

function updateTable(results) {
  const output = document.getElementById('output');
  output.innerHTML = '';
  let totalTime = 0;
  
  // Add each result to the table
  results.forEach((result, index) => {
    totalTime = Math.max(totalTime, result.timeTaken);

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${result.name}</td>
      <td>${result.timeTaken.toFixed(3)}</td>
    `;
    output.appendChild(row);
  });

  // Add the total row
  const totalRow = document.createElement('tr');
  totalRow.innerHTML = `
    <td>Total</td>
    <td>${totalTime.toFixed(3)}</td>
  `;
  output.appendChild(totalRow);
}

// Function to resolve all promises and update the table
async function trackPromises() {
  // Display the loading message while promises are being processed
  const output = document.getElementById('output');
  output.innerHTML = `<tr><td colspan="2" class="text-center">Loading...</td></tr>`;

  // Create three promises with random delays
  const promises = [
    createRandomPromise('Promise 1'),
    createRandomPromise('Promise 2'),
    createRandomPromise('Promise 3'),
  ];

  // Wait for all promises to resolve using Promise.all
  const results = await Promise.all(promises);

  // Update the table with the results
  updateTable(results);
}

// Start tracking promises once the page is loaded
window.onload = trackPromises;
