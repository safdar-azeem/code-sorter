import { regexMap } from '../constants/regexMap';
import { IStatement, IStatements } from '../types';
import { isStatementCompleted } from '../utils/string.utils';
import { matchRegex } from './matchRegex';

export function extractElements(code: string | string[]): IStatements {
   const result: IStatements = {
      imports: [],
      defineProps: [],
      defineEmits: [],
      stringVariables: [],
      booleanVariables: [],
      nullVariables: [],
      numberVariables: [],
      undefinedVariables: [],
      conditionVariables: [],
      ifElseSwitch: [],
      loops: [],
      doWhileLoops: [],
      objects: [],
      arrays: [],
      functions: [],
      functionCalls: [],
      hooks: [],
      types: [],
      interfaces: [],
      lifeCycles: [],
      others: [],
   };

   let currentContentType: IStatement | '' = '';
   let othersContentType: IStatement | '' = '';
   let currentStatement: string = '';
   let otherStatement: string = '';

   const lines: string[] = typeof code === 'string' ? (code + '\n').split('\n') : code;

   const captureStatement = (addLine = false, customType?: IStatement) => {
      const statement = otherStatement || currentStatement;
      const type = othersContentType || currentContentType || customType;

      if (statement.trim() !== '' && type) {
         result[type].push(statement.trim() + (addLine ? '\n' : ''));

         currentStatement = '';
         othersContentType = '';
         otherStatement = '';
         currentContentType = '';
      }
   };

   for (const line of lines) {
      let trimmedLine = line
         .trim()
         .replace(/^\s*(export|async)\s*/, '')
         .trim();

      if (/^(const|let|var)\s+/.test(trimmedLine)) {
         const trimmedLines = trimmedLine.split(' =');
         trimmedLines[0] = trimmedLines[0].replace(/:(.*?)*/g, '');
         trimmedLine = trimmedLines.join(' =').replace(/(\)(.*?) =>)|(\)(.*?)=>)/, ') =>');
      }

      if (currentStatement && !isStatementCompleted(currentStatement)) {
         currentStatement += line + '\n';
         continue;
      }

      const matchingRegex = matchRegex(trimmedLine, otherStatement);

      if (matchingRegex && isStatementCompleted(otherStatement)) {
         othersContentType = matchingRegex as IStatement;
         captureStatement();
         currentContentType = matchingRegex as IStatement;
         currentStatement = line + '\n';
      } else {
         if (trimmedLine) {
            othersContentType = '';
            currentContentType = '';
            otherStatement += line + '\n';
         }
      }

      if (currentStatement && currentContentType && isStatementCompleted(currentStatement)) {
         captureStatement();
      }
   }

   if (otherStatement) {
      captureStatement(true, 'others');
   }
   captureStatement();

   if (typeof code === 'string') {
      const matches = code.match(regexMap.doWhileLoops[0]) || [];
      result.doWhileLoops = matches;
   }

   return result;
}
