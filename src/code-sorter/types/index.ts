export interface FunctionCategories {
   arrowFunctions: string[];
   functionExpressions: string[];
   functionDeclarations: string[];
}

export type IStatement =
   | 'hooks'
   | 'types'
   | 'loops'
   | 'arrays'
   | 'others'
   | 'imports'
   | 'objects'
   | 'functions'
   | 'interfaces'
   | 'lifeCycles'
   | 'defineEmits'
   | 'defineProps'
   | 'ifElseSwitch'
   | 'doWhileLoops'
   | 'nullVariables'
   | 'functionCalls'
   | 'numberVariables'
   | 'stringVariables'
   | 'booleanVariables'
   | 'undefinedVariables'
   | 'conditionVariables';

export type IStatements = Record<IStatement, string[]>;
