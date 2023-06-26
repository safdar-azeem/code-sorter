import { FunctionCategories } from "../types";
import { removeLastEmptyLines } from "../utils/string.utils";

export function distributeFunctions(functions: string[]): FunctionCategories {
    const categorizedFunctions = functions.reduce<FunctionCategories>(
        (accumulator, func) => {
            const cleanFunc = removeLastEmptyLines(func);
            if (cleanFunc.includes('=>') && !cleanFunc.includes('function')) {
                if (cleanFunc.includes('return')) {
                    accumulator.arrowFunctions.push(cleanFunc);
                } else {
                    accumulator.shorthandArrowFunctions.push(cleanFunc);
                }
            } else if (
                cleanFunc.includes('function') &&
                !['var', 'let', 'const'].some((keyword) => cleanFunc.includes(keyword))
            ) {
                accumulator.functionDeclarations.push(cleanFunc);
            } else {
                accumulator.functionExpressions.push(cleanFunc);
            }
            return accumulator;
        },
        {
            shorthandArrowFunctions: [],
            arrowFunctions: [],
            functionExpressions: [],
            functionDeclarations: [],
        }
    );

    return categorizedFunctions;
}