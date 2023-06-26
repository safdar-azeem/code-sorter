export function sortElements(array: string[]): string[] {
    const newArray = array.sort((a: string, b: string) => a.length - b.length);

    const [sortedArray, linesArray] = newArray.reduce(
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

    if (sortedArray.length > 0) {
        sortedArray.push("");
    }

    return sortedArray.concat(linesArray);
}