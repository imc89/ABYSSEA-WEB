// Método para crear la galería de especies Mesopelágicas.
// Method to create the Mesopelagic species gallery.
function table() {
  //Se crea un componente contenedor y se añade.
  //A container component is created and added.
  const imageContainer = document.createElement('div');
  document.body.appendChild(imageContainer);


  (async () => {
    // Llamamos al método del archivo cardsCounter que devuelve el número de cards que tenemos.
    // We call the cardsCounter file method that returns the number of cards we have.
    const counter = await fishCardsCounter();

    for (var i = 1; i <= counter; i++) {
      // Creamos un nuevo componente contenedor para la imagen de cada card.
      // We create a new container component for the image of each card.
      const imageDiv = document.createElement('div');
      // Agregamos propiedades flex, wrap, justify-center al contenedor principal.
      // We add flex, wrap, justify-center properties to the main container.
      imageContainer.style.display = 'flex';
      imageContainer.style.flexWrap = 'wrap'; 
      imageContainer.style.justifyContent = 'center';
      // Agregamos la clase glow a cada card.
      // We add the glow class to each card.
      imageDiv.className = 'glow-img-container'; 
      // Creamos un nuevo componente imagen para cada cada card.
      // We create a new image component for each card.
      const imageElement = document.createElement('img');
      // Asignamos las rutas de cada imagen.
      // We assign the paths of each image.
      imageElement.src = `../../../img/galleries/gallery_1/fishes_${i}.jpg`;
      // Damos propiedades a la imagen.
      // We give properties to the image.
      imageElement.className = 'glow-img'
      imageElement.style.margin = "20px"
      imageElement.style.width = '140px'
      imageElement.classList.add = "glow"
      // Agregamos los enlaces de redirección cuando pulsemos cada imagen.
      // We add the redirect links when we click each image.
      let imageURL = `./fishes/fishes_${i}.html`;
      // Agregamos una imagen por defecto en caso de no poder cargar alguna de ellas.
      // We add a default image in case we cannot load any of them.
      imageElement.onerror = () => {
        imageElement.onerror = null;
        imageElement.src = '../../../img/icons_and_labels/default_img.png';
        imageURL = '';
      };
      // Agregamos el evento de redirección a cada imagen.
      // We add the redirect event to each image.
      imageElement.addEventListener('click', () => {
        window.open(imageURL, '_self');
      });
      // Agregamos la imagen al div contenedor.
      // We add the image to the container div.
      imageDiv.appendChild(imageElement); 
      // Agregamos el div contenedor al div general.
      // We add the container div to the general div.
      imageContainer.appendChild(imageDiv);
    }

  })();
}
