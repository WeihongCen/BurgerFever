/**
 * @author Weihong Cen, Andrew Huang
 * @date 05/13/2024
 * 
 * This is the JavaScript that emulates a radio button in the main menu.
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