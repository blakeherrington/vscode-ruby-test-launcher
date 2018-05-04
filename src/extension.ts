'use strict';

import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

    console.log('Lets go run ruby tests!');

    let runTestLine = vscode.commands.registerCommand('extension.runTestLine', () => {
        vscode.window.showInformationMessage('Running test from current line...');
    });

    let runTestFile = vscode.commands.registerCommand('extension.runTestFile', () => {
        vscode.window.showInformationMessage('Running all tests in current file...');
    });

    context.subscriptions.push(runTestLine);
    context.subscriptions.push(runTestFile);
}

export function deactivate() {
}