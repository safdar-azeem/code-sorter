import { VariableCategories } from "../types";
import { removeLastEmptyLines } from '../utils/string.utils';

export function distributeVariables(variables: string[]): VariableCategories {
    const categorizedVariables = variables.reduce<VariableCategories>(
        (accumulator, variable) => {
            const cleanVariable = removeLastEmptyLines(variable);

            if (cleanVariable.includes('(') && cleanVariable.includes(')')) {
                if (cleanVariable.includes('use') || cleanVariable.includes('ref()')) {
                    accumulator.hooks.push(cleanVariable);
                } else {
                    accumulator.functionCalls.push(cleanVariable);
                }
            } else if (
                /^(?:export\s+)?(?:const|let|var)\s+\w+\s*=.*\{.*\};?$/.test(cleanVariable) ||
                (cleanVariable.includes('{') && cleanVariable.includes('}'))
            ) {
                accumulator.objects.push(cleanVariable);
            } else if (
                /^(?:export\s+)?(?:const|let|var)\s+\w+\s*=.*"(?:[^"\\]|\\.)*";?$/.test(cleanVariable)
            ) {
                accumulator.strings.push(cleanVariable);
            } else if (
                /^(?:export\s+)?(?:const|let|var)\s+\w+\s*=.*\d+;?$/.test(cleanVariable)
            ) {
                accumulator.numbers.push(cleanVariable);
            } else if (
                /^(?:export\s+)?(?:const|let|var)\s+\w+\s*=.*\[.*\];?$/.test(cleanVariable)
            ) {
                accumulator.arrays.push(cleanVariable);
            } else {
                accumulator.undefinedVariables.push(cleanVariable);
            }

            return accumulator;
        },
        {
            undefinedVariables: [],
            numbers: [],
            strings: [],
            arrays: [],
            objects: [],
            functionCalls: [],
            hooks: [],
        }
    );

    return categorizedVariables;
}
