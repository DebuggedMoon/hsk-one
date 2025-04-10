import { GameStatus, ProgressBarStatus, SegmentState } from "./Enums.js";
import wordList from "./data/word-list.js";
import ProgressBar from "./ProgressBar.js";

const answerButtons = [...document.getElementsByClassName("answer-button")];
const pinyinDisplay = document.getElementById("card-pinyin");
const hanziDisplay = document.getElementById("card-hanzi");
const menuModal = document.getElementById("menu");

const INACTIVE_BUTTON_CLASS = "not-clickable";
const INCORRECT_BUTTON_CLASS = "incorrect-answer";
const CORRECT_BUTTON_CLASS = "correct-answer";

/** @typedef {import("./data/word-list.js").Word} Word */
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

            const resultStyleClass = button.innerHTML == this.correctAnswer.english ? CORRECT_BUTTON_CLASS : INCORRECT_BUTTON_CLASS;

            button.classList.add(
                INACTIVE_BUTTON_CLASS,
                resultStyleClass
            );   

            if (userAnswer === button.innerHTML) {

                button.classList.add(
                    INACTIVE_BUTTON_CLASS,
                    `selected-${resultStyleClass}`
                );
            }
        }

        if (this.correctAnswer.english === userAnswer) {

            ProgressBar.progress(SegmentState.Won);

        } else {
            
            ProgressBar.progress(SegmentState.Lost);
            
        }
        
        setTimeout(() => {
            this.startRound();
        }, 1000);

    }

    /**
     * Picks a given amount of random answers and returns them.
     * @param {number} amount
     * @returns {Word[]}
     */
    getRandomAnswers(amount) {
        const randomAnswers = new Set();

        while (randomAnswers.size < amount) {
            randomAnswers.add(
                wordList[Math.floor(Math.random() * wordList.length)]
            )
        }

        return [...randomAnswers];
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

        }

        let answers = this.getRandomAnswers(answerButtons.length);
        console.log(answers);

        for (let i = 0; i < answerButtons.length; i++) {

            answerButtons[i].classList.remove(
                INACTIVE_BUTTON_CLASS,
                CORRECT_BUTTON_CLASS,
                INCORRECT_BUTTON_CLASS,
                `selected-${CORRECT_BUTTON_CLASS}`,
                `selected-${INCORRECT_BUTTON_CLASS}`,
            );

            answerButtons[i].innerHTML = answers[i].english;
        }

        this.correctAnswer = answers[Math.floor(Math.random() * answers.length)];
        pinyinDisplay.innerHTML = this.correctAnswer.pinyin;
        hanziDisplay.innerHTML = this.correctAnswer.hanzi;
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