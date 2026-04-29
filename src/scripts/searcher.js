function search() {
    // Se guarda en searchInput el valor del input de búsqueda, si existe valor se llama al método searcher.
    // The value of the search input is saved in searchInput, if value exists, the searcher method is called.
    const searchInput = document.querySelector("#data").value;
    if (searchInput) {
        searcher();
    }
}

async function searcher() {
    // Se comprueba que hay un componente input.
    // Checks that there is an input component.
    const input = document.querySelector("#data");
    if (input) {
        const data = input.value;
        // Se guardan los datos del archivo JSON en jsonData. 
        // The data of the JSON file is saved in jsonData.
        const jsonData = await fetchSpeciesFor();

        // Se recorre el JSON y se busca la URL coincidente al nombre de búsqueda para redireccionar.
        // The JSON is traversed and the URL matching the search name is searched to redirect.
        for (var i = 0; i < jsonData.length; i++) {
            if (jsonData[i]['nombre'] == data) {
                window.location.href = jsonData[i]['url'];
            } else if (jsonData[i]['name'] == data) {
                window.location.href = jsonData[i]['url'];
            } else if (jsonData[i]['latin'] == data) {
                window.location.href = jsonData[i]['url'];
            } else if (jsonData[i]['id'] == data) {
                window.location.href = jsonData[i]['url'];
            }

        }
    }
}

async function fetchSpeciesFor() {
    const response = await fetch(`https://raw.githubusercontent.com/imc89/ABYSSEA-WEB/refs/heads/main/src/data/data.json`);
    return await response.json();
}