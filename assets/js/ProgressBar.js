import { ProgressBarStatus, SegmentState} from "./Enums.js";

const progressElement = document.getElementById("segmented-progress-bar");
const segmentElements = [...progressElement.children];

const ACTIVE_SEGMENT_CLASS = "active-segment";
const LOST_SEGMENT_CLASS = "lost-segment";
const WON_SEGMENT_CLASS = "won-segment";

/**
 *  Singleton Class for managing the progress bar ui.
 */
class ProgressBar {

    constructor() {
        
        this.status = ProgressBarStatus.Inactive;
        this.round = 0;

    }

    /**
     * Set the progress bars status.
     * @param {ProgressBarStatus} newStatus Status to be set.
     */
    setStatus(newStatus) {

        if (this.status === newStatus) return;
        this.status = newStatus;
        
        switch(newStatus) {

            case ProgressBarStatus.Inactive:

                this.round = 0;
                segmentElements.forEach( segment => {
                    segment.classList.remove(
                        ACTIVE_SEGMENT_CLASS,
                        LOST_SEGMENT_CLASS,
                        WON_SEGMENT_CLASS
                    );
                });

                break;

            case ProgressBarStatus.Active:

                segmentElements[this.round].classList
                    .add(ACTIVE_SEGMENT_CLASS);

                break;


        }

    }

    /**
     * Move up the progress bar to the next segment and set the current segments state.
     * @param {SegmentState} state State to be set for current segment.
     */
    progress(state) {

        if (this.status === ProgressBarStatus.Inactive)
            console.error("Cannot progress inactive progress bar.");
        
        switch(state) {

            case SegmentState.Won:
                segmentElements[this.round].classList
                    .add(WON_SEGMENT_CLASS);

                break;


            case SegmentState.Lost:
                segmentElements[this.round].classList
                    .add(LOST_SEGMENT_CLASS);

                break;

        }

        segmentElements[this.round].classList
            .remove(ACTIVE_SEGMENT_CLASS);

        this.round++;

        if (this.round < 5) {

            segmentElements[this.round].classList
                .add(ACTIVE_SEGMENT_CLASS);

        }

    }

}

export default (new ProgressBar());