/**
 * @author Weihong Cen
 * @date 05/13/2023
 * 
 * This is the JavaScript that manages the game and card states in the SETS! 
 * website.
 */
(function() {
    "use strict";

    function init() {
        const START_BUTTON = qs("#start-btn");
        START_BUTTON.addEventListener("click", start);
    }
    
    function start() {
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
    
    init();
})();