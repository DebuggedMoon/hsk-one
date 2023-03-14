import { GameStatus, ProgressBarStatus, SegmentState } from "./Enums.js";
import wordList from "./data/word-list.js";
import ProgressBar from "./ProgressBar.js";

const answerButtons = [...document.getElementsByClassName("answer-button")];
const pinyinDisplay = document.getElementById("card-pinyin");
const hanziDisplay = document.getElementById("card-hanzi");
const menuModal = document.getElementById("menu");

const INACTIVE_BUTTON_CLASS = "not-clickable"
const INCORRECT_BUTTON_CLASS = "incorrect-answer"
const CORRECT_BUTTON_CLASS = "correct-answer"

/**
 * Singleton Class for managing the game and gameplay "loop".
 */
class GameManager {
    
    constructor() {

        this.status = GameStatus.Inactive;
        this.correctAnswer = "";
        this.currentRound = 0;

    }

    /**
     * Checks and processes passed user input.
     * @param {String} userAnswer Answer string choosen by user.
     */
    submitUserAnswer(userAnswer) {

        for (let button of answerButtons) {

            button.classList.add(
                INACTIVE_BUTTON_CLASS,
                (button.innerHTML == this.correctAnswer.english) ? CORRECT_BUTTON_CLASS : INCORRECT_BUTTON_CLASS
            );

        };

        if (this.correctAnswer.english === userAnswer) {

            ProgressBar.progress(SegmentState.Won);

        } else {
            
            ProgressBar.progress(SegmentState.Lost);
            
        };
        
        setTimeout(() => {
            this.startRound();
        }, 1000);

    }

    /**
     * Starts a round by unlocking answer buttons, updating card text and choosing random answers.
     */
    startRound() {
        
        if (this.currentRound == 5) {

            ProgressBar.setStatus(ProgressBarStatus.Inactive);
            menuModal.classList.remove("hidden");
            this.status = GameStatus.Inactive;
            this.currentRound = 0;

            return;

        };

        let answers = [];
        for (let button of answerButtons) {

            let answer = wordList[Math.floor(Math.random() * wordList.length)];

            button.classList.remove(
                INACTIVE_BUTTON_CLASS,
                CORRECT_BUTTON_CLASS,
                INCORRECT_BUTTON_CLASS
            );

            button.innerHTML = answer.english;
            answers.push(answer);

        };

        this.correctAnswer = answers[Math.floor(Math.random() * answers.length)];
        hanziDisplay.innerHTML = this.correctAnswer.hanzi;
        pinyinDisplay.innerHTML = this.correctAnswer.pinyin;
        this.currentRound++;

    }

    /**
     * Starts the game.
     */
    startGame() {
        
        this.status = GameStatus.Active;
        this.startRound();

        ProgressBar.setStatus(ProgressBarStatus.Active);

    }


}

export default (new GameManager());