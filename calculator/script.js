let E = "2.71828182846";
let rad = true;
let ans = 0;
let calcHistory = [];
let storeActive = false;
let recallActive = false;
let π = "3.14159265359";
let a, b, c, d;
a = b = c = d = "empty";

function append(event) {
  let displayElement = document.getElementById("display");
  let currentValue = displayElement.value;
  currentValue += event.target.value;
  displayElement.value = currentValue;
}

function clearDisplay() {
  document.getElementById("display").value = "";
  document.getElementById("operation").value = "";
}

function calc() {
  let displayElement = document.getElementById("display");
  let operatonElement = document.getElementById("operation");
  try {
    let value = displayElement.value;
    if (value.length <= 0) {
      //ensuring the length of the value
      return;
    }
    let exe = value
      .replaceAll("√", "sqrt")
      .replaceAll("%", "*0.01")
      .replaceAll("^", "**")
      .replaceAll("X", "*")
      .replaceAll("E", "*E"); //replacing symbols for calculation
    console.log("exe:"+exe)
    let answer = eval(exe);
    displayElement.value = answer; //updating the result
    operatonElement.value = value != answer ? value : "ANS=" + value; //updating operation field
    ans = displayElement.value; //updating last calculated answer

    if (
      (calcHistory.length === 0 ||
        calcHistory[calcHistory.length - 1].operation !== value) &&
      value != ans
    ) {
      calcHistory.push({
        operation: value,
        answer,
      });
    }
    calcHistory.length > 10 && calcHistory.shift();
    populateHistory();
  } catch (e) {
    displayElement.value = "Error!";
    console.log(e)
  }
}

function fact(n) {
  let ans = 1;
  if (n === 0) return 1;
  for (let i = 2; i <= n; i++) ans = ans * i;
  return ans;
}

function sqrt(value) {
  return Math.sqrt(value);
}

function sin(value) {
  return rad ? Math.sin(value) : Math.sin(value * (π / 180));
}

function cos(value) {
  return rad ? Math.cos(value) : Math.cos(value * (π / 180));
}

function tan(value) {
  return rad ? Math.tan(value) : Math.tan(value * (π / 180));
}

function ln(value) {
  return Math.log(value);
}

function log(value) {
  return Math.log10(value);
}

function exp(value) {
  return Math.exp(value);
}

function bsp() {
  let displayElement = document.getElementById("display");
  let currentValue = displayElement.value;
  displayElement.value = currentValue.slice(0, -1);
}

function store(event) {
  let variable = event.target.value; //getting the variable name
  if (storeActive) {
    let value = document.getElementById("display").value; // getting value to be stored
    let operation = document.getElementById("operation"); // getting operation field to show th variable assigned
    if (variable === "a") {
      a = value;
      operation.value = "A→";
      console.log("Stored in a:", a);
    } else if (variable === "b") {
      b = value;
      operation.value = "B→";
      console.log("Stored in b:", b);
    } else if (variable === "c") {
      c = value;
      operation.value = "C→";
      console.log("Stored in c:", c);
    } else if (variable === "d") {
      d = value;
      operation.value = "D→";
      console.log("Stored in d:", d);
    }
    storeActive = false;
  }

  if (recallActive) {
    document.getElementById("display").value += variable;
    recallActive = false;
  }
  disableButtons(); // buttons getting disabled
}

function disableButtons() {
  document.querySelectorAll(".variable").forEach((btn) => {
    btn.disabled = true;
  });
}

function enableButtons() {
  document.querySelectorAll(".variable").forEach((btn) => {
    btn.disabled = false;
  });
}

let reset = () => (a = b = c = d = "empty");

const toggle = () =>
  document.querySelector(".history__list").classList.toggle("hide");

const populateHistory = () => {
  const historyList = document.querySelector(".history__list");
  historyList.innerHTML = "";
  calcHistory.forEach((entry) => {
    const listItem = document.createElement("li");
    console.log(entry);
    listItem.innerHTML = `<span onclick="copy(event)">${entry.operation}</span> = <span onclick="copy(event)">${entry.answer}</span>`;
    historyList.appendChild(listItem);
  });
};

let copy = (event) => {
  let value = event.target.innerText;
  document.getElementById("operation").value = "";
  document.getElementById("display").value = value;
  toggle();
};

document.addEventListener("keydown", function (event) {
  const key = event.key.toLowerCase(); // capture key and convert to lowercase
  console.log(key);
  const display = document.getElementById("display");

  switch (key) {
    case "s":
      display.value += "sin(";
      break;
    case "l":
      display.value += "log(";
      break;
    case "t":
      display.value += "tan(";
      break;
    case "c":
      display.value += "cos(";
      break;
    case "e":
      display.value += "exp(";
      break;
    case "enter": // If 'Enter' is pressed, calculate result
      calc();
      break;
    default:
      break;
  }
});
