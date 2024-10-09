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