const container = document.getElementById('container');
const colmunsEl = document.getElementById('columns');
const rowsEl = document.getElementById('rows');
const colorsEl = document.getElementById('colors');
const colorsObj = {
	'purplish': ['#6a1ca1', '#CA2996', '#92208E', '#4C1981'],
	'redish': ['#f9d5bb', '#f66767', '#d35656', '#3c3d47'],
	'greenish': ['#42b883', '#347474', '#35495e', '#ff7e67'],
	'brownish': ['#a64a39', '#693d3d', '#ba5536', '#a43820'],
	'blueish': ['#00487C', '#4BB3FD', '#0496FF', '#027BCE']
}

let colors = [...colorsObj.redish];
const checkboxes = document.querySelectorAll('.checkbox');
let choices = ["symbol-01"];

checkboxes.forEach(checkbox => {
  checkbox.addEventListener('change', (e) => {
    choices = [];
    for(let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) {
        choices.push(checkboxes[i].name);
      }
      }
      generateRows();
    })

});

const symbolEl = document.getElementById('symbols');
let symbol = [...symbolEl.value];

let selectedOptions = ["symbol-03", "symbol-04", "symbol-05", "symbol-06", "symbol-07", "symbol-08", "symbol-09", "symbol-10"];
symbolEl.addEventListener('change', (e) => {
  selectedOptions = [...symbolEl.options].filter(o => o.selected).map(o => o.value);
  console.log(selectedOptions);
  generateRows()
});
let columns = 7;
colmunsEl.addEventListener('change', (e) => {
  console.log(columns);
  columns = e.target.value;
  generateRows()
});

let rows = 7;
rowsEl.addEventListener('change', (e) => {
  console.log(rows);
  rows = e.target.value;
  generateRows()
});

colorsEl.addEventListener('change', (e) => {
  for (let key in colorsObj) {
    if (key === e.target.value) {
      colors = [...colorsObj[key]];
      generateRows()
      flip();
    }
  }
});

const randomColor = document.getElementById('random-color');
randomColor.addEventListener('click', () => {
  const symbols = document.querySelectorAll('.symbol');
  symbols.forEach(symbol => {
    symbol.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
  });
});



const flipPattern = document.getElementById('flip-pattern');
flipPattern.addEventListener('click', flip);

// generate symbol based on the selected options
function generateSymbol() {
  container.innerHTML = '';
  // loop through columns number and create symbols based on the selected options
  for (let i = 0; i < columns; i++) {
    // per column loop through selected options and create symbols inside a div container called column
    const column = document.createElement('div');
    column.classList.add('column');
    container.appendChild(column);

    for (let j = 0; j < selectedOptions.length; j++) {
      const symbol = document.createElement("img");
      symbol.classList.add("symbol");
      symbol.src = `symbols/${selectedOptions[j]}.svg`;
      document.body.appendChild(symbol);
      for (let key in colorsObj) {
        if (key === colorsEl.value) {
          colors = [...colorsObj[key]];
          symbol.style.backgroundColor = colors[j % colors.length];
        }
      }
      column.appendChild(symbol);
    }
   
  }
}

function generateRows() {
  container.innerHTML = '';
  let symbolIndex = 0;
  for (let i = 0; i < rows; i++) {
    const row = document.createElement('div');
    row.classList.add('row');
    container.appendChild(row);
    for (let i = 0; i < columns; i++) {

        const symbol = document.createElement("img");
        symbol.classList.add("symbol");
        symbol.src = `symbols/${choices[symbolIndex]}.svg`;
        document.body.appendChild(symbol);
        for (let key in colorsObj) {
          if (key === colorsEl.value) {
            colors = [...colorsObj[key]];
            symbol.style.backgroundColor = colors[symbolIndex % colors.length];
          }
        }
        row.appendChild(symbol);
        symbolIndex++;
        if (symbolIndex >= choices.length) {
          symbolIndex = 0;
        }
    }
  }
}

function flip() {
  const symbols = document.querySelectorAll('.symbol');
  symbols.forEach(symbol => {
    symbol.style.transform = `rotate(${Math.floor(Math.random() * 4) * 90}deg)`;
  });
}
generateRows();