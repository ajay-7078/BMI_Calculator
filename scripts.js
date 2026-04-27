// DOM Elements
const form = document.querySelector('.bmi-form');
const heightInput = document.querySelector('#height');
const weightInput = document.querySelector('#weight');
const resultsDiv = document.querySelector('#results');

// Calculate BMI and get category
function calculateBMI(height, weight) {
  if (height <= 0 || weight <= 0) {
    return { bmi: null, category: null, error: 'Height and weight must be greater than 0' };
  }

  const bmi = (weight / ((height * height) / 10000)).toFixed(1);

  let category;
  if (bmi < 18.6) {
    category = 'underweight';
  } else if (bmi >= 18.6 && bmi <= 24.9) {
    category = 'normal';
  } else if (bmi > 24.9 && bmi <= 29.9) {
    category = 'overweight';
  } else {
    category = 'obese';
  }

  return { bmi, category, error: null };
}

// Get category label
function getCategoryLabel(category) {
  const labels = {
    underweight: 'Underweight',
    normal: 'Normal Weight',
    overweight: 'Overweight',
    obese: 'Obese'
  };
  return labels[category] || '';
}

// Display results
function displayResults(bmi, category) {
  const categoryLabel = getCategoryLabel(category);
  resultsDiv.innerHTML = `
    <div class="result-content">
      <div class="result-value">${bmi}</div>
      <div class="result-label">BMI Value</div>
      <div class="result-status ${category}">${categoryLabel}</div>
    </div>
  `;
}

// Display error
function displayError(message) {
  resultsDiv.innerHTML = `<div class="error-message">❌ ${message}</div>`;
}

// Clear results
function clearResults() {
  resultsDiv.innerHTML = '';
}

// Validate inputs
function validateInputs(height, weight) {
  if (!height || height === '') {
    return { valid: false, error: 'Please enter your height' };
  }
  if (!weight || weight === '') {
    return { valid: false, error: 'Please enter your weight' };
  }
  if (isNaN(height) || isNaN(weight)) {
    return { valid: false, error: 'Please enter valid numbers' };
  }
  if (height <= 0) {
    return { valid: false, error: 'Height must be greater than 0' };
  }
  if (weight <= 0) {
    return { valid: false, error: 'Weight must be greater than 0' };
  }
  return { valid: true };
}

// Form submit handler
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const height = parseFloat(heightInput.value);
  const weight = parseFloat(weightInput.value);

  // Validate inputs
  const validation = validateInputs(height, weight);
  if (!validation.valid) {
    displayError(validation.error);
    return;
  }

  // Calculate BMI
  const result = calculateBMI(height, weight);
  if (result.error) {
    displayError(result.error);
  } else {
    displayResults(result.bmi, result.category);
  }
});

// Clear results on input focus
heightInput.addEventListener('focus', clearResults);
weightInput.addEventListener('focus', clearResults);
