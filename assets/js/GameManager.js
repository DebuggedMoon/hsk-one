import { GameStatus, ProgressBarStatus } from "./Enums";
import wordList from "./data/word-list.js"
import ProgressBar from "./ProgressBar.js";

/**
 * Singleton Class for managing the game and gameplay "loop".
 */
class GameManager {
    
    constructor() {

        this.status = GameStatus.Inactive;

    }

    /**
     * Starts the game.
     */
    startGame() {

        this.status = GameStatus.Active;
        ProgressBar.setStatus(ProgressBarStatus.Active);        

    }


}

export default (new GameManager());