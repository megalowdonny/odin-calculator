/* Pulling in the HTML */

const body = document.querySelector('.calculatorBody');
const display = document.querySelector('.numberDisplay');
const buttonSection = document.querySelector('.buttonSection');
const numberButtons = document.querySelector('.numberButtons');
const operandButtons = document.querySelector('.operandButtons');
let numbers = []; // Eventual nodelist
let operands = []; // Eventual nodelist
let currentValue = display.textContent;

/* Building the Calculator */

const numberList = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0]
numberList.forEach(i => { 
  createButton(i, numberButtons);
});
numbers = Array.from(numberButtons.querySelectorAll('.button'));

const operandList = ['*', '/', '-', '+', '='];
operandList.forEach(i => {
  createButton(i, operandButtons);
})
operands = Array.from(operandButtons.querySelectorAll('.button'));

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
  display.textContent = currentValue;
}

/* Event handlers */

function handleNumber(e) {
  const input = e.target.dataset.value;
  console.log(input);
  currentValue += input;
  updateDisplay();
}

function handleOperand(e) {
  console.log(e.target.dataset.value);
}

/* Event listeners */

numbers.forEach(number => number.addEventListener('click', handleNumber));
operands.forEach(number => number.addEventListener('click', handleOperand));