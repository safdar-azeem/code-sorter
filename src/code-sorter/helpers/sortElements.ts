import { IStatement, IStatements } from '../types';
import { sortByStringLength } from '../utils/string.utils';

export function sortElements(statements: IStatements): string {
   const statementOrder: IStatement[] = [
      'imports',
      'types',
      'interfaces',
      'defineProps',
      'defineEmits',
      'nullVariables',
      'undefinedVariables',
      'booleanVariables',
      'numberVariables',
      'stringVariables',
      'arrays',
      'conditionVariables',
      'hooks',
      'objects',
      'functions',
      'functionCalls',
      'loops',
      'doWhileLoops',
      'ifElseSwitch',
      'lifeCycles',
      'others',
   ];
   const addSpaceBetween: IStatement[] = [
      'defineProps',
      'functions',
      'lifeCycles',
      'loops',
      'ifElseSwitch',
      'objects',
   ];

   let result = '';
   statementOrder?.forEach((key: IStatement) => {
      const statement = statements[key as IStatement] as string[];
      if (statement.length) {
         const joined = addSpaceBetween.includes(key) ? '\n\n' : '\n';
         result += sortByStringLength(statement).join(joined) + '\n\n';
      }
   });

   result = result.replace(/\n\s*$/, '');

   return result;
}
