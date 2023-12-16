window.addEventListener("load", loadGameCards)

async function loadGameCards() {
    addPreloader()
    const url = "http://localhost:5257/cards"
    let offset = 0
    let quantity = 20

    await getCards(url, offset, quantity)
        .then(addCards)
        .then(removePreloader).then(showGameList)
        .catch(_ => {
                removePreloader()
                addLoadFailure()
            }
        )
}

function addLoadFailure() {
    let game_cards = document.getElementById("game_cards")
    let loadFailure = document.createElement("img")
    loadFailure.src = "imgs/dies-of-cringe-cringe.gif"
    loadFailure.id = "dies_of_cringe"
    game_cards.parentNode.insertBefore(loadFailure, game_cards)
}

function showGameList() {
    let game_cards = document.getElementById("game_cards")
    game_cards.classList.remove("game_cards_selection_hidden")
    game_cards.classList.add("game_cards_selection_shown")
}


function removePreloader() {
    let preloader = document.getElementById("cat_preloader_game_cards")
    preloader.remove()
}

function addPreloader() {
    let game_cards = document.getElementById("game_cards")
    let preloader = document.createElement("img")
    preloader.src = "imgs/reload-cat.gif"
    preloader.id = "cat_preloader_game_cards"
    game_cards.parentNode.insertBefore(preloader, game_cards)
}

async function getCards(url, offset, quantity) {
    const searchParams = new URLSearchParams({
        "offset": offset,
        "quantity": quantity
    })
    url = url + "?" + searchParams
    const response = await fetch(url,
        {
            method: "GET",
        }
    )
    return response.json()
}

function addCards(cards) {
    let cardsBlock = document.getElementById("game_cards")
    for (const card of cards) {

        let cardsTemplate = document.getElementById("game_card_template").cloneNode(true).content

        let link = cardsTemplate.querySelectorAll(".game_card__link")[0]
        let title = cardsTemplate.querySelectorAll(".game_card__text")[0]
        let image = cardsTemplate.querySelectorAll(".game_card__image")[0]

        link.href = card["url"]
        title.textContent = card["title"]
        image.src = card["imageUrl"]
        cardsBlock.appendChild(cardsTemplate)
    }
}

