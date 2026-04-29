async function jsonInfo(info_json) {
  const response = await fetch(info_json);
  const jsonData = await response.json();
  openModal(jsonData);
}

function openModal(info_json) {
  // Get the modal
  var modalContainer = document.getElementById("modal-container");

  // Get the button that opens the modal

  // Get the <span> element that closes the modal

  const modalContent = document.getElementById('modal-content');

  modalContent.innerHTML = `
<div style="text-align: center; position: absolute; top: 0; left: 0; max-width: 100%; width: 100%; height: 100%; overflow: auto;">
  <div class="modal-content-inner" style="height: 100%; overflow-y: auto;">
    <h2 style="color: white; font-style: bold; text-align: center;">${info_json.name.toUpperCase()}</h2>
    <img src="${info_json.img_1}" class="glow-img card-img" style="display: block; margin: 0 auto; margin-top: 30px; width="325"/>
    <p style="color: white; text-align: justify; padding:10px">${info_json.info_1}</p>
    <hr>
    <p style="color: white; text-align: justify; padding:10px">${info_json.info_2}</p>
    <hr>
    <p style="color: white; text-align: justify; padding:10px">${info_json.info_3}</p>
  </div>
</div>
`;

  // When the user clicks the button, open the modal 
  modalContainer.style.display = "block";
  window.scrollTo(0, 0);

  // When the user clicks anywhere outside of the modal, close it
  // Close the modal on click outside
  modalContainer.addEventListener('click', (event) => {
    document.body.style.overflow = ''; // Re-enable scrolling for the main page
    modalContainer.style.display = 'none';
  });
}