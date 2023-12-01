(() => {
    load_news()
})()

function show_news_submission_form()
{
    document.getElementsByClassName("background_blur_block")[0].classList.add("background_blur_block_visible")
}

function hide_news_submission_form()
{
    document.getElementsByClassName("background_blur_block")[0].classList.remove("background_blur_block_visible")
}

document.getElementById("submit_news").addEventListener("click", ev => {
    show_news_submission_form()
})
document.getElementById("blur_block").addEventListener("click", hide_news_submission_form)

document.getElementById("submit_news_form_block").addEventListener("click", ev => {
    ev.stopPropagation()
})


function load_news() {
    let news = JSON.parse(localStorage.getItem("news"))
    if (news == null) {
        news = []
    }
    const feed = document.getElementsByClassName("news_feed__block")[0]
    for (let i = 0; i < news.length; i++) {
        let loadedNews = load_singular_news(news[i])
        feed.appendChild(loadedNews)
    }
}

function load_singular_news(newsJsonElement) {
    let newsTemplate = document.getElementById("news_feed_element")
    let templateCopy = newsTemplate.content.cloneNode(true)

    let link = templateCopy.querySelectorAll("a")[0]
    link.href = newsJsonElement["link"]

    let title = templateCopy.querySelectorAll("h3")[0]
    title.textContent = newsJsonElement["title"]

    let description = templateCopy.querySelectorAll(".news_feed__description")[0]
    description.textContent = newsJsonElement["description"]

    let image = templateCopy.querySelectorAll(".news_feed__picture")[0]
    image.src = newsJsonElement["image"]

    return templateCopy
}

function add_news() {
    let news = JSON.parse(localStorage.getItem("news"))
    if (news == null) {
        news = []
    }

    let formInput = document.getElementById("news_form_submit")
    if (formInput.checkValidity() === false) {
        alert("Invalid input on form")
        return;
    }


    let title = formInput.querySelector('[name="news_title"]').value

    let newNews = {
        "title": title,
        "description": formInput.querySelector('[name="news_description"]').value,
        "link": formInput.querySelector('[name="news_link"]').value,
        "image": formInput.querySelector('[name="image"]').value
    }

    const feed = document.getElementsByClassName("news_feed__block")[0]
    let newNewsEntry = load_singular_news(newNews)
    feed.appendChild(newNewsEntry)


    news.push(newNews)
    localStorage.setItem("news", JSON.stringify(news))
}

document.getElementById("add_news_button").addEventListener("click", ev => {
    add_news()
    hide_news_submission_form()
})