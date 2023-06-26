import * as vscode from 'vscode';
import { codeSorter } from '..';

export const codeSortCommand = vscode.commands.registerCommand(
    'codeSorter.codeSort',
    () => {

        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showInformationMessage('No editor is active');
            return;
        }
        const selection = editor.selection;

        if (editor.selection.isEmpty) {
            return vscode.window.showInformationMessage('No text selected');
        }

        let text: string = editor.document.getText(editor.selection);

        const workspaceEdit = new vscode.WorkspaceEdit();
        const documentUri = editor.document.uri;

        const lines = text.split('\n');

        const sortedElements = codeSorter(lines);

        workspaceEdit.replace(
            documentUri,
            selection,
            sortedElements.join('\n')
        );

        vscode.workspace.applyEdit(workspaceEdit).then(() => {
            vscode.commands.executeCommand('editor.action.formatDocument');
        });
    }
);