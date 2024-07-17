import { addIcon, Plugin} from 'obsidian';
import { registerPluginIcon, WORD_COUNTER_VIEW_ID } from 'resources/constants';
import { ICON_DATA, ICON_RIBBON } from 'resources/icons';
import CounterWordsService from 'service/CounterWordsService';
import { DEFAULT_SETTINGS, WordCounterSettings } from 'settings/SettingVariables';
import WordsCounterSettingPlugin from 'settings/WordsCounterSettingPlugin';
import { WordCountView } from 'view/WordCountView';

export default class WordCounterPlugin extends Plugin {
    settings: WordCounterSettings;

    async onload() {
        console.log('Loading Word Counter Plugin');
    
        await this.loadSettings();
        this.registerView(WORD_COUNTER_VIEW_ID, leaf => new WordCountView(leaf));
        
        addIcon(registerPluginIcon, ICON_RIBBON);
        this.addRibbonIcon(registerPluginIcon, "Repeated words counter", () => {
            CounterWordsService.counterWords();
		  });

        this.addSettingTab(new WordsCounterSettingPlugin(this.app, this));

    }

    onunload() {
        console.log('Unloading Word Counter Plugin');
        this.app.workspace.detachLeavesOfType(WORD_COUNTER_VIEW_ID);
    }

    async loadSettings() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    }

    async saveSettings() {
        await this.saveData(this.settings);
    }
}
