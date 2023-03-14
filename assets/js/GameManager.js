import { GameStatus, ProgressBarStatus } from "./Enums.js";
import wordList from "./data/word-list.js";
import ProgressBar from "./ProgressBar.js";

const answerButtons = [...document.getElementsByClassName("answer-button")];
const pinyinDisplay = document.getElementById("card-pinyin");
const hanziDisplay = document.getElementById("card-hanzi");

/**
 * Singleton Class for managing the game and gameplay "loop".
 */
class GameManager {
    
    constructor() {

        this.status = GameStatus.Inactive;
        this.correctAnswer = "";

    }

    /**
     * Starts a round
     * @returns {{hanzi: String, pinyin: String, english: String}} The answer to be used in this round.
     */
    startRound() {
        
        let answers = [];
        for (let button of answerButtons) {

            let answer = wordList[Math.floor(Math.random() * wordList.length) + 1]
            button.classList.remove("inactive-button");
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
        

        let answers = this.startRound();
        ProgressBar.setStatus(ProgressBarStatus.Active);

    }


}

export default (new GameManager());