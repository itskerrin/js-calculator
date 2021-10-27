const btn = document.querySelectorAll('.btn');
const currentEl = document.querySelector('[data-current]');
const previousEl = document.querySelector('[data-previous]');
const btnOperation = document.querySelectorAll('.btn-operation');
const del = document.getElementById('del');
const reset = document.getElementById('reset');
const equals = document.getElementById('equals');

// Event handlers

btn.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.appendNum(button.innerText);
    calculator.updateDisplay();
  });
});

btnOperation.forEach((operation) => {
  operation.addEventListener('click', () => {
    calculator.getOperation(operation.innerText);
    calculator.updateDisplay();
  });
});

// result
equals.addEventListener('click', () => {
  calculator.calculate();
  calculator.updateDisplay();
});

// reset
reset.addEventListener('click', () => {
  calculator.clear();
  calculator.updateDisplay();
});

// delete
del.addEventListener('click', () => {
  calculator.delete();
  calculator.updateDisplay();
});

class Calculator {
  constructor(currentEl, previousEl) {
    this.currentEl = currentEl;
    this.previousEl = previousEl;
  }

  clear() {
    this.current = '';
    this.previous = '';
    this.operation = undefined;
  }

  delete() {
    this.current = this.current.slice(0, -1);
  }

  appendNum(number) {
    if (number === '.' && this.current.includes('.')) return;
    this.current === undefined // avoids displaying undefined as text
      ? (this.current = number)
      : (this.current = this.current + number);
  }

  getOperation(operation) {
    if (this.current === '') return;
    if (this.previous !== '') {
      this.calculate();
    }
    this.operation = operation;
    this.previous = this.current;
    this.current = '';
  }

  calculate() {
    let calculateNums;
    // gets values as numbers
    const prevNum = parseFloat(this.previous);
    const currentNum = parseFloat(this.current);
    if (isNaN(prevNum) || isNaN(currentNum)) return;

    switch (this.operation) {
      case '+':
        calculateNums = prevNum + currentNum;
        break;
      case '-':
        calculateNums = prevNum - currentNum;
        break;
      case 'x':
        calculateNums = prevNum * currentNum;
        break;
      case '/':
        calculateNums = prevNum / currentNum;
        break;
      default:
        return;
    }

    this.current = calculateNums;
    this.operation = undefined;
    this.previous.toString().innerText = ''; // displays error in terminal but shows result, will come back to fix
  }

  getDisplayNum(number) {
    // displays numbers with only one decimal point and adds commas to long numbers
    const numAsString = number.toString();
    const integer = parseFloat(numAsString.split('.')[0]);
    const decimal = numAsString.split('.')[1];
    let intDisplay;

    if (isNaN(integer)) {
      intDisplay = '';
    } else {
      intDisplay = integer.toLocaleString('en', { maximumFractionDigits: 0 });
    }

    if (decimal !== undefined) {
      return `${intDisplay}.${decimal}`;
    } else {
      return intDisplay;
    }
  }

  updateDisplay() {
    this.previousEl.innerText = '';
    if (this.previous === undefined) {
      this.previous = '';
    } else if (this.previous !== undefined && this.operation != null) {
      this.previousEl.innerText = `${this.getDisplayNum(this.previous)} ${
        this.operation
      }`;
    }

    this.currentEl.innerText = this.getDisplayNum(this.current);
  }
}

const calculator = new Calculator(currentEl, previousEl);
