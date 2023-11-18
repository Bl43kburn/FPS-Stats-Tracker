function domLoadtime() {
    return window.performance.timing.domContentLoadedEventEnd- window.performance.timing.navigationStart
}
function addPageLoadTime()
{
    let footer = document.querySelector("footer")
    let loadTimeElement = document.createElement('div')
    loadTimeElement.className = 'footer__loadTime'
    let text = document.createTextNode(`Page load time: ${domLoadtime() / 1000} s`)
    loadTimeElement.appendChild(text)
    footer.appendChild(loadTimeElement)
}

window.addEventListener("load", addPageLoadTime)
