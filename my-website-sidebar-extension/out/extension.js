"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
const vscode = __importStar(require("vscode"));
function activate(context) {
    console.log('Congratulations, your extension "my-website-sidebar-extension" is now active!');
    // Register the sidebar command
    const sidebarProvider = new MySidebarProvider(context.extensionUri);
    context.subscriptions.push(vscode.window.registerWebviewViewProvider("myWebsiteSidebar", sidebarProvider));
    context.subscriptions.push(vscode.commands.registerCommand('my-website-sidebar-extension.helloWorld', () => {
        vscode.window.showInformationMessage('Hello World from my-website-sidebar-extension!');
    }));
}
exports.activate = activate;
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
    getNonce() {
        let text = '';
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 32; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }
}
//# sourceMappingURL=extension.js.map