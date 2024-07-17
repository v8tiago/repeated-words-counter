export interface WordCounterSettings {
	excludedWords: string;
	maxNumberRepetitionsAllowed: string;
	language: string;
	markinColor: string;
}

export const DEFAULT_SETTINGS: WordCounterSettings = {
	excludedWords: "a;e;o",
	maxNumberRepetitionsAllowed: "1",
	language: "pt",
	markinColor: "#FFFF00",
};