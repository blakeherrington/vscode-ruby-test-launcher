'use strict';

import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

    let terminal: vscode.Terminal;
    const TERMINAL_NAME: string = 'Ruby Test Launcher';

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

    let rerunLastTest = vscode.commands.registerCommand('extension.rerunLastTest', () => {
        vscode.window.setStatusBarMessage('Test Launcher: Rerunning last test', 3000);

        if (vscode.window.activeTextEditor !== undefined) {
            issueCommand('--rerun');
        }
    });

    context.subscriptions.push(runTestLine);
    context.subscriptions.push(runTestFile);
    context.subscriptions.push(rerunLastTest);

    function issueCommand(launcherArgs: string): void {
        const terminal = findOrCreateTerminal();

        terminal.show();
        terminal.sendText('clear');

        const launcherOptions = vscode.workspace.getConfiguration().get('rubyTestLauncher.disableSpring') ? '--disable-spring' : ''
        terminal.sendText(`test_launcher ${launcherArgs} ${launcherOptions}`);
    }

    function findOrCreateTerminal(): vscode.Terminal {
        if (terminal === undefined) {
            terminal = vscode.window.createTerminal(TERMINAL_NAME);
        }

        return terminal;
    }
}

export function deactivate() {
}
