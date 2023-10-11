function validateInputSpacing(input) {
    const pattern = /^[a-zA-Z]+ $/;
    if (pattern.test(input)) {
        return "Accepted";
    } else {
        return "Input is not valid. Please enter only one word followed by a space.";
    }
}
