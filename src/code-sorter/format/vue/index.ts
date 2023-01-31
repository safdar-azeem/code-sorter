import * as vscode from 'vscode';
import { codeSorter } from '../..';
import { editDocument } from '../../helpers/editDocument';
import { sortHTMLAttributes } from '../../helpers/sortHTMLAttributes';
import { splitVueCode } from './splitVueCode';

export const formatVue = async (document: vscode.TextDocument) => {
   const code = document.getText();

   const { script, template, style } = splitVueCode(code);
   let result = '';

   if (script?.trim()) {
      const sortedElements = codeSorter(script);
      const scriptTag = (code.match(/<script.*/) || [])[0];
      result += `${scriptTag}\n${sortedElements}\n</script>`;
   }

   const templateCode = template.trim() ? `<template> ${sortHTMLAttributes(template)} </template>` : '';
   result += result ? `\n\n${templateCode}` : templateCode;

   if (style?.trim()) {
      const styleTag = (code.match(/<style.*/) || [])[0];
      const stylCode = `${styleTag}\n${style}\n</style>`;
      result += result ? `\n\n${stylCode}` : stylCode;
   }

   await editDocument(document, result);
};
