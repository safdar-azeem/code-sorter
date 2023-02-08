export function isStatementCompleted(str: string): boolean {
   const curlyBracketsOpen = (str.match(/{/g) || []).length;
   const curlyBracketsClose = (str.match(/}/g) || []).length;

   const roundBracketsOpen = (str.match(/\(/g) || []).length;
   const roundBracketsClose = (str.match(/\)/g) || []).length;

   const squareBracketsOpen = (str.match(/\[/g) || []).length;
   const squareBracketsClose = (str.match(/\]/g) || []).length;

   return (
      curlyBracketsOpen === curlyBracketsClose &&
      roundBracketsOpen === roundBracketsClose &&
      squareBracketsOpen === squareBracketsClose
   );
}

export function sortByStringLength(strings: string[]): string[] {
   return strings.sort((a, b) => a.length - b.length);
}
