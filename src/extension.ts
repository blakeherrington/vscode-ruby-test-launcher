'use strict';

import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

    let runTestLine = vscode.commands.registerCommand('extension.runTestLine', () => {
        vscode.window.setStatusBarMessage('Test Launcher: Running test', 3000);

        if (vscode.window.activeTextEditor !== undefined) {
            const editor: vscode.TextEditor = vscode.window.activeTextEditor;

            const fileName = editor.document.fileName;
            const lineNumber = editor.selection.active.line;

            issueCommand(`${fileName}:${lineNumber}`);
        }
    });

    let runTestFile = vscode.commands.registerCommand('extension.runTestFile', () => {
        vscode.window.setStatusBarMessage('Test Launcher: Running all tests in file', 3000);

        if (vscode.window.activeTextEditor !== undefined) {
            const editor: vscode.TextEditor = vscode.window.activeTextEditor;

            const fileName = editor.document.fileName;

            issueCommand(fileName);
        }
    });

    context.subscriptions.push(runTestLine);
    context.subscriptions.push(runTestFile);

    function issueCommand(launcher_args: string): void {
        const terminal: vscode.Terminal = vscode.window.createTerminal('Run Test File');
        terminal.show();
        terminal.sendText(`test_launcher ${launcher_args}`);
    }
}

export function deactivate() {
}