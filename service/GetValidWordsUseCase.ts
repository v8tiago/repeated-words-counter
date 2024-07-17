import { wordPatternEnglish, wordPatternPortuguese } from "resources/constants";
import { DEFAULT_SETTINGS } from "settings/SettingVariables";

export function getValidWordsUseCase(content: string): { [word: string]: number } {
    const excludedWordsSet = new Set(DEFAULT_SETTINGS.excludedWords.split(';')
                                            .map((word: string) => word.toLowerCase()));
    const wordPattern = getWordPattern();                                   
    const words = content.toLowerCase().match(wordPattern) || [];
    const wordCounts: { [word: string]: number } = {};

    words.forEach(word => {
        if (!excludedWordsSet.has(word)) {
          if (!wordCounts[word]) {
            wordCounts[word] = 0;
          }
          wordCounts[word]++;
        }
      });

    const filteredWordCounts: { [word: string]: number } = {};
    for (const [word, count] of Object.entries(wordCounts)) {
        if (count > Number.parseInt(DEFAULT_SETTINGS.maxNumberRepetitionsAllowed)) {
        filteredWordCounts[word] = count;
        }
    }
    const entries = Object.entries(filteredWordCounts);
    const sortedEntries = entries.sort(([, a], [, b]) => b - a);
    const sortedWordCounts: WordCount = Object.fromEntries(sortedEntries);

    return sortedWordCounts;
}

  export function getWordPattern() : RegExp {
    switch (DEFAULT_SETTINGS.language) {
      case "en":
        return wordPatternEnglish;
      case "pt":
        return wordPatternPortuguese;
      default:
        return wordPatternEnglish;
    }

  }

interface WordCount {
  [word: string]: number;
}