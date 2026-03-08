
const display = document.getElementById("display");
const buttons = document.querySelector(".buttons");


let currentInput = "0";
let previousInput = "";
let operator = null;
let shouldResetScreen = false;


function updateDisplay() {
  display.value = currentInput;
}

function appendValue(value) {

  if (currentInput === "Error" || shouldResetScreen) {
    currentInput = value === "." ? "0." : value;
    shouldResetScreen = false;
    updateDisplay();
    return;
  }


  if (value === "." && currentInput.includes(".")) {
    return;
  }


  if (currentInput === "0" && value !== ".") {
    currentInput = value;
  } else {
    currentInput += value;
  }

  updateDisplay();
}


function selectOperator(nextOperator) {
  if (currentInput === "Error") {
    clearCalculator();
  }

  if (operator && !shouldResetScreen) {
    calculate();
  }

  previousInput = currentInput;
  operator = nextOperator;
  shouldResetScreen = true;
}


function formatResult(number) {
  return Number(number.toFixed(10)).toString();
}


function calculate() {
  if (!operator || shouldResetScreen) {
    return;
  }

  const firstNumber = Number(previousInput);
  const secondNumber = Number(currentInput);
  let result = 0;

  switch (operator) {
    case "+":
      result = firstNumber + secondNumber;
      break;
    case "-":
      result = firstNumber - secondNumber;
      break;
    case "*":
      result = firstNumber * secondNumber;
      break;
    case "/":
      result = secondNumber === 0 ? NaN : firstNumber / secondNumber;
      break;
    default:
      return;
  }

  currentInput = Number.isFinite(result) ? formatResult(result) : "Error";
  previousInput = "";
  operator = null;
  shouldResetScreen = true;
  updateDisplay();
}


function clearCalculator() {
  currentInput = "0";
  previousInput = "";
  operator = null;
  shouldResetScreen = false;
  updateDisplay();
}


buttons.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;


  if (button.dataset.value !== undefined) {
    appendValue(button.dataset.value);
    return;
  }


  if (button.dataset.action === "operator") {
    selectOperator(button.dataset.operator);
    return;
  }

  if (button.dataset.action === "calculate") {
    calculate();
    return;
  }


  if (button.dataset.action === "clear") {
    clearCalculator();
  }
});


document.addEventListener("keydown", (event) => {
  const key = event.key;

  if ((key >= "0" && key <= "9") || key === ".") {
    appendValue(key);
    return;
  }

  if (["+", "-", "*", "/"].includes(key)) {
    selectOperator(key);
    return;
  }
  if (key === "x" || key === "X") {
    selectOperator("*");
    return;
  }

  if (key === "Enter" || key === "=") {
    event.preventDefault();
    calculate();
    return;
  }

  if (key === "Escape" || key.toLowerCase() === "c") {
    clearCalculator();
  }
});

updateDisplay();