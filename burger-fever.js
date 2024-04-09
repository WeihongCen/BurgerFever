/**
 * @author Weihong Cen
 * @date 05/13/2023
 * 
 * This is the JavaScript that manages the game and card states in the SETS! 
 * website.
 */
(function() {
    "use strict";

    const INGREDIENTS = ["bottom-bun", "cheese", "lettuce", "onion", "patty", 
        "pickles", "tomato", "top-bun"];

    function init() {
        const START_BUTTON = qs("#start-btn");
        START_BUTTON.addEventListener("click", start);
        populateCards();
    }
    
    function start() {
        populateCards();
        toggleView();
    }

    /**
     * Toggles visibility of menu and game.
     */
    function toggleView() {
        const MENU_VIEW = qs("#menu-view");
        const GAME_VIEW = qs("#game-view");
        MENU_VIEW.classList.toggle("hidden");
        GAME_VIEW.classList.toggle("hidden");
    }
    
    function populateCards() {
        let ingredientsList = qs("#ingredient-list");
        for (let i = 0; i < INGREDIENTS.length; i++) {
            var ingredientCard = document.createElement("div");
            ingredientCard.classList.add("ingredient-card");

            var ingredientName = document.createElement("strong");
            ingredientName.textContent = INGREDIENTS[i];

            var imgContainer = document.createElement("div");
            imgContainer.classList.add("img-container");

            var ingredientImg = document.createElement("img");
            ingredientImg.classList.add("ingredients");
            ingredientImg.src = `imgs/${INGREDIENTS[i]}.png`;
            ingredientImg.alt = INGREDIENTS[i];

            ingredientCard.appendChild(ingredientName);
            imgContainer.appendChild(ingredientImg);
            ingredientCard.appendChild(imgContainer);
            ingredientsList.appendChild(ingredientCard);
        }
    }

    init();
})();