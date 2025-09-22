
function validateInputSpacing(input) {
    const pattern = /^[a-zA-Z]+ $/;
    if (pattern.test(input)) {
        return "Accepted";
    } else {
        return "Input is not valid. Please enter only one word followed by a space.";
    }
}

/**
 * Calculates gross and net Words Per Minute (WPM) for typing tests.
 * @param {number} totalChars - Total characters typed.
 * @param {number} timeSeconds - Time taken in seconds.
 * @param {number} [uncorrectedErrors=0] - Number of uncorrected errors (optional).
 * @returns {{ grossWPM: number, netWPM: number }}
 */
function calculateWPM(totalChars, timeSeconds, uncorrectedErrors = 0) {
    if (timeSeconds <= 0) return { grossWPM: 0, netWPM: 0 };
    const wordsTyped = totalChars / 5;
    const minutes = timeSeconds / 60;
    const grossWPM = wordsTyped / minutes;
    const netWPM = (wordsTyped - uncorrectedErrors) / minutes;
    return {
        grossWPM: Math.max(0, Math.round(grossWPM)),
        netWPM: Math.max(0, Math.round(netWPM)),
    };
}

module.exports = {
    validateInputSpacing,
    calculateWPM
};
