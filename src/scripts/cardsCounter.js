/**
 * Fish Cards Counter
 * Counts the number of unique "pages" (groups of species) based on the legacy URL pattern.
 */
async function fishCardsCounter() {
    let jsonData = [];
    try {
        const response = await fetch('../../../../src/data/data.json');
        if (!response.ok) throw new Error('Local fetch failed');
        jsonData = await response.json();
    } catch (e) {
        const response = await fetch('https://raw.githubusercontent.com/imc89/ABYSSEA-WEB/refs/heads/main/src/data/data.json');
        jsonData = await response.json();
    }

    const uniquePages = new Set();
    
    for (const item of jsonData) {
        if (item.url) {
            uniquePages.add(item.url);
        }
    }

    return uniquePages.size;
}
