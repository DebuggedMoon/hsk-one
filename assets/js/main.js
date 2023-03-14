import GameManager from "./GameManager.js";
import { GameStatus } from "./Enums.js";

const answerButtons = document.getElementsByClassName("answer-button");
const menuModal = document.getElementById("menu");

/* Adds EventListeners to interactable elements whenever the DOM's loaded. */
document.addEventListener("DOMContentLoaded", function () {
    
    menuModal.addEventListener("click", () => {

        menuModal.classList.add("hidden");
        GameManager.startGame();

    });

    for (let button of answerButtons) {

        button.addEventListener("click", () => {

            if (GameManager.status == GameStatus.Active) GameManager.submitUserAnswer(button.innerHTML);

        })

    }

});