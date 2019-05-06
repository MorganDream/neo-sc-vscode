import * as vscode from 'vscode';
import { CLASSES } from './classes';

const validNameSpace = 'Neo.SmartContract.Framework.Services.Neo';
const shortNameSpace = 'Neo.SmartContract.Framework';
const validNameSpaceInArray = validNameSpace.split('.');
const shortNameSpaceInArray = shortNameSpace.split('.');

export function registerCompletion(){
    let sel = { scheme: 'file', language: 'csharp' };
    vscode.languages.registerCompletionItemProvider(sel, {
        provideCompletionItems: (document: vscode.TextDocument, position: vscode.Position) => {
            let wordPosition = new vscode.Position(position.line, position.character - 1);
            let word = document.getText(document.getWordRangeAtPosition(wordPosition));
            let line = document.getText(new vscode.Range(new vscode.Position(position.line, 0), position));
            console.log(line);
            if (line.indexOf('using') === 0) {
                let nameSpace = line.slice(5).trim();
                if (!validNameSpace.startsWith(nameSpace)) {
                    return [];
                }

                let currentLevel = validNameSpaceInArray.indexOf(word);
                if (currentLevel >= 3) {
                    return [
                        {
                            label: validNameSpace,
                            kind: vscode.CompletionItemKind.Module,
                            insertText: validNameSpaceInArray.slice(currentLevel + 1).join('.')
                        }
                    ]
                } else {
                    return [
                        {
                            label: validNameSpace,
                            kind: vscode.CompletionItemKind.Module,
                            insertText: validNameSpaceInArray.slice(currentLevel + 1).join('.')
                        },
                        {
                            label: shortNameSpace,
                            kind: vscode.CompletionItemKind.Module,
                            insertText: shortNameSpaceInArray.slice(currentLevel + 1).join('.')
                        }
                    ]
                }
            } else {
                let result: vscode.CompletionItem[] = [];
                CLASSES.some(classInfo => {
                    if (word === classInfo.name) {
                        const propertyCompletionItems = classInfo.properties.map(property => {
                            return {
                                label: property.name,
                                kind: vscode.CompletionItemKind.Property,
                                insertText: property.name,
                                detail: property.description
                            }
                        });
                        const methodCompletionItems = classInfo.methods.map(method => {
                            return {
                                label: method.name,
                                kind: vscode.CompletionItemKind.Method,
                                insertText: method.name,
                                detail: method.description
                            }
                        });
                        result = propertyCompletionItems.concat(methodCompletionItems);
                        return true;
                    } else {
                        return false;
                    }
                });
                return result;
            }
        }
    }, '.');
}
    