import { Notice } from "obsidian";
import { getAllWordsUseCase } from "./getAllWordsUseCase";
import { getValidWordsUseCase } from "./GetValidWordsUseCase";
import { showCounterWordsUseCase } from "./ShowCounterWordUseCase";

export default class ConterWordsService  {

    static async counterWords() {
        let resultWords = await getAllWordsUseCase();
        
        if(resultWords == null){
            new Notice("Página em Branco");
            return;
        }

        let validWords = getValidWordsUseCase(resultWords);
        showCounterWordsUseCase(validWords);
    }
}