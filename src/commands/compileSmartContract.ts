import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as request from "request-promise-native";

export const compileSCDisposable = vscode.commands.registerCommand('neo.compileContract', async selectedFile => {
    var text = await fs.readFileSync(selectedFile.fsPath, 'utf8');
    console.log(selectedFile);
    const uri = 'https://apidebug.nel.group/api/testnet';
    const options = {
        method: 'POST',
        body: {
            "jsonrpc": "2.0",
            "id": 1,
            "method":"compileContractFile",
            "params":["ATFxZ1WtrvUg6BFmLhqcJt7m5JdZx12nU7",	text]
        },
        json: true
    };
    try {
        const { result } = await request(uri, options);
        console.log(result);
        const { hash } = result[0];

        const options_getAvm = {
            method: 'POST',
            body: {
                "jsonrpc": "2.0",
                "id": 1,
                "method":"getContractCodeByHash",
                "params":["ATFxZ1WtrvUg6BFmLhqcJt7m5JdZx12nU7",	hash]
            },
            json: true
        };
        const { result: finalResult } = await request(uri, options_getAvm);
        console.log(finalResult);
        const { abi, avm, map } = finalResult[0];
        const baseName = path.basename(selectedFile.fsPath).split('.')[0];
        const dirName = path.dirname(selectedFile.fsPath);
        const outputPath = path.join(dirName, 'out');
        if (!fs.existsSync(outputPath)) {
            fs.mkdirSync(outputPath);
        }
        
        fs.writeFileSync(path.join(outputPath, baseName + ".avm"), avm);
        fs.writeFileSync(path.join(outputPath, baseName + ".abi.json"), abi);
        fs.writeFileSync(path.join(outputPath, baseName + ".map"), map);
        vscode.window.showInformationMessage('Compile Success!');
    }
    catch(e) {
        console.error(e);
    }
});