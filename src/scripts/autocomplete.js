var species = [];
var inputElem = null;
var resultsElem = null;
var activeIndex = 0;
var filteredResults = [];

// Se inicializa el filtro de búsqueda con 'name'
// Initialise the search filter with 'name'.
var filterSearch = 'name';

function init() {

  fetch(`https://raw.githubusercontent.com/imc89/ABYSSEA-WEB/refs/heads/main/src/data/data.json`)
    .then((response) => response.json())
    .then((data) => (species = data));

  resultsElem = document.querySelector("#autocomplete-data");
  inputElem = document.querySelector('#data');

  resultsElem.addEventListener("click", (event) => {
    handleResultClick(event);
  });

  // Toma el input y oculta la lista cuando se pierde foco.
  // Takes input and hides the list when focus is lost.
  body = document.querySelector("body > div.flex-container");
  body.addEventListener("click", (event) => {
    inputElem.blur();
    hideResults();
  });

  // Dependiendo del toggle mandará un filtro y luego ejecutará una busqueda en el json.
  // Depending on the toggle it will send a filter and then execute a search on the json.
  inputElem.addEventListener("input", (event) => {
    if (document.getElementById('toggle').checked) {
      filterSearch = 'latin';
      autocomplete(event, 'latin');
    } else {
      filterSearch = 'name';
      autocomplete(event, 'name');
    }

  });
  inputElem.addEventListener("keyup", (event) => {
    handleResultKeyDown(event);
  });
}

function autocomplete(event, filterSearch) {
  // Cambio el font size del placeholder en caso de introducir 
  // Change placeholder font size when write to see bigger letters
  if (document.querySelector('#data').value === '') {
    document.querySelector('#data').style.fontSize = "11px";
  } else {
    document.querySelector('#data').style.fontSize = "13px";
  } const value = inputElem.value;

  if (!value) {
    hideResults();
    inputElem.value = "";
    return;
  }

  // En caso de que el filtro sea 'name' se hará una busqueda por nombres tanto en inglés como en español 
  // dependiendo de las coincidencias en la entrada del input.
  // In case the filter is 'name' it will search for names in both English and Spanish. 
  // depending on the matches with the input.

  if (filterSearch === 'name') {

    // Se limpia el array para evitar duplicados al hacer varias busquedas.
    // The array is cleaned to avoid duplicates when doing multiple searches.
    filteredResults = []

    // Recorremos species y generamos un array con las coincidencias de name y nombre.
    // Go through species and generate an array with the name and nombre matches .
    const lang = window.sessionStorage.getItem('lang');
    for (let fish of species) {
      if (value.length >= 3) {
        // if (fish.nombre.startsWith(value.toLowerCase()) && (!lang || lang == 'es')) {
        if (fish.nombre.includes(value.toLowerCase()) && (!lang || lang == 'es')) {

          filteredResults.push(fish.nombre)
        }
        // if (fish.name.startsWith(value.toLowerCase()) && (lang == 'en')) {
        if (fish.name.includes(value.toLowerCase()) && (lang == 'en')) {
          filteredResults.push(fish.name)
        }
      }
    }
  } else {
    // Se limpia el array para evitar duplicados al hacer varias busquedas.
    // The array is cleaned to avoid duplicates when doing multiple searches.
    filteredResults = []
    // Recorremos species y generamos un array con las coincidencias de latin.
    // Go through species and generate an array with the latin matches .
    for (let fish of species) {
      if (value.length >= 3) {
        // if (fish.latin.startsWith(value.toLowerCase())) {
        if (fish.latin.includes(value.toLowerCase())) {
          filteredResults.push(fish.latin)
        }
      }
    };
  }

  // Mapeo a través de los resultados para pintar el listado.
  // Map through the results to paint the list.
  resultsElem.innerHTML = filteredResults
    .map((result, index) => {
      const isSelected = index === 0;
      // En caso de que el dato sea desconocido, es decir, '-', no se muestra nada.
      // In case of unknown data '-', nothing is displayed.
      if (result !== '-') {
        return `
        <li
          id='autocomplete-result-${index}'
          class='autocomplete-result${isSelected ? " selected" : ""}'
          role='option'
          ${isSelected ? "aria-selected='true'" : ""}
        >
          ${result}
        </li>
      `;
      }
    })
    .join("");
  // En caso de que el dato sea desconocido, es decir, '-', no se muestra nada.
  // In case of unknown data '-', nothing is displayed.
  if (!filteredResults.length || filteredResults.includes('-')) {
    resultsElem.classList.add("hidden");
  } else {
    resultsElem.classList.remove("hidden");
  }
}

function handleResultClick(e) {
  if (e.target && e.target.nodeName === "LI") {
    selectItem(e.target);
  }
}
function handleResultKeyDown(event) {
  const { key } = event;
  const activeItem = this.getItemAt(activeIndex);
  if (activeItem) {
    activeItem.classList.remove('selected');
    activeItem.setAttribute('aria-selected', 'false');
  }
  switch (key) {
    case "Backspace":
      return;
    case "Escape":
      hideResults();
      inputElem.value = "";
      return;
    case "ArrowUp": {
      if (activeIndex === 0) {
        activeIndex = filteredResults.length - 1;
      }
      activeIndex--;
      break;
    }
    case "ArrowDown": {
      if (activeIndex === filteredResults.length - 1) {
        activeIndex = 0;
      }
      activeIndex++;
      break;
    }
    case "Enter": {
      // Se oculta el listado y se pierde foco del input;
      // The list is hidden and input focus is lost;
      hideResults();
      inputElem.blur();
      this.searcher();
      break;
    }
    default:
      selectFirstResult();
  }
  selectResult();
}
function selectFirstResult() {
  activeIndex = 0;
}

function selectResult() {
  const value = inputElem.value;
  const autocompleteValue = filteredResults[activeIndex];
  const activeItem = this.getItemAt(activeIndex);
  // if (activeItem) {
  //   activeItem.classList.add('selected');
  //   activeItem.setAttribute('aria-selected', 'true');
  // }
  // if (!value || !autocompleteValue) {
  //   return;
  // }
  // if (value !== autocompleteValue) {
  //   // Pinta el primer valor encontrado en el placeholder
  //   inputElem.value = autocompleteValue;
  //   inputElem.setSelectionRange(value.length, autocompleteValue.length);
  // }
}
function selectItem(node) {
  if (node) {
    inputElem.value = node.innerText;
    hideResults();
  }
}

function hideResults() {
  this.resultsElem.innerHTML = "";
  this.resultsElem.classList.add("hidden");
}

function getItemAt(index) {
  return this.resultsElem.querySelector(`#autocomplete-result-${index}`)
}

window.addEventListener('load', function () {
  init();
});