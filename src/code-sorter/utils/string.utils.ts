export const removeLastEmptyLines = (str: string): string => str.replace(/\n+$/, '');

export const isDocuemntSelectorRegex = /^(?:let|const)\s*\w+\s*=\s*(?:document\.querySelector|document\.getElementsBy\w+|document\.getElementById|document\.querySelectorAll)\(['"][\.\w-]+['"]\);$/;

