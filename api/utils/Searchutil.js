// utils/searchUtils.js
const stopWords = ["in", "for", "at", "of", "the", "on", "with", "a", "an"];

export const prepareSearchTerm = (searchTerm) => {
  const words = searchTerm.split(/\s+/);
  const filteredWords = words.filter(word => !stopWords.includes(word.toLowerCase()));
  return filteredWords.join("|");
};

