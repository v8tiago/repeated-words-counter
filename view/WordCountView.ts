import { IconName, ItemView, MarkdownView, Menu, WorkspaceLeaf } from "obsidian";
import { registerPluginIcon, replacementMark, WORD_COUNTER_VIEW_ID } from "resources/constants";
import { ICON_RIBBON } from "resources/icons";

export class WordCountView extends ItemView {
    private container: HTMLElement;
    private headerContainer: HTMLElement;
    private clearButtonContainer: HTMLElement;

    private clearButton = this.containerEl.createEl('button', {
        cls: 'word-count-clear-button',
        text: 'Clear marks'
    });
    constructor(leaf: WorkspaceLeaf) {
        super(leaf);
    }

    getViewType() {
        return WORD_COUNTER_VIEW_ID;
    }

    getDisplayText() {
        return 'Repeated words counter';
    }

    getIcon(): IconName {
        return registerPluginIcon;
    }

    async onOpen() {
        this.containerEl.appendChild(this.headerContainer = this.containerEl.createDiv({ cls: 'word-count-header' }));
        this.containerEl.appendChild(this.clearButtonContainer = this.clearButton);
        this.containerEl.appendChild(this.container = this.containerEl.createDiv({ cls: 'word-count-container' }));
        
        this.headerContainer.setText(this.getDisplayText());
        this.container.style.overflowY = 'auto';
      
        this.clearButton.addEventListener('click', () => {
          const contentEl = this.getContentEl();
          this.removeHighlights(contentEl);
        });
      
        const viewContent = this.containerEl.querySelector('.view-content');
        if (viewContent) {
          viewContent.remove();
        }
      }

    async onClose() {
        this.container.empty();
    }

    updates(wordCounts: { [word: string]: number }) {
        this.container.empty();
        for (const [word, count] of Object.entries(wordCounts)) {
            const wordCountDiv = this.container.createDiv({ cls: 'word-count-item' });
            wordCountDiv.setText(`${word}: ${count}`);
            wordCountDiv.style.cursor = 'pointer';
            wordCountDiv.addEventListener('click', () => {
                this.highlightWord(word);
            });
        }
    }

    update(wordCounts: { [word: string]: number }) {
      this.container.empty();
    
      for (const [word, count] of Object.entries(wordCounts)) {
        const wordCountDiv = this.container.createDiv({ cls: 'word-count-item' });
    
        const wordCountButton = document.createElement('button');
        wordCountButton.textContent = `${word}: ${count}`;
        wordCountButton.classList.add('word-count-button'); 
    
        wordCountButton.addEventListener('click', () => {
          this.highlightWord(word);
        });
    
        wordCountDiv.appendChild(wordCountButton);
      }
    }

    highlightWord(word: string) {
        if (!word) {
          console.error('No word provided');
          return;
        }
      
        const contentEl = this.getContentEl();
        this.removeHighlights(contentEl);

        const html = contentEl.innerHTML;
        const regex = new RegExp(`\\b(${word})\\b`, 'gi');
      
        const newHtml = html.replace(regex, replacementMark);
        contentEl.innerHTML = newHtml;
      }

      getContentEl(): HTMLElement {
        const activeLeaf = this.app.workspace.getMostRecentLeaf();
      
        if (!activeLeaf || !(activeLeaf.view instanceof MarkdownView)) {
          throw new NoActiveMarkdownViewError('No active markdown view found');
        }
      
        const markdownView = activeLeaf.view as MarkdownView;
        return markdownView.contentEl;
      }

      removeHighlights(contentEl:HTMLElement){
        const regexMark = /<mark style="background-color: yellow;">(.*?)<\/mark>/g;
        const replacement = '$1';

        contentEl.innerHTML = contentEl.innerHTML.replace(regexMark, replacement);
      }
}

class NoActiveMarkdownViewError extends Error {
  constructor(message: string) {
    super(message);
  }
}