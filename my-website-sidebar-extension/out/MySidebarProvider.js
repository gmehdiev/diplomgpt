"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MySidebarProvider = void 0;
class MySidebarProvider {
    extensionUri;
    _view;
    constructor(extensionUri) {
        this.extensionUri = extensionUri;
    }
    resolveWebviewView(webviewView, context, _token) {
        this._view = webviewView;
        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [this.extensionUri]
        };
        webviewView.webview.html = this._getWebviewContent(webviewView.webview);
    }
    _getWebviewContent(webview) {
        const cspSource = webview.cspSource;
        const nonce = this.getNonce();
        return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>My Website</title>
            <meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src ${cspSource} https:; script-src 'nonce-${nonce}'; style-src ${cspSource}">
        </head>
        <body>
            <iframe src="https://gmehdiev.website" style="width:100%; height:100%; border:none;"></iframe>
        </body>
        </html>`;
    }
    getNonce() {
        let text = '';
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 32; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }
}
exports.MySidebarProvider = MySidebarProvider;
//# sourceMappingURL=MySidebarProvider.js.map