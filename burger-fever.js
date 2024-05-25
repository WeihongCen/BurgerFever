/**
 * @author Weihong Cen, Andrew Huang
 * @date 05/13/2024
 * 
 * This is the JavaScript that manages the game and card states.
 */
(function() {
    "use strict";

    const EASY_INGREDIENTS = ["top-bun", "cheese", "patty", "bottom-bun"];
    const HARD_INGREDIENTS = ["top-bun", "pickles", "cheese", "patty", "onion", 
        "tomato", "lettuce", "bottom-bun"];
    const EASY_SLICES = EASY_INGREDIENTS.slice(1, EASY_INGREDIENTS.length-1);
    const HARD_SLICES = HARD_INGREDIENTS.slice(1, HARD_INGREDIENTS.length-1);
    const ASSEMBLY = id("assembly");
    const ORDER = id("order");
    let score = 0;
    let timerID = null;
    let secondsRemaining = null;
    let currBurger = [];
    let currOrder = [];
    let orderCompleted = false;

    function init() {
        const START_BUTTON = id("start-btn");
        const BACK_BUTTON = id("back-btn");
        START_BUTTON.addEventListener("click", start);
        BACK_BUTTON.addEventListener("click", back);
    }
    
    function start() {
        score = 0;
        orderCompleted = false;
        ASSEMBLY.innerHTML = "";
        updateScore();
        generateOrder();
        populateCards();
        initHUD();
        toggleView();
    }
    
    function back() {
        stop();
        toggleView();
    }

    function stop() {
        clearInterval(timerID);
        orderCompleted = true;
    }

    /**
     * Convert seconds to MM:SS format
     * @param {Number} seconds
     * @returns {String}
     */
    function convertTime(seconds) {
        let min = Math.floor(seconds / 60);
        let sec = seconds % 60;
        let dispMin = String(min);
        let dispSec = String(sec);
        if (min < 0) {
            dispMin = "00";
        } else if (min < 10) {
            dispMin = "0" + dispMin;
        }
        if (sec < 0) {
            dispSec = "00";
        } else if (sec < 10) {
            dispSec = "0" + dispSec;
        }
        return dispMin + ":" + dispSec;
    }

    function initHUD() {
        let timer = id("timer");
        secondsRemaining = Number(qs(".difficulty select").value);
        timer.innerHTML = convertTime(secondsRemaining);
        timerID = setInterval(advanceTimer, 1000);
    }

    /**
     * Decrement the timer and stop the game when it hits 0.
     */
    function advanceTimer() {
        let timer = id("timer");
        secondsRemaining--;
        timer.innerHTML = convertTime(secondsRemaining);
        if (secondsRemaining <= 0) {
            stop();
        }
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

    /**
     * Generates a random order based on the difficulty level. The first 
     * ingredient in the order will always be “Top Bun”, and the last ingredient 
     * in the order will always be “Bottom Bun”.
     */
    function generateOrder() {
        currOrder = [];
        ORDER.innerHTML = '';
        ORDER.classList.remove("correct-order");

        let difficulty = qs(".difficulty .selected").value;
        let num_extra = 2;
        let slices = EASY_SLICES;
        if (difficulty == "hard") {
            slices = HARD_SLICES;
            num_extra = 4;
        }
        let ingredientCount = 4 + Math.floor(num_extra * Math.random());

        for (let i = 0; i < ingredientCount; i++) {
            let ingredient = document.createElement("p");
            let sliceName = "";
            if (i == 0) {
                ingredient.textContent = "top bun";
                sliceName = "top-bun";
            } else if (i == ingredientCount - 1) {
                ingredient.textContent = "bottom bun";
                sliceName = "bottom-bun";
            } else {
                sliceName = slices[Math.floor(slices.length * Math.random())];
                ingredient.textContent = sliceName;
            }
            ORDER.appendChild(ingredient);
            currOrder.push(sliceName);
        }
        currOrder = currOrder.reverse();
    }
    
    /**
     * Populates the ingredient list section with the number of ingredient
     * cards based on the difficulty level. Calls addIngredient function when
     * an ingredient card is clicked.
    */
    function populateCards() {
        let difficulty = qs(".difficulty .selected").value;
        let ingredients = EASY_INGREDIENTS;
        if (difficulty == "hard") {
            ingredients = HARD_INGREDIENTS;
        }
        let ingredientsList = id("ingredient-list");
        ingredientsList.innerHTML = '';
        for (let i = 0; i < ingredients.length; i++) {
            let ingredientCard = document.createElement("div");
            ingredientCard.classList.add("ingredient-card");

            let ingredientName = document.createElement("strong");
            ingredientName.textContent = ingredients[i].replace('-', ' ');

            let imgContainer = document.createElement("div");
            imgContainer.classList.add("img-container");

            let ingredientImg = document.createElement("img");
            ingredientImg.classList.add("ingredients");
            ingredientImg.src = `imgs/${ingredients[i]}.png`;
            ingredientImg.alt = ingredients[i];

            ingredientCard.appendChild(ingredientName);
            imgContainer.appendChild(ingredientImg);
            ingredientCard.appendChild(imgContainer);
            ingredientCard.addEventListener("click", () => {
                addIngredient(ingredients[i])
            });

            ingredientsList.appendChild(ingredientCard);
            
        }
    }

    /**
     * Adds an ingredient image onto the assembly section when called,
     * and as long as the order is not fully completed.
     */
    function addIngredient(ingredient) {
        if (!orderCompleted) {
            let ingredientImg = document.createElement("img");
            ingredientImg.classList.add("ingredient");
            ingredientImg.src = `imgs/${ingredient}.png`;
            ingredientImg.alt = ingredient;
            ingredientImg.addEventListener("click", () => {
                if (!orderCompleted) {
                    ingredientImg.remove();
                    verifyBurger();
                }
            });
    
            ASSEMBLY.appendChild(ingredientImg);
            verifyBurger();
        }
    }

    /**
     * Resets the game and generates a new order.
     */
    function newOrder() {
        generateOrder();
        orderCompleted = false;
        ASSEMBLY.innerHTML = '';
    }

    /**
     * Checks if the ingredients in the assembly matches the order.
     */
    function verifyBurger() {
        getBurger();
        console.log(currBurger);
        console.log(currOrder);
        if (JSON.stringify(currBurger) === JSON.stringify(currOrder)) {
            if (!orderCompleted) {
                score++;
                updateScore();
                ORDER.classList.toggle("correct-order");
                orderCompleted = true;
                setTimeout(newOrder, 1000);
            }
        }
    }

    /**
     * 
     */
    function getBurger() {
        currBurger = [];
        let scoreTag = id("assembly");
        for (const slice of scoreTag.children) {
            console.log(slice.alt);
            currBurger.push(slice.alt);
        }
    }

    /**
     * Updates the score
     */
    function updateScore() {
        let scoreTag = id("score");
        scoreTag.textContent = `Score: ${score}`;
    }

    init();
})();