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

/* Functions */

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

/* Event handlers */

function handleNumber(e) {
  const input = this.dataset.value;
  console.log(input);
  displayValue += input;
  updateDisplay();
}

function handleOperand() {
  if (value1 !== 0) {
    value2 = parseInt(displayValue)
  } else {
    value1 = parseInt(displayValue);
  }

  displayValue = '';
  updateDisplay();

  if (this.dataset.value === '=') {
    if (flags.adding) {
      result = value1 + value2;
    }
    if (flags.subtracting) {
      result = value1 - value2;
    }
    if (flags.multiplying) {
      result = value1 * value2;
    }
    if (flags.dividing) {
      result = value1 / value2;
    }
    displayValue = result;
    updateDisplay();
  }

  flipFlag(this.dataset.value);
}

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

/* Event listeners */

numberButtons.forEach(number => number.addEventListener('click', handleNumber));
operandButtons.forEach(number => number.addEventListener('click', handleOperand));
clearButton.addEventListener('click', handleClear);

/* NOTES
-So far, I can add/subtract/multiply/divide 2 numbers, hit =, and
have it work normally. 
-The CLR button also works as it should.
-Cannot do something like 1 + 2 + 3. Need to change how switch works to
fix, and maybe take all the acutal arithmetic code and put it into
separate functions, that way they can be called whether or not the =
has been pressed.
*/