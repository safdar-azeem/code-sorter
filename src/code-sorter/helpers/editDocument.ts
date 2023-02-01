import * as vscode from 'vscode';

export async function editDocument(document: vscode.TextDocument, newText: string) {
   const edit = new vscode.WorkspaceEdit();

   edit.replace(document.uri, new vscode.Range(0, 0, document.lineCount, 0), newText);

   await vscode.workspace.applyEdit(edit);

   await vscode.commands.executeCommand('editor.action.formatDocument');
}
