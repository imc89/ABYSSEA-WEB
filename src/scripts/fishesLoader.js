async function loadFishesPage() {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id')) || 1;
    
    // Use pagesData from pages.js
    const pages = typeof pagesData !== 'undefined' ? pagesData : [];
    
    const pageData = pages.find(p => p.pageId === id);
    if (!pageData) {
        console.error('Page not found');
        return;
    }
    
    // Populate page info
    document.title = pageData.title;
    document.getElementById('page-h1').textContent = pageData.h1;
    
    // Parse description to allow HTML if necessary, or just text.
    // The previous description had some HTML tags (like <br> possibly), but textContent is safer.
    // Wait, the extracted desc is pure text except maybe formatting. We use innerHTML to be safe.
    document.getElementById('page-desc').innerHTML = pageData.desc;
    
    document.getElementById('main-img').src = pageData.mainImg;
    
    if (pageData.subImg) {
        document.getElementById('sub-img-container').style.display = 'block';
        document.getElementById('sub-img').src = pageData.subImg;
        document.getElementById('sub-img-text').innerHTML = pageData.subImgText;
    } else {
        document.getElementById('sub-img-container').style.display = 'none';
    }
    
    // Handle previous/next buttons
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    if (id > 1) {
        prevBtn.onclick = () => window.location.href = `fishes.html?id=${id - 1}`;
        prevBtn.disabled = false;
    } else {
        prevBtn.disabled = true;
    }
    
    if (id < pages.length) {
        nextBtn.onclick = () => window.location.href = `fishes.html?id=${id + 1}`;
        nextBtn.disabled = false;
    } else {
        nextBtn.disabled = true;
    }

    // Keyboard navigation
    window.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowUp' && !prevBtn.disabled) {
            prevBtn.click();
        } else if (e.key === 'ArrowDown' && !nextBtn.disabled) {
            nextBtn.click();
        }
    });
    
    // Fetch fishes data from github to avoid local CORS issues
    const dataRes = await fetch('https://raw.githubusercontent.com/imc89/ABYSSEA-WEB/refs/heads/main/src/data/data.json');
    const allFishes = await dataRes.json();
    
    // Filter fishes for this page using the original url from data.json
    const targetUrl = `fishes_${id}.html`;
    const pageFishes = allFishes.filter(fish => fish.url && fish.url.includes(targetUrl));
    
    const namesList = document.getElementById('names-list');
    namesList.innerHTML = ''; // Clear
    
    pageFishes.forEach((fish, index) => {
        const div = document.createElement('div');
        div.className = 'name-info';
        // Note: the original code had urls to raw github usercontent json files.
        // Let's keep the same structure: calling jsonInfo with the url.
        // We need the filename from github. The original had:
        // https://raw.githubusercontent.com/imc89/ABYSSEA-WEB/refs/heads/main/src/data/species-data/${id}_${latin}.json
        // Wait, looking at fishes_1.html, it was:
        // jsonInfo('https://raw.githubusercontent.com/imc89/ABYSSEA-WEB/refs/heads/main/src/data/species-data/1_paramyxine_atami.json')
        // We can just construct it, or use the local one since we are making it dynamic?
        // Let's use local if possible, but to match original we'll use local src/data/species-data/...
        // Actually, what was the parameter in data.json? 
        // data.json has: "latin": "paramyxine atami", "id": "01" (but it's padded to 2 digits? actually wait, let's look at data.json)
        // In data.json: id is "01", "02".
        // Let's reconstruct the file name based on data.json.
        // Wait, `1_paramyxine_atami.json`
        const fishIdNum = parseInt(fish.id); 
        const latinName = fish.latin ? fish.latin.replace(/\s+/g, '_') : '';
        const jsonUrl = `https://raw.githubusercontent.com/imc89/ABYSSEA-WEB/refs/heads/main/src/data/species-data/${fishIdNum}_${latinName}.json`;
        
        div.onclick = () => jsonInfo(jsonUrl);
        
        div.innerHTML = `
            ${index + 1}. ${fish.nombre ? fish.nombre.charAt(0).toUpperCase() + fish.nombre.slice(1) : ''}<br>
            <i>　${fish.name || ''}</i><br>
            <i>　${fish.latin ? fish.latin.charAt(0).toUpperCase() + fish.latin.slice(1) : ''}</i><br>
            　${fish.length || ''}<br><br>
        `;
        namesList.appendChild(div);
    });
}
