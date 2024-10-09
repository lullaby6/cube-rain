screen.orientation.lock('portrait');

document.addEventListener("orientationchange", event => {
    switch(window.orientation) {
        case -90: case 90:
            /* Device is in landscape mode */
            break;
        default:
            /* Device is in portrait mode */
    }
});

function checkOrientation() {
    if (window.innerHeight > window.innerWidth) {
        document.body.style.transform = "none";
    } else {
        document.body.style.transform = "rotate(90deg) translate(0, -100vw)";
    }
}

window.addEventListener("resize", checkOrientation);
window.addEventListener("orientationchange", checkOrientation);

checkOrientation();