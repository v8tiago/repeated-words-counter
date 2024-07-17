import{App, Setting, PluginSettingTab, Notice} from 'obsidian'
import HeaderCounterPlugin from 'main';
import { DEFAULT_SETTINGS } from './SettingVariables';
import { validateNumber, validateWords } from 'resources/validations';
import { LANGUAGES } from 'resources/constants';

export default class WordsCounterSettingPlugin extends PluginSettingTab {

	plugin: HeaderCounterPlugin

	constructor(app: App, plugin: HeaderCounterPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();
		containerEl.createEl('h2', { text: 'Word Counter Settings' });

		this.set_default_header();
	}

	set_default_header(): void {
        new Setting(this.containerEl)
            .setName('Excluded Words')
            .setDesc('Enter words to exclude from the word count, separated by commas.')
            .addTextArea(text => text
                .setPlaceholder('Enter words...')
                .setValue(this.plugin.settings.excludedWords)
                .onChange(async (value) => {
                    if(validateWords(value))
                    this.plugin.settings.excludedWords = value;
                    this.plugin.saveData(this.plugin.settings);
                }));
        
                new Setting(this.containerEl)
                .setName('Maximum number of repetitions')
                .addText(text => text
                    .setValue(this.plugin.settings.maxNumberRepetitionsAllowed)
                    .onChange(async (value) => {
                        if(validateNumber(value))
                            this.plugin.settings.maxNumberRepetitionsAllowed = value;
                        this.plugin.saveData(this.plugin.settings);
                    }));

                    new Setting(this.containerEl)
                    .setName('Choose language')
                    .addDropdown(dropdown => {
                        Object.entries(LANGUAGES).forEach(([key, value]) => {
                            dropdown.addOption(key, value);
                        });
                
                        dropdown.setValue(this.plugin.settings.language);
                        dropdown.onChange(async (value) => {
                            this.plugin.settings.language = value;
                            this.plugin.saveData(this.plugin.settings);
                        });
                    });

                    new Setting(this.containerEl)
                    .setName("Marking Color")
                    .addColorPicker((color) => {
                        color.setValue(this.plugin.settings.markinColor);
                        color.onChange(async (value) => {
                            this.plugin.settings.markinColor = value;
                            this.plugin.saveData(this.plugin.settings);
                        });
                    });
    }
}