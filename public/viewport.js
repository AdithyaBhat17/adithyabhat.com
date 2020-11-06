const viewport = document.getElementById('viewport-meta')
const viewports = {
    default: viewport.getAttribute('content'),
    landscape: 'width = 2560',
    portrait: 'width = 768'
}
const setViewport = function () {
    screen.width > 2560 ?
        viewport.setAttribute('content', viewports.landscape) :
        (screen.width >= 768 && screen.width < 1200) ?
            viewport.setAttribute('content', viewports.portrait) :
            viewport.setAttribute('content', viewports.default)
}
setViewport()
window.onresize = function () {
    setViewport()
}