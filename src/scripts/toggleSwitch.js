function toggleSwitch() {
    if (document.getElementById('toggle').checked) {
        document.querySelector('.toggle-label-latin').classList.add("glow");
        document.querySelector('.toggle-label-common').classList.remove("glow");
    } else {
        document.querySelector('.toggle-label-common').classList.add("glow");   
        document.querySelector('.toggle-label-latin').classList.remove("glow");
    }
}