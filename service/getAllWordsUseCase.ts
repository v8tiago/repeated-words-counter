export async function getAllWordsUseCase() {
    const activeFile = this.app.workspace.getActiveFile();
    if (!activeFile) {
        return null;
    }

    return this.app.vault.read(activeFile);

}