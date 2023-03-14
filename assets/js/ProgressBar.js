import { ProgressBarStatus, SegmentState} from "./Enums";

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
                    )
                });

            case ProgressBarStatus.Active:

                segmentElements[this.round].classList
                    .add(ACTIVE_SEGMENT_CLASS);

                this.round += 1;

        };

    };

};

export default (new ProgressBar());