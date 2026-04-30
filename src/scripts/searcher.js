function search() {
    const searchInput = document.querySelector("#data").value;
    if (searchInput) {
        searcher();
    }
}

async function searcher() {
    const input = document.querySelector("#data");
    if (!input) return;

    const data = input.value.trim().toLowerCase();
    const jsonData = await fetchSpeciesFor();

    for (const fish of jsonData) {
        const match =
            (fish['nombre'] && fish['nombre'].toLowerCase() === data) ||
            (fish['name'] && fish['name'].toLowerCase() === data) ||
            (fish['latin'] && fish['latin'].toLowerCase() === data);

        if (match) {
            // Extraer el ID de la URL legacy (ej: fishes_4.html -> 4)
            const url = fish['url'] || '';
            const matchId = url.match(/fishes_(\d+)\.html/);
            
            if (matchId && matchId[1]) {
                const pageId = matchId[1];
                // Redirigir a la nueva arquitectura
                window.location.href = `./src/galleries/gallery_1/fishes/fishes.html?id=${pageId}`;
            } else {
                // Fallback si no se encuentra el patrón
                window.location.href = url;
            }
            return;
        }
    }
}

async function fetchSpeciesFor() {
    try {
        // Intento local primero
        const response = await fetch('./src/data/data.json');
        if (!response.ok) throw new Error('Local fetch failed');
        return await response.json();
    } catch (e) {
        // Respaldo GitHub
        const response = await fetch(`https://raw.githubusercontent.com/imc89/ABYSSEA-WEB/refs/heads/main/src/data/data.json`);
        return await response.json();
    }
}