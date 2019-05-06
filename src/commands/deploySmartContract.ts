import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

const htmlRelativePath = 'src/resource/deployContract.html';

export function getDeploySCDisposable(context: vscode.ExtensionContext) {
    let resourcePath = path.join(context.extensionPath, htmlRelativePath);
    const webviewHtml = getWebViewContent(resourcePath);

    return vscode.commands.registerCommand('neo.deployContract', 
        async selectedFile => {
        const baseName = path.basename(selectedFile.fsPath);
        const panel = vscode.window.createWebviewPanel(
            "contractInfo", 
            `Deploy ${baseName}`,
            vscode.ViewColumn.One,
            {
                enableScripts: true,
                retainContextWhenHidden: true,
            });
        panel.webview.html = webviewHtml;
        var avm = await fs.readFileSync(selectedFile.fsPath, 'utf8');
        const fileName = baseName.split('.')[0];
        const dirName = path.dirname(selectedFile.fsPath);
        const abiFile = path.join(dirName, `${fileName}.abi.json`);
        const abiJsonContent = await fs.readFileSync(abiFile);
        const scriptHash: any = JSON.parse(abiJsonContent.toString())['hash'];
        panel.webview.postMessage({
            type: 'info',
            scriptHash,
            avm
        });
        // panel.webview.onDidReceiveMessage(async message => {
        //     const {password, contractName, version, author, email,
        //         description, dynamicCall, needStorage, acceptPayment, gasFee} = message;
           
        // });
    });
}

const getWebViewContent = (resourcePath: string): string => {
    const dirPath = path.dirname(resourcePath);
	let html = fs.readFileSync(resourcePath, 'utf-8');
	// vscode不支持直接加载本地资源，需要替换成其专有路径格式，这里只是简单的将样式和JS的路径替换
	// html = html.replace(/(<link.+?href="|<script.+?src="|<img.+?src=")(.+?)"/g, (m, $1, $2) => {
	// 	return $1 + vscode.Uri.file(path.resolve(dirPath, $2)).with({ scheme: 'vscode-resource' }).toString() + '"';
	// });
	return html;
}
