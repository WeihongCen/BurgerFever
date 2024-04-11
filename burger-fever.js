/**
 * @author Weihong Cen
 * @date 05/13/2023
 * 
 * This is the JavaScript that manages the game and card states in the SETS! 
 * website.
 */
(function() {
    "use strict";

    const INGREDIENTS = ["top-bun", "pickles", "cheese", "patty", "onion", "tomato", "lettuce", "bottom-bun"];
    const SLICES = ["pickles", "cheese", "patty", "onion", "tomato", "lettuce"];
    const ASSEMBLY = id("assembly")

    function init() {
        const START_BUTTON = id("start-btn");
        const BACK_BUTTON = id("back-btn");
        START_BUTTON.addEventListener("click", start);
        BACK_BUTTON.addEventListener("click", toggleView);
        populateCards();
    }
    
    function start() {
        generateOrder();
        populateCards();
        toggleView();
    }

    /**
     * Toggles visibility of menu and game.
     */
    function toggleView() {
        const MENU_VIEW = id("menu-view");
        const GAME_VIEW = id("game-view");
        MENU_VIEW.classList.toggle("hidden");
        GAME_VIEW.classList.toggle("hidden");
    }

    function generateOrder() {
        let order = id("order");
        order.innerHTML = '';
        let ingredientCount = 4 + Math.floor(5 * Math.random());

        for (let i = 0; i < ingredientCount; i++) {
            let ingredient = document.createElement("p");
            if (i == 0) {
                ingredient.innerText = "Top bun";
            } else if (i == ingredientCount - 1) {
                ingredient.innerText = "Bottom bun";
            } else {
                let sliceName = SLICES[Math.floor(SLICES.length * Math.random())];
                ingredient.innerText = sliceName;
            }
            order.appendChild(ingredient);
        }
    }
    
    function populateCards() {
        let ingredientsList = id("ingredient-list");
        ingredientsList.innerHTML = '';
        for (let i = 0; i < INGREDIENTS.length; i++) {
            let ingredientCard = document.createElement("div");
            ingredientCard.classList.add("ingredient-card");

            let ingredientName = document.createElement("strong");
            ingredientName.textContent = INGREDIENTS[i].replace('-', ' ');

            let imgContainer = document.createElement("div");
            imgContainer.classList.add("img-container");

            let ingredientImg = document.createElement("img");
            ingredientImg.classList.add("ingredients");
            ingredientImg.src = `imgs/${INGREDIENTS[i]}.png`;
            ingredientImg.alt = INGREDIENTS[i];

            ingredientCard.appendChild(ingredientName);
            imgContainer.appendChild(ingredientImg);
            ingredientCard.appendChild(imgContainer);
            ingredientCard.addEventListener("click", () => {
                addIngredient(INGREDIENTS[i])
            });

            ingredientsList.appendChild(ingredientCard);
            
        }
    }

    function addIngredient(ingredient) {
        let ingredientImg = document.createElement("img");
        ingredientImg.classList.add("ingredient");
        ingredientImg.src = `imgs/${ingredient}.png`;
        ingredientImg.alt = ingredient;
        ingredientImg.addEventListener("click", () => {
            ingredientImg.remove();
        });

        ASSEMBLY.appendChild(ingredientImg);
    }

    init();
})();