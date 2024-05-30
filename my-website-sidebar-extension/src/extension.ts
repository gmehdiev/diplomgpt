import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "my-website-sidebar-extension" is now active!');

    // Register the sidebar command
    const sidebarProvider = new MySidebarProvider(context.extensionUri);
    context.subscriptions.push(vscode.window.registerWebviewViewProvider("myWebsiteSidebar", sidebarProvider));

    context.subscriptions.push(vscode.commands.registerCommand('my-website-sidebar-extension.helloWorld', () => {
        vscode.window.showInformationMessage('Hello World from my-website-sidebar-extension!');
    }));
}

class MySidebarProvider implements vscode.WebviewViewProvider {
    private _view?: vscode.WebviewView;

    constructor(private readonly extensionUri: vscode.Uri) {}

    public resolveWebviewView(
        webviewView: vscode.WebviewView,
        context: vscode.WebviewViewResolveContext,
        _token: vscode.CancellationToken
    ) {
        this._view = webviewView;

        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [this.extensionUri]
        };

        webviewView.webview.html = this._getWebviewContent(webviewView.webview);
    }

    private _getWebviewContent(webview: vscode.Webview): string {
            // <meta http-equiv="Content-Security-Policy" content="default-src *; frame-src *; script-src *  'unsafe-inline' ; style-src * 'unsafe-inline'; img-src *; connect-src *;">
// <meta http-equiv="Content-Security-Policy" content="default-src * data: gap: https://ssl.gstatic.com 'unsafe-eval'; style-src 'self' 'unsafe-inline'; media-src *; img-src 'self' data: content:;">
// 			<meta name="format-detection" content="telephone=no">
// 			<meta name="msapplication-tap-highlight" content="no">
// 			<meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width">
const cspSource = webview.cspSource;
const nonce = this.getNonce();
const imagePath = webview.asWebviewUri(vscode.Uri.joinPath(this.extensionUri, 'media', 'voidvoid.png'));

        return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>My Website</title>
			<meta http-equiv="Content-Security-Policy" content="default-src 'self' ${cspSource}; script-src 'nonce-${nonce}' 'self' 'unsafe-inline'; style-src 'nonce-${nonce}' 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src *; frame-src *;">            <style>
            iframe {
              width: 100%;
              height: 100%;
            }
            </style>
        </head>
        <body>
        <img src="${imagePath}"></img>
        </body>
        </html>`;
    }
	private getNonce() {
        let text = '';
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 32; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }
}