export function sortElements(array: string[]): string[] {
    const newArray = array.sort((a: string, b: string) => a.length - b.length);

    const [singleLineValues, multiLinesValues] = newArray.reduce(
        (acc: [string[], string[]], item: string) => {
            if (item.includes('\n')) {
                acc[1].push(item, "");
            } else if (item !== '') {
                acc[0].push(item);
            }
            return acc;
        },
        [[], []]
    );

    if (singleLineValues.length > 0 && multiLinesValues.length > 0) {
        singleLineValues.push("");
    }

    if (multiLinesValues.length > 1) {
        multiLinesValues.pop();
    }

    return singleLineValues.concat(multiLinesValues);
}