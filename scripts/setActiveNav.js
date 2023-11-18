function getCurrentNavButton()
{
    const currentHref = document.location.href.split('?')[0]


    const navList = document.querySelector(".navigation__list")
    const navButtons = navList.children

    let targetButton = null

    for (let listElement of navButtons)
    {
        const button =  listElement.getElementsByClassName("navigation__element")[0]
        if (button == null) { alert("DOM is loaded improperly"); break }
        if (button.href === currentHref) {
            targetButton = button
            break
        }

    }

    if (targetButton == null) {
        alert("Undefined link")
        return
    }

    targetButton.classList.add('navigation__element__active')
}

window.addEventListener('load', getCurrentNavButton)