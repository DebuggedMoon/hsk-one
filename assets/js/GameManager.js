import { GameStatus, ProgressBarStatus } from "./Enums.js";
import wordList from "./data/word-list.js";
import ProgressBar from "./ProgressBar.js";

const answerButtons = [...document.getElementsByClassName("answer-button")];
const pinyinDisplay = document.getElementById("card-pinyin");
const hanziDisplay = document.getElementById("card-hanzi");

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

    }

    /**
     * Checks and processes passed user input.
     * @param {String} userAnswer Answer string choosen by user.
     */
    submitUserAnswer(userAnswer) {

        for (let button of answerButtons) {

            button.classList.add(
                INACTIVE_BUTTON_CLASS,
                (button.innerHTML == this.correctAnswer) ? CORRECT_BUTTON_CLASS : INCORRECT_BUTTON_CLASS
            )

            setTimeout(this.startRound, 2500)

        }

    }

    /**
     * Starts a round
     * @returns {{hanzi: String, pinyin: String, english: String}} The answer to be used in this round.
     */
    startRound() {
        
        let answers = [];
        for (let button of answerButtons) {

            let answer = wordList[Math.floor(Math.random() * wordList.length) + 1]

            button.classList.remove(
                INACTIVE_BUTTON_CLASS,
                CORRECT_BUTTON_CLASS,
                INCORRECT_BUTTON_CLASS
            );

            button.innerHTML = answer.english;
            answers.push(answer);

        }

        hanziDisplay.innerHTML = answers[0].hanzi;
        pinyinDisplay.innerHTML = answers[0].pinyin;        
        
        return answers;

    }

    /**
     * Starts the game.
     */
    startGame() {

        this.status = GameStatus.Active;
        

        this.correctAnswer = this.startRound();
        ProgressBar.setStatus(ProgressBarStatus.Active);

    }


}

export default (new GameManager());