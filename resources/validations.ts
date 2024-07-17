export function containsOnlyLetters(word: string): boolean {
    return /^[a-zA-Z]+$/.test(word);
  }
  
export  function validateWords(inputString: string): boolean {
    const words = inputString.split(';');
    return words.every(containsOnlyLetters);
  }

export function validateNumber(input: string): boolean {
  const regex = /^\d+$/;
  return regex.test(input);
}