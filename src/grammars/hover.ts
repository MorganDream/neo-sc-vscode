import * as vscode from 'vscode';

export function registerHover() {
    let sel = { scheme: 'file', language: 'csharp' };
    vscode.languages.registerHoverProvider(sel,  {
        provideHover(document, position, token) {
          return {
            contents: ['Hover Content']
          };
        }
    });
}
