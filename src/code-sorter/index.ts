import { extractElements, sortElements } from './helpers';
import { sortDefinePropsProperties } from './helpers/sortDefinePropsProperties';
import { sortByStringLength } from './utils/string.utils';

export const codeSorter = (code: string | string[]): string => {
   let result = extractElements(code);

   result.defineProps = sortDefinePropsProperties(result?.defineProps);
   result.others = result.others.map((e) => sortByStringLength(e.split('\n')).join('\n'));

   const sortedResult = sortElements(result);

   return sortedResult;
};
