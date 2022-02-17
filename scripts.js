/* Pulling in the HTML */

const body = document.querySelector('.calculatorBody');
const display = document.querySelector('.numberDisplay');
const buttonSection = document.querySelector('.buttonSection');
const numbersContainer = document.querySelector('.numbersContainer');
const operandsContainers = document.querySelector('.operandsContainer');
let numberButtons = []; // Eventual nodelist
let operandButtons = []; // Eventual nodelist
let currentValue = display.textContent;
let numbers = [];

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

function addNumbers() {

}

/* Event handlers */

function handleNumber(e) {
  const input = this.dataset.value;
  console.log(input);
  currentValue += input;
  updateDisplay();
}

function handleOperand() {
  if (this.dataset.value === '=') {
    console.log('calculating!')
    console.log(numbers);
    return
  }
  console.log(this.dataset.value);
  const value1 = parseInt(currentValue);
  numbers.push(value1);
  currentValue = '';
  updateDisplay();

  if (this.dataset.value === '*') {
    console.log('multiplying!');
  } else if (this.dataset.value === '/') {
    console.log('dividing!');
  } else if (this.dataset.value === '-') {
    console.log('subtracting!');
  } else if (this.dataset.value === '+') {
    console.log('adding!');
  } 
}

/* Event listeners */

numberButtons.forEach(number => number.addEventListener('click', handleNumber));
operandButtons.forEach(number => number.addEventListener('click', handleOperand));