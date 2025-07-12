const inputBox = document.getElementById('inputBox');
const buttons = document.querySelectorAll('.button');
const historyList = document.getElementById('historyList');

let history = [];

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const val = button.textContent;

    if (val === 'AC') {
      inputBox.value = '';
    } else if (val === 'DEL') {
      inputBox.value = inputBox.value.slice(0, -1);
    } else if (val === '=') {
      try {
        // Evaluate expression safely
        let result = eval(inputBox.value);
        if (result === undefined) return;
        inputBox.value = result;

        // Save history (max 5)
        addToHistory(inputBox.value, result);
      } catch (e) {
        inputBox.value = 'Error';
      }
    } else {
      // Add operator or number, but prevent multiple operators in a row (optional)
      inputBox.value += val;
    }
  });
});

function addToHistory(expression, result) {
  if (history.length === 5) history.shift(); // keep max 5 items
  history.push({ expression, result });
  renderHistory();
}

function renderHistory() {
  historyList.innerHTML = '';
  history.forEach((item, index) => {
    const li = document.createElement('li');
    li.textContent = `${item.expression} = ${item.result}`;
    li.addEventListener('click', () => {
      inputBox.value = item.expression;
    });
    historyList.appendChild(li);
  });
}
