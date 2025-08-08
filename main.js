// Cerrar ventana flotante de Kirby
document.getElementById('kirbyClose').onclick = function() {
    document.getElementById('kirbyFloat').style.display = 'none';
};

// Control de audio flotante
const audio = document.getElementById('beethovenAudio');
const audioToggle = document.getElementById('audioToggle');
const audioIcon = document.getElementById('audioIcon');

// Estado inicial del icono
window.addEventListener('DOMContentLoaded', () => {
    audio.volume = 0.7;
    audio.muted = false;
    audioIcon.classList.remove('fa-volume-up');
    audioIcon.classList.add('fa-volume-mute');
});

audioToggle.addEventListener('click', function() {
    if (audio.paused || audio.muted) {
        audio.muted = false;
        audio.play();
        audioIcon.classList.remove('fa-volume-mute');
        audioIcon.classList.add('fa-volume-up');
    } else {
        audio.muted = true;
        audio.pause();
        audioIcon.classList.remove('fa-volume-up');
        audioIcon.classList.add('fa-volume-mute');
    }
});

// --- Código de modal eliminado porque ya no existe en el HTML ---




