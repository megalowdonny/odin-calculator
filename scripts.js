/* Pulling in the HTML */

const body = document.querySelector('.calculatorBody');
const display = document.querySelector('.numberDisplay');
const buttonSection = document.querySelector('.buttonSection');
const numbersContainer = document.querySelector('.numbersContainer');
const operandsContainers = document.querySelector('.operandsContainer');
let numberButtons = []; // Eventual nodelist
let operandButtons = []; // Eventual nodelist
let displayValue = display.textContent;
let value1 = 0;
let value2 = 0;
let result = 0;
let flags = {
  adding: false,
  subtracting: false,
  multiplying: false,
  dividing: false,
}

/* Building the Calculator */

const numberList = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0]
numberList.forEach(i => { 
  createButton(i, numbersContainer);
});
numberButtons = Array.from(numbersContainer.querySelectorAll('.button'));

const operandList = ['*', '/', '-', '+', '='];
operandList.forEach(i => {
  createButton(i, operandsContainers);
})
operandButtons = Array.from(operandsContainers.querySelectorAll('.button'));

// Keeps CLR button in numbersContainer, but out of numberButtons
createButton('CLR', numbersContainer);
const clearButton = document.querySelector('#oCLR');

createButton('dot', numbersContainer);
const dot = document.querySelector('#odot');
dot.textContent = '.';
dot.dataset.value = '.';
/* Front-end functions */

function createButton(i, list) {
  const button = document.createElement('button');
  button.classList.add('button');
  button.id = `o${i}`;
  button.textContent = `${i}`;
  button.dataset.value = i;
  list.appendChild(button);
}

function updateDisplay() {
  display.textContent = displayValue;
}

/* Back-end functions */

function flipFlag (operand) {
  console.log(operand);
  switch (operand) {
    case '+':
      flags.adding = true;
      break;
    case '-':
      flags.subtracting = true;
      break;
    case '*':
      flags.multiplying = true;
      break;
    case '/':
      flags.dividing = true;
      break;
  }
}

/* Actual math functions */

function addNumbers(x, y) {
  flags.adding = false;
  return x + y;
}

function subtractNumbers (x, y) {
  flags.subtracting = false;
  return x - y;
}

function multiplyNumbers (x, y) {
  flags.multiplying = false;
  return x * y;
}

function divideNumbers(x, y) {
  if (y === 0) {
    return 'ERROR';
  }
  flags.dividing = false;
  return x / y;
}

/* Event handlers */

function handleNumber(e) {
  const input = this.dataset.value;
  if (input === '.' && displayValue.includes('.')) {
    handleError();
    return;
  }
  displayValue += input;
  updateDisplay();
}

function handleOperand() {
  // Shuffles the values from display to value1/2
  if (value1 !== 0) {
    value2 = parseFloat(displayValue)
  } else {
    value1 = parseFloat(displayValue);
  }

  displayValue = '';
  updateDisplay();

  // Only runs if = is pressed, or if this is not the first operation
  if (this.dataset.value === '=' || (value1 !== 0 && value2 !== 0)) {
    if (flags.adding) {
      result = addNumbers(value1, value2);
    }
    if (flags.subtracting) {
      result = subtractNumbers(value1, value2);
    }
    if (flags.multiplying) {
      result = multiplyNumbers(value1, value2);
    }
    if (flags.dividing) {
      result = divideNumbers(value1, value2);
    }

    // Will run one of these no matter what
    if (this.dataset.value !== '=') {
      value1 = result;
    } else {
      // Brings result down to at-most 2 decimals
      displayValue = Math.round(result * 100) / 100;
      updateDisplay();
    }
  }

  // Catches dividing by 0
  if (value2 === 0 && flags.dividing === true) {
    handleError()
    return;
  }

  // Doesn't do anything if = is pressed
  flipFlag(this.dataset.value);
}

// Clears display and all values/flags
function handleClear() {
  Object.keys(flags).forEach(flag => {
    flags[flag] = false;
  }); // Turns off all of the flags
  value1 = 0;
  value2= 0;
  result = 0;

  displayValue = '';
  updateDisplay();
}

// Runs only if dividing by 0
function handleError() {
  alert('ERROR, INVALID INPUT, CLEARING NOW');
  handleClear();
}

/* Event listeners */

numberButtons.forEach(number => number.addEventListener('click', handleNumber));
operandButtons.forEach(number => number.addEventListener('click', handleOperand));
clearButton.addEventListener('click', handleClear);
dot.addEventListener('click', handleNumber)

/* NOTES
-Decimals allowed, and no more than 1 is allowed.
-Only need to do backspace and keyboard support.
*/