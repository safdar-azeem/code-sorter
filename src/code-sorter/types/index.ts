export interface VariableCategories {
    undefinedVariables: string[];
    numbers: string[];
    strings: string[];
    arrays: string[];
    objects: string[];
    functionCalls: string[];
    hooks: string[];
    documentSelectors: string[];
}

export interface FunctionCategories {
    shorthandArrowFunctions: string[];
    arrowFunctions: string[];
    functionExpressions: string[];
    functionDeclarations: string[];
}

export interface ImportCategories {
    typeImports: string[];
    defaultImports: string[];
    exportImports: string[];
}

export interface ExtractedElements {
    imports: string[];
    requires: string[];
    variables: string[];
    functions: string[];
    interfaces: string[];
    types: string[];
    enums: string[];
    others: string[];
}
