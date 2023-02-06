import { sortByStringLength } from '../utils/string.utils';

export function sortHTMLAttributes(htmlTemplate: string): string {
   const elementRegExp =
      /<([\w-]+)(?:\s+(?:#[\w-]+(?:="[^"]*"|='[^']*'|=\{[^}]*\})?|:[\w-]+=(?:"[^"]*"|'[^']*')|[\w-]+(?:=(?:"[^"]*"|'[^']*'|[^\s"'=<>`])?)?))*\s*(?:\/?>|>)/gm;

   let index = 0;

   return htmlTemplate.replace(elementRegExp, (match, tagName) => {
      const tagAndSignsRegex = new RegExp('>$|/>|' + `<${tagName}`, 'g');
      const attributes = match.replace(tagAndSignsRegex, '').trim();

      const regex = /\s*([^\s=]+)(?:="([^"]*)")?/g;
      const attributesValues = (attributes.match(regex) || []).map((e: string) => {
         const value = e.trim();
         if (/^:?(class|className)\b/.test(value)) {
            return value.replace(/\n\s*/g, ' ');
         }
         return value;
      });

      if (attributes.length > 0) {
         const tagNameRegExp = new RegExp('.*' + tagName, 'g');
         const tagMatches = htmlTemplate.match(tagNameRegExp) || [];

         const hasLongAttributes = attributes.length > 55;
         const hasManyAttributes = attributesValues.length > 2;

         const tagNamePrefix = tagMatches.length > index ? tagMatches[index] : tagMatches[0];

         const tabLength = tagNamePrefix?.replace(tagName, '')?.length;
         const tabSpace = ' '.repeat(tabLength || 0);

         const sortedAttributes = sortByStringLength(attributesValues);
         const joinDelimiter = hasLongAttributes ? `\n${tabSpace}` : ' ';

         const joinedAttributes = sortByStringLength(sortedAttributes).join(joinDelimiter);

         index += 1;

         const closingTag = match.endsWith('/>') ? '/>' : '>';

         return `<${tagName} ${hasLongAttributes && hasManyAttributes ? `\n${tabSpace}` : ''}${joinedAttributes} ${closingTag}`;
      } else {
         return `<${tagName}>`;
      }
   });
}
