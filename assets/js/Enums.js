
/**
 * An enum is a user-defined type consisting of a set of named constants called enumerators.
 * @param {Array.<String>} enumConstants List of strings to create enumerators of.
 */
class Enums {

    constructor(enumConstants) {
        
        for (const constantName of enumConstants) {

            this[constantName] = Symbol(constantName);

        }

        Object.freeze(this);

    }



}

const ProgressBarStatus = new Enums([
    "Inactive",
    "Active"
]);

const SegmentState = new Enums([
    "Won",
    "Lost"
]);

const GameStatus = new Enums([
    "Inactive",
    "Active"
]);

export {
    ProgressBarStatus,
    SegmentState,
    GameStatus
};