/* Pulling in the HTML */

const body = document.querySelector('.calculatorBody');
const display = document.querySelector('.numberDisplay');
const buttonSection = document.querySelector('.buttonSection');
const numberButtons = document.querySelector('.numberButtons');
const operandButtons = document.querySelector('.operandButtons');

/* Building the Calculator */

const numberList = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0]
numberList.forEach(i => { 
  createButton(i, numberButtons);
});

const operandList = ['*', '/', '-', '+', '='];
operandList.forEach(i => {
  createButton(i, operandButtons);
})

/* Functions */

function createButton(i, list) {
  const button = document.createElement('button');
  button.classList.add('button');
  button.id = `o${i}`;
  button.textContent = `${i}`;
  button.dataset.value = i;
  list.appendChild(button);
}