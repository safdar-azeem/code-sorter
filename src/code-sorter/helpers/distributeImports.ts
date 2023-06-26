import { ImportCategories } from "../types";
import { removeLastEmptyLines } from "../utils/string.utils";


export function distributeImports(imports: string[]): ImportCategories {
    const categorizedImports = imports.reduce<ImportCategories>(
        (accumulator, item) => {
            const cleanItem = removeLastEmptyLines(item);

            if (cleanItem.includes('import type')) {
                accumulator.typeImports.push(cleanItem);
            } else if (cleanItem.includes('export * from') || cleanItem.includes('export {')) {
                accumulator.exportImports.push(cleanItem);
            } else if (cleanItem.includes('import')) {
                accumulator.defaultImports.push(cleanItem);
            }

            return accumulator;
        },
        {
            exportImports: [],
            defaultImports: [],
            typeImports: [],
        }
    );

    return categorizedImports;
}