// Get the modal for regular projects
var projectModal = document.getElementById("projectModal");

// Get the close button for regular projects modal
var projectCloseSpan = projectModal.querySelector(".close-button");

// Get the web modal elements
var webModal = document.getElementById("webModal");
var webModalIframe = document.getElementById("webModalIframe");
var webModalTitle = document.getElementById("webModalTitle");
var webCloseButton = webModal.querySelector(".web-close-button");
var webFullscreenButton = webModal.querySelector(".web-fullscreen-button");


// Get all project cards
var projectCards = document.querySelectorAll(".project-card");

// When the user clicks on a project card, open the modal and populate content
projectCards.forEach(function(card) {
    card.addEventListener("click", function() {
        var modalType = this.getAttribute("data-modal-type");

        if (modalType === "web") {
            var url = this.getAttribute("data-url");
            var title = this.getAttribute("data-title");

            webModalTitle.innerText = title;
            webModalIframe.src = url; // Set the iframe source
            webModal.style.display = "flex"; // Use flex to center the content
        } else {
            // Logic for regular project cards (image/description modal)
            var title = this.getAttribute("data-title");
            var description = this.getAttribute("data-description");
            var image = this.getAttribute("data-image");

            document.getElementById("modalTitle").innerText = title;
            document.getElementById("modalDescription").innerText = description;
            document.getElementById("modalImage").src = image;

            projectModal.style.display = "flex";
        }
    });
});

// When the user clicks on <span> (x) for regular project modal, close it
projectCloseSpan.onclick = function() {
    projectModal.style.display = "none";
};

// When the user clicks on <span> (x) for web modal, close it
webCloseButton.onclick = function() {
    webModal.style.display = "none";
    webModalIframe.src = ""; // Clear iframe src to stop video/audio
    exitFullscreen(); // Ensure exiting fullscreen when closing
};

// When the user clicks anywhere outside of the modal content, close it
window.onclick = function(event) {
    if (event.target == projectModal) {
        projectModal.style.display = "none";
    }
    // Only close webModal if the target is the modal backdrop itself,
    // not elements inside web-modal-inner or iframe
    if (event.target == webModal) {
        webModal.style.display = "none";
        webModalIframe.src = ""; // Clear iframe src to stop video/audio
        exitFullscreen(); // Ensure exiting fullscreen when clicking outside
    }
};

// --- Fullscreen functionality for Web Modal ---

webFullscreenButton.addEventListener("click", function() {
    toggleFullscreen();
});

// Function to toggle fullscreen mode
function toggleFullscreen() {
    if (document.fullscreenElement) { // If already in fullscreen
        exitFullscreen();
    } else { // If not in fullscreen
        enterFullscreen(webModal); // Request fullscreen for the web modal
    }
}

// Function to enter fullscreen for a given element
function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) { /* Firefox */
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) { /* IE/Edge */
        element.msRequestFullscreen();
    }
    webModal.classList.add('fullscreen'); // Add class for CSS styling
}

// Function to exit fullscreen
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { /* Firefox */
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { /* Chrome, Safari & Opera */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE/Edge */
        document.msExitFullscreen();
    }
    webModal.classList.remove('fullscreen'); // Remove class for CSS styling
}

// Listen for fullscreen change events (e.g., user presses Escape key)
document.addEventListener('fullscreenchange', handleFullscreenChange);
document.addEventListener('mozfullscreenchange', handleFullscreenChange);
document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
document.addEventListener('msfullscreenchange', handleFullscreenChange);

function handleFullscreenChange() {
    if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
        // If no element is in fullscreen, ensure our modal's class is removed
        webModal.classList.remove('fullscreen');
    } else {
        // If an element is in fullscreen, ensure our modal has the class (in case it was triggered externally)
        if (webModal.contains(document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement)) {
             webModal.classList.add('fullscreen');
        }
    }
}