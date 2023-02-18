import { extractElements, sortElements } from './helpers';
import { sortByStringLength } from './utils/string.utils';
import { sortDefinePropsProperties } from './helpers/sortDefinePropsProperties';

export const codeSorter = (code: string | string[]): string => {
   let result = extractElements(code);

   result.defineProps = sortDefinePropsProperties(result?.defineProps);
   result.others = result.others.map((e) => sortByStringLength(e.split('\n')).join('\n'));

   const sortedResult = sortElements(result);

   return sortedResult;
};
