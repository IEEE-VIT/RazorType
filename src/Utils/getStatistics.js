/**
 * It analyzes the user input text against the system generated text
 * and provided the statistics report that includes
 *
 * @param { string } inputText holds the user typed text
 * @param { string } expectedText holds the expected text
 *
 * @property { number } totalWordsTyped refers to total words that a user typed
 * @property { number } totalAccurateWords: refers to the total accurate works that a user typed
 * @property { number } totalInaccurateWords: refers to the total inaccurate works that a user typed
 * @property { list } listOfIncorrectWords: refers to the list of keyValue pair of wrongly typed words
 * while `Key` being the `expected word` and `Value` being the `wrongly typed`.
 *
 * @example 
 * `{
    "totalWordsTyped": 3,
    "totalAccurateWords": 1,
    "totalInaccurateWords": 2,
    "listOfIncorrectWords": {
        "needed": "ne",
        "motion": "motin"
    }`
 */
export const getStatistics = (inputText, expectedText) => {
  let statistics = {
    totalWordsTyped: 0,
    totalAccurateWords: 0,
    totalInaccurateWords: 0,
    listOfIncorrectWords: [],
  };

  if (inputText.length === 0) {
    return statistics;
  }

  const inputTextArray = inputText.split(" ");
  const expectedTextArray = expectedText.split(" ");

  statistics.totalWordsTyped = inputTextArray.length;

  for (let i = 0; i < inputTextArray.length; i++) {
    if (inputTextArray[i] === expectedTextArray[i]) {
      statistics = {
        ...statistics,
        totalAccurateWords: (statistics.totalAccurateWords += 1),
      };
    } else {
      let wronglyTyped = {};
      wronglyTyped[expectedTextArray[i]] = inputTextArray[i];
      statistics = {
        ...statistics,
        totalInaccurateWords: (statistics.totalInaccurateWords += 1),
        listOfIncorrectWords: {
          ...statistics.listOfIncorrectWords,
          ...wronglyTyped,
        },
      };
    }
  }
  console.log(statistics);
  return statistics;
};
