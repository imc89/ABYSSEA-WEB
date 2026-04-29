// Método para contar el número de cards a través del JSON.
// Method to count the number of cards through JSON.
async function fishCardsCounter() {
  // Hacemos la llamada al JSON.
  // We make the call to JSON.
  const response = await fetch(`https://raw.githubusercontent.com/imc89/ABYSSEA-WEB/refs/heads/main/src/data/data.json`);
  // Guardamos los datos del JSON.
  // We save the JSON data.
  const jsonData = await response.json();
  // Creamos un array vacío donde guardaremos los grupos.
  // We create an empty array where we will save the groups.
  let groups = {};
  // Recorremos los objetos del JSON.
  // We go through the JSON objects.
  for (const object of jsonData) {
    // Creamos grupo a través de la url del objeto.
    // We create group through the object url.
    let group = groups[object.url];
    // Si no existe el grupo lo creamos.
    // If the group does not exist, we create it.
    if (!group) {
      group = [];
      // En groups están los grupos como un objeto de arrays, donde la clave es la url y el valor el array de especies.
      // In groups there are the groups as an array object, where the key is the url and the value is the species array. 
      groups[object.url] = group;
    }
    group.push(object);
  }
  // Contamos las agrupaciones.
  // We count the groupings.
  const counter = Object.keys(groups).length;
  return counter;
}
