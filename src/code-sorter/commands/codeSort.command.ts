import * as vscode from 'vscode';
import { codeSorter } from '..';
import { formatVue } from '../format/vue';

export const codeSortCommand = vscode.commands.registerCommand('codeSorter.codeSort', async () => {
   const editor = vscode.window.activeTextEditor;
   if (!editor) {
      vscode.window.showInformationMessage('No editor is active');
      return;
   }
   const selection = editor.selection;

   if (editor.selection.isEmpty && editor.document.languageId === 'vue') {
      await formatVue(editor.document);
   } else if (editor.selection.isEmpty) {
      vscode.window.showInformationMessage('No text selected');
   } else {
      let text: string = editor.document.getText(editor.selection);

      const workspaceEdit = new vscode.WorkspaceEdit();
      const documentUri = editor.document.uri;

      const lines = text.split('\n');

      const sortedElements = codeSorter(lines);

      workspaceEdit.replace(documentUri, selection, sortedElements);

      vscode.workspace.applyEdit(workspaceEdit).then(() => {
         vscode.commands.executeCommand('editor.action.formatDocument');
      });
   }
});
