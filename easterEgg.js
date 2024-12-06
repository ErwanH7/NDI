document.addEventListener('DOMContentLoaded', function () {
    const button = document.getElementById('invisibleButton');
    const overlay = document.getElementById('overlay');
    const closeButton = document.getElementById('closeOverlay');

    // Lorsque le bouton invisible est cliqué
    button.addEventListener('click', function () {
        overlay.style.display = 'flex';  // Afficher l'overlay
    });

    // Fermer l'overlay lorsque l'utilisateur clique sur le bouton "Fermer"
    closeButton.addEventListener('click', function () {
        overlay.style.display = 'none';  // Cacher l'overlay
    });

    // Fermer l'overlay si l'utilisateur clique en dehors de l'image
    overlay.addEventListener('click', function (event) {
        if (event.target === overlay) {
            overlay.style.display = 'none';
        }
    });
});
