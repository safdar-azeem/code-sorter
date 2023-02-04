import { IStatement } from '../types';
import { regexMap } from '../constants/regexMap';

export const matchRegex = (line: string, line2 = '') => {
   const matchingRegex = Object.keys(regexMap)?.find((key) => {
      let isMatched = false;
      regexMap[key as IStatement]?.forEach((regex) => {
         isMatched = !!(
            regex.test(line) ||
            line.match(regex)?.length ||
            regex.test(line2) ||
            line2.match(regex)?.length
         );
      });
      return isMatched;
   });
   return matchingRegex;
};
