/**
 * @author Weihong Cen
 * @date 05/13/2023
 * 
 * This is the JavaScript that manages the game and card states in the SETS! 
 * website.
 */
(function() {
    "use strict";

    const DIFFICULTY_BTNS = qsa(".difficulty button");
    const EASY_BTN = DIFFICULTY_BTNS[0];
    const HARD_BTN = DIFFICULTY_BTNS[1];
    var difficulty = 0;

    function init() {
        EASY_BTN.addEventListener("click", () => {
            chooseDifficulty(0);
        });
        HARD_BTN.addEventListener("click", () => {
            chooseDifficulty(1);
        });
    }

    function chooseDifficulty(chosenDifficulty) {
        if (EASY_BTN == null || HARD_BTN == null) {
            console.error("Difficulty buttons are null!");
        }
        if (difficulty != chosenDifficulty) {
            EASY_BTN.classList.toggle("selected");
            HARD_BTN.classList.toggle("selected");
            difficulty = chosenDifficulty;
        }
    }
    
    init();
})();