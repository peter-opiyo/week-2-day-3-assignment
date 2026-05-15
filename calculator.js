const display = document.querySelector("#display");
const buttonsContainer = document.querySelector("#buttons");

let currentNumber = "";
let previousNumber = null;
let currentOperator = null;
let shouldResetDisplay = false;

const buttons = [
  "C", "←", "÷", "×",
  "7", "8", "9", "-",
  "4", "5", "6", "+",
  "1", "2", "3", "=",
  "0", "."
];

function updateDisplay(value) {
  display.textContent = value || "0";
}

function calculate(firstNumber, secondNumber, operator) {
  const first = Number(firstNumber);
  const second = Number(secondNumber);

  if (operator === "+") return first + second;
  if (operator === "-") return first - second;
  if (operator === "×") return first * second;
  if (operator === "÷") {
    if (second === 0) return "Error";
    return first / second;
  }

  return second;
}

function inputDigit(digit) {
  if (shouldResetDisplay) {
    currentNumber = "";
    shouldResetDisplay = false;
  }

  currentNumber += digit;
  updateDisplay(currentNumber);
}

function inputDecimal() {
  if (shouldResetDisplay) {
    currentNumber = "";
    shouldResetDisplay = false;
  }

  if (!currentNumber.includes(".")) {
    currentNumber = currentNumber === "" ? "0." : currentNumber + ".";
    updateDisplay(currentNumber);
  }
}

function chooseOperator(operator) {
  if (currentNumber === "" && previousNumber === null) return;

  if (currentOperator && currentNumber !== "") {
    const result = calculate(previousNumber, currentNumber, currentOperator);
    previousNumber = result;
    updateDisplay(result);
  } else if (currentNumber !== "") {
    previousNumber = currentNumber;
  }

  currentNumber = "";
  currentOperator = operator;
  shouldResetDisplay = false;
}

function evaluateCalculation() {
  if (!currentOperator || currentNumber === "" || previousNumber === null) return;

  const result = calculate(previousNumber, currentNumber, currentOperator);
  updateDisplay(result);

  currentNumber = String(result);
  previousNumber = null;
  currentOperator = null;
  shouldResetDisplay = true;
}

function clearCalculator() {
  currentNumber = "";
  previousNumber = null;
  currentOperator = null;
  shouldResetDisplay = false;
  updateDisplay("0");
}

function backspace() {
  if (shouldResetDisplay) return;
  currentNumber = currentNumber.slice(0, -1);
  updateDisplay(currentNumber);
}

function handleButtonPress(value) {
  if (!Number.isNaN(Number(value))) {
    inputDigit(value);
  } else if (value === ".") {
    inputDecimal();
  } else if (["+", "-", "×", "÷"].includes(value)) {
    chooseOperator(value);
  } else if (value === "=") {
    evaluateCalculation();
  } else if (value === "C") {
    clearCalculator();
  } else if (value === "←") {
    backspace();
  }
}

buttons.forEach(function (buttonText) {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = buttonText;
  button.className = "calc-btn";

  if (["+", "-", "×", "÷", "="].includes(buttonText)) {
    button.classList.add("operator-btn");
  }

  if (buttonText === "C" || buttonText === "←") {
    button.classList.add("control-btn");
  }

  button.addEventListener("click", function () {
    handleButtonPress(buttonText);
  });

  buttonsContainer.appendChild(button);
});

document.addEventListener("keydown", function (event) {
  const key = event.key;

  if (/^[0-9]$/.test(key)) {
    handleButtonPress(key);
  } else if (key === ".") {
    handleButtonPress(".");
  } else if (["+", "-"].includes(key)) {
    handleButtonPress(key);
  } else if (key === "*") {
    handleButtonPress("×");
  } else if (key === "/") {
    event.preventDefault();
    handleButtonPress("÷");
  } else if (key === "Enter" || key === "=") {
    handleButtonPress("=");
  } else if (key === "Escape" || key.toLowerCase() === "c") {
    handleButtonPress("C");
  } else if (key === "Backspace") {
    handleButtonPress("←");
  }
});

updateDisplay("0");
