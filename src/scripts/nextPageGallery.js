(async () => {
    await new Promise((resolve) => {
        (async () => {
            const counter = await fishCardsCounter();

            document.addEventListener("keydown", function (e) {
                const url = window.location.href;
                let numberPage;
                if (e.key === "ArrowDown") {
                    if (url.includes('fishes_')) {
                        numberPage = +window.location.href.split('fishes_')[1].replace(/[^0-9]+/g, "");
                        if (numberPage < counter) {
                            numberPage++;
                            location.href = `./fishes_${numberPage}.html`;
                        }
                    }
                } else if (e.key === "ArrowUp") {
                    if (url.includes('fishes_')) {
                        numberPage = +window.location.href.split('fishes_')[1].replace(/[^0-9]+/g, "");
                        if (numberPage) {
                            numberPage--;
                            if (numberPage >= 1) {
                                location.href = `./fishes_${numberPage}.html`;
                            }

                        }
                    }
                }

            });

        })();

    });
})();
