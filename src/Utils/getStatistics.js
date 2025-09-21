/**
 * It analyzes the user input text against the system generated text
 * and provided the statistics report that includes
 *
 * @param { string } inputText holds the user typed text
 * @param { string } expectedText holds the expected text
 * @param { number } time holds the time taken to type the text in seconds
 *
 * @property { number } wpm refers to words per minute
 * @property { number } accuracy refers to the accuracy of the user
 * @property { number } time refers to the time taken to type the text in seconds
 * @property { number } errors refers to the total inaccurate works that a user typed
 * @property { number } characters refers to total characters that a user typed
 *
 * @example
 * `{
 *  "wpm": 50,
 *  "accuracy": 90,
 *  "time": 60,
 *  "errors": 5,
 *  "characters": 250
 * }`
 */
export const getStatistics = (inputText, expectedText, time) => {
  let statistics = {
    wpm: 0,
    accuracy: 0,
    time: time,
    errors: 0,
    characters: inputText.length,
  };

  if (inputText.length === 0) {
    return statistics;
  }

  const inputTextArray = inputText.split(" ");
  const expectedTextArray = expectedText.split(" ");

  let accurateWords = 0;
  for (let i = 0; i < inputTextArray.length; i++) {
    if (inputTextArray[i] === expectedTextArray[i]) {
      accurateWords++;
    }
  }

  const grossWPM = (inputText.length / 5) / (time / 60);
  const netWPM = grossWPM - (inputTextArray.length - accurateWords) / (time / 60);

  statistics.wpm = Math.max(0, Math.floor(netWPM));
  statistics.accuracy = Math.floor((accurateWords / inputTextArray.length) * 100);
  statistics.errors = inputTextArray.length - accurateWords;

  return statistics;
};
