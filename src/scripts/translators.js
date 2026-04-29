// La configuración regional que muestra nuestra aplicación.
// The locale displayed by our application.
let defaultLocale = "es";
// La configuración regional activa.
// The active locale.
let locale;

// Cuando el contenido de la página esté listo...
// When the page content is ready...
document.addEventListener("DOMContentLoaded", () => {
    // Traducir la página a la configuración regional por defecto.
    // Translate the page to the default locale.
    if (defaultLocale) {
        defaultLocale = window.sessionStorage.getItem('lang');
        if (defaultLocale) {
            bindLocaleSwitcher(defaultLocale);
        } else {
            bindLocaleSwitcher('es');
        }
    }
    setLocale(defaultLocale);
});

// Cargar traducciones para la localización elegida y traducir la página.
// Load translations for the chosen localisation and translate the page.
async function setLocale(newLocale) {
    let save_lang = document.querySelector("select");
    if (save_lang) {
        if (save_lang.value) {
            newLocale = save_lang.value;
        }
    }
    if (newLocale === locale) return;
    const newTranslations =
        await fetchTranslationsFor(newLocale);
    locale = newLocale;
    translations = newTranslations;
    translatePage();
}

// Recuperar traducciones del objeto JSON para la configuración regional escogida.
// Retrieve translations of the JSON object for the chosen locale.
async function fetchTranslationsFor(newLocale) {
    const response = await fetch(`https://raw.githubusercontent.com/imc89/ABYSSEA-WEB/refs/heads/main/src/locales/${newLocale}.json`);
    return await response.json();
}

//Sustituir el texto de cada elemento con atributo data-i18n-key por la traducción correspondiente a su data-i18n-key.
//Replace the text of each element with attribute data-i18n-key by the translation corresponding to its data-i18n-key.
function translatePage() {
    document
        .querySelectorAll("[data-i18n-key]")
        .forEach(translateElement);
}

// Sustituye el texto del elemento por la traducción correspondiente a la clave data-i18n-key del elemento.
// Replaces the element's text with the translation corresponding to the element's data-i18n-key.
function translateElement(element) {
    const key = element.getAttribute("data-i18n-key");
    const translation = translations[key];
    element.innerText = translation;
    // placeholders translations
    if (document.querySelector('#data')) {
        if (locale === "es") {
            document.querySelector('#data').style.fontSize = "13px";
            document.querySelector('#data').placeholder = "¿Qué especie deseas buscar?";
        }
        else {
            document.querySelector('#data').style.fontSize = "11px";
            document.querySelector('#data').placeholder = "What species are you looking for?";
        }
    }
}

// Cada vez que el usuario selecciona un nuevo idioma cargamos las traducciones y actualizamos la página.
// Each time the user selects a new language we load the translations and refresh the page.
function bindLocaleSwitcher(initialValue) {
    const switcher = document.querySelector("[data-i18n-switcher]");
    if (switcher) {
        switcher.value = initialValue;
        switcher.onchange = (e) => {
            // Establecer la configuración regional a la opción seleccionada.
            // Set the locale settings to the selected option.
            setLocale(e.target.value);
            window.sessionStorage.setItem('lang', e.target.value);
        };
    }
}