let species = [];
let inputElem = null;
let resultsElem = null;
let activeIndex = -1;
let filteredResults = [];
let searchTimeout = null;

async function init() {
    inputElem = document.querySelector('#data');
    resultsElem = document.querySelector("#autocomplete-data");
    if (!inputElem || !resultsElem) return;

    // Intentar cargar localmente primero
    try {
        const response = await fetch('./src/data/data.json');
        if (!response.ok) throw new Error('Local fetch failed');
        species = await response.json();
    } catch (e) {
        console.warn('Cargando desde GitHub como respaldo...');
        const response = await fetch('https://raw.githubusercontent.com/imc89/ABYSSEA-WEB/refs/heads/main/src/data/data.json');
        species = await response.json();
    }

    inputElem.addEventListener("input", (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            handleSearch(e.target.value);
        }, 300); // 300ms debounce
    });

    inputElem.addEventListener("keydown", handleKeyDown);
    
    // Cerrar resultados al hacer clic fuera
    document.addEventListener("click", (e) => {
        if (!inputElem.contains(e.target) && !resultsElem.contains(e.target)) {
            hideResults();
        }
    });
}

function handleSearch(query) {
    if (query.length < 3) {
        hideResults();
        return;
    }

    const isLatin = document.getElementById('toggle')?.checked;
    const lang = window.sessionStorage.getItem('lang') || 'es';
    const searchTerm = query.toLowerCase();

    filteredResults = species.filter(fish => {
        if (isLatin) {
            return fish.latin && fish.latin.toLowerCase().includes(searchTerm);
        } else {
            const nameToSearch = (lang === 'en' ? fish.name : fish.nombre) || '';
            return nameToSearch.toLowerCase().includes(searchTerm);
        }
    }).slice(0, 10); // Limitar a 10 resultados

    renderResults();
}

function renderResults() {
    if (filteredResults.length === 0) {
        hideResults();
        return;
    }

    const lang = window.sessionStorage.getItem('lang') || 'es';
    const isLatin = document.getElementById('toggle')?.checked;

    resultsElem.innerHTML = filteredResults.map((fish, index) => {
        const displayText = isLatin ? fish.latin : (lang === 'en' ? (fish.name || fish.nombre) : (fish.nombre || fish.name));
        return `
            <li class="${index === activeIndex ? 'selected' : ''}" 
                onclick="selectFish('${displayText.replace(/'/g, "\\'")}')"
                onmouseover="activeIndex = ${index}; updateSelection()">
                ${displayText}
            </li>
        `;
    }).join('');

    resultsElem.classList.remove('hidden');
    resultsElem.classList.add('autocomplete-list');
}

function updateSelection() {
    const items = resultsElem.querySelectorAll('li');
    items.forEach((li, idx) => {
        if (idx === activeIndex) li.classList.add('selected');
        else li.classList.remove('selected');
    });
}

function handleKeyDown(e) {
    if (resultsElem.classList.contains('hidden')) {
        if (e.key === 'Enter' && typeof search === 'function') {
            search();
        }
        return;
    }

    if (e.key === 'ArrowDown') {
        e.preventDefault();
        activeIndex = (activeIndex + 1) % filteredResults.length;
        updateSelection();
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        activeIndex = (activeIndex - 1 + filteredResults.length) % filteredResults.length;
        updateSelection();
    } else if (e.key === 'Enter') {
        if (activeIndex > -1) {
            const isLatin = document.getElementById('toggle')?.checked;
            const lang = window.sessionStorage.getItem('lang') || 'es';
            const fish = filteredResults[activeIndex];
            const displayText = isLatin ? fish.latin : (lang === 'en' ? (fish.name || fish.nombre) : (fish.nombre || fish.name));
            selectFish(displayText);
        } else if (filteredResults.length > 0) {
            // Si no hay seleccionado pero hay resultados, cogemos el primero
            activeIndex = 0;
            const isLatin = document.getElementById('toggle')?.checked;
            const lang = window.sessionStorage.getItem('lang') || 'es';
            const fish = filteredResults[0];
            const displayText = isLatin ? fish.latin : (lang === 'en' ? (fish.name || fish.nombre) : (fish.nombre || fish.name));
            selectFish(displayText);
        }
    } else if (e.key === 'Escape') {
        hideResults();
    }
}

function selectFish(name) {
    inputElem.value = name;
    hideResults();
}

function hideResults() {
    resultsElem.classList.add('hidden');
    activeIndex = -1;
}

window.addEventListener('load', init);