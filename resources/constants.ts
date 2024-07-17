import { DEFAULT_SETTINGS } from "settings/SettingVariables";

export const WORD_COUNTER_VIEW_ID = 'word-counter-view';
export const wordPatternEnglish = /\b[a-zA-Z]+\b/g; //atende apenas sem caracteres especiais
export const wordPatternPortuguese = /\b[\p{L}]+\b/gu;
export const registerPluginIcon = 'pluginIcon';
export const replacementMark = `<mark style="background-color: `+ DEFAULT_SETTINGS.markinColor + `;">$1</mark>`;
export const regexReplacementMark = `/\<mark style="background-color: ${DEFAULT_SETTINGS.markinColor};">(.*?)\<\/mark>/g`;

export const LANGUAGES = {
    en: 'English',
    pt: 'Portuguese'
};