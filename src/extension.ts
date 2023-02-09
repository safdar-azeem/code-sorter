import * as vscode from 'vscode';
import { codeSortCommand } from './code-sorter/commands/codeSort.command';

export function deactivate() {}
export function activate(context: vscode.ExtensionContext) {
   const commands = [codeSortCommand];
   context.subscriptions.push(...commands);
}
