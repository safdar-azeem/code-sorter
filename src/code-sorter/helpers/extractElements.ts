import { ExtractedElements } from "../types";
import { removeLastEmptyLines } from "../utils/string.utils";

export function extractElements(lines: string[]): ExtractedElements {
    const result: ExtractedElements = {
        imports: [],
        requires: [],
        variables: [],
        functions: [],
        interfaces: [],
        types: [],
        enums: [],
        others: [],
    };

    let currentBlock: string[] = [];
    let currentBlockType: string | null = null;
    let inFunctionBlock = false;

    const addCurrentBlockToResult = () => {
        if (currentBlockType !== null && currentBlock.length > 0) {
            // @ts-ignore
            result[currentBlockType as keyof typeof result].push(currentBlock.join('\n'));
        }
        currentBlock = [];
        currentBlockType = null;
        inFunctionBlock = false;
    };

    const processLine = (line: string) => {
        let lineForCondition = line.replace('export default', '');
        lineForCondition = lineForCondition.replace(/export(?!(\s*{\s*|\s*\*\s*)from)/g, "");
        lineForCondition = lineForCondition.replace(/\s+/g, ' ');

        if (line.includes('export default') || line.includes('export')) {
            lineForCondition = lineForCondition.trim();
        }

        if (lineForCondition.startsWith('import') || lineForCondition.startsWith('import type') || lineForCondition.startsWith('export * from')) {
            addCurrentBlockToResult();
            currentBlockType = 'imports';
            currentBlock.push(line);
        } else if (/^(const|let|var).*require/.test(lineForCondition)) {
            addCurrentBlockToResult();
            currentBlockType = 'requires';
            currentBlock.push(line);
        } else if (
            /^(function|const|let|var)\s*\w*\s*=\s*function/.test(lineForCondition) ||
            /^(function|const|let|var)\s*\w*\s*=\s*\(/.test(lineForCondition) ||
            /^function\s*\w*\s*\(/.test(lineForCondition) ||
            /^const\s*\w*\s*=\s*function/.test(lineForCondition)
        ) {
            addCurrentBlockToResult();
            currentBlockType = 'functions';
            inFunctionBlock = true;
            currentBlock.push(line);
        } else if (/^(const|let|var)/.test(lineForCondition) || currentBlockType === 'variables' && /^const|let|var/.test(lineForCondition)) {
            addCurrentBlockToResult();
            currentBlockType = 'variables';
            currentBlock.push(line);
        } else if (/^interface/.test(lineForCondition)) {
            addCurrentBlockToResult();
            currentBlockType = 'interfaces';
            currentBlock.push(line);
        } else if (/^type/.test(lineForCondition)) {
            addCurrentBlockToResult();
            currentBlockType = 'types';
            currentBlock.push(line);
        } else if (/^enum/.test(lineForCondition)) {
            addCurrentBlockToResult();
            currentBlockType = 'enums';
            currentBlock.push(line);
        } else if (inFunctionBlock) {
            currentBlock.push(line);
            if (line.endsWith('}')) {
                inFunctionBlock = false;
            }
        } else if (currentBlockType !== null) {
            currentBlock.push(line);
        } else {
            result.others.push(removeLastEmptyLines(line).trim());
        }
    };

    lines.forEach(processLine);
    addCurrentBlockToResult();

    return result;
}
