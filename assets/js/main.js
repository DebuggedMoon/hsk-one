import GameManager from "./GameManager.js";
import { GameStatus } from "./Enums.js";

const answerButtons = document.getElementsByClassName("answer-button");

/* Adds EventListeners to interactable elements whenever the DOM's loaded. */
document.addEventListener("DOMContentLoaded", function () {
    
    /* Auto starts until menu is implemented */
    GameManager.startGame();

    for (let button of answerButtons) {

        button.addEventListener("click", () => {

            if (GameManager.status == GameStatus.Active) GameManager.submitUserAnswer(button.innerHTML);

        })

    }

});