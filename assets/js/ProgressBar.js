import { ProgressBarStatus } from "./Enums";

const progressElement = document.getElementById("segmented-progress-bar");
const segmentElements = [...progressElement.children];

/**
 *  Singleton Class for managing the progress bar ui.
 */
class ProgressBar {

    constructor() {
        
        this.status = ProgressBarStatus.Inactive;
        this.round = 0;

    }


}

export default (new ProgressBar());