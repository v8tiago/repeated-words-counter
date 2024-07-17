import { WORD_COUNTER_VIEW_ID } from "resources/constants";
import { WordCountView } from "view/WordCountView";

export function showCounterWordsUseCase(wordCounts: {[word: string]: number}) {
    console.log("start - showWordCounts");
    const leaves = this.app.workspace.getLeavesOfType(WORD_COUNTER_VIEW_ID);
    if (leaves.length > 0) {
        const view = leaves[0].view as WordCountView;
        view.update(wordCounts);
    } else {
        let leaf=  this.app.workspace.getRightLeaf(false);
        if(leaf)
        leaf.setViewState({
            type: WORD_COUNTER_VIEW_ID,
            active: true
        }).then(() => {
            const view = this.app.workspace.getLeavesOfType(WORD_COUNTER_VIEW_ID)[0].view as WordCountView;
            view.update(wordCounts);
        });
    }
}