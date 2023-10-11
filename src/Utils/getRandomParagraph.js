const paragraphs = require("../Data/paragraphs.json");

export const PARAGRAPH_LENGTH = 30;

export const getRandomParagraph = () => {
  const maxIndex = paragraphs.length;
  return Array(PARAGRAPH_LENGTH)
    .fill("")
    .map(() => {
      const i = Math.floor(Math.random() * maxIndex);
      return paragraphs[i];
    })
    .join(" ");
};
