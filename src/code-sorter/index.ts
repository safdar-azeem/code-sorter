import { removeEmptyLines } from "./utils/array.utils";
import { distributeFunctions, distributeVariables, extractElements, sortElements, } from "./helpers";

export const codeSorter = (lines: string[]): string[] => {
    const { imports, requires, variables, functions, interfaces, types, enums, others } = extractElements(removeEmptyLines(lines));

    const sortedVariables = [...Object.values(distributeVariables(variables)).map(sortElements)]
        .filter((item) => item.length > 0)
        .map((item) => [...item, ''])
        .flat();

    const sortedFunctions = [...Object.values(distributeFunctions(functions)).map(sortElements)]
        .filter((item) => item.length > 0)
        .map((item) => [...item, ''])
        .flat();

    const sortedElements = [
        sortElements(imports),
        sortElements(requires),
        sortElements(types),
        sortElements(enums),
        sortElements(interfaces),
        sortedVariables,
        sortedFunctions,
        sortElements(others),
    ].filter((item) => item.length > 0)
        .map((item) => [...item, ''])
        .flat();

    return sortedElements;
}