const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');
let current = '';

function isOperator(char) {
  return ['+', '-', '*', '/' ].includes(char);
}

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    let value = btn.textContent;

    if (value === '×') {
      value = '*';
    } else if (value === '÷') {
      value = '/';
    }

    if(value === 'C') {
      current = '';
      display.textContent = '0';
    } else if (value === '=') {
      try {
        const result = math.evaluate(current);
        current = parseFloat(result.toFixed(10)).toString();
        display.textContent = current;
      } catch(e) {
        display.textContent = 'エラー';
        current = '';
      }
    } else if (value === '.') {
      const tokens = current.split(/[\+\-\*\/]/);
      const lastToken = tokens[tokens.length - 1];

      if (!lastToken.includes('.')) {
        if (current === '' || isOperator(current.slice(-1))) {
          current += '0.';
        } else {
          current += '.';
        }
        display.textContent = current;
      }
    } else {
      current += value;
      display.textContent = current;
    }
  });
});
