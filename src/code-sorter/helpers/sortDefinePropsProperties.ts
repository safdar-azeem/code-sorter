import { isStatementCompleted, sortByStringLength } from '../utils/string.utils';

export function sortDefinePropsProperties(definePropsArray: string[]): string[] {
   const updatedDefinePropsArray: string[] = [];

   for (const defineProps of definePropsArray) {
      const regex = defineProps.includes('withDefaults') ? /{([^}]*)}/ : /{([\s\S]*)}/;
      const propsRegex = regex.exec(defineProps);
      if (propsRegex && propsRegex.length > 0) {
         const propsString = propsRegex[1].split('\n');

         let propValue = '';
         const props: string[] = [];
         propsString.forEach((e) => {
            const trimed = e.trim();
            const isPropertyCompleted = trimed.includes(':') && !!trimed.split(':')[1]?.trim();

            if (propValue && isPropertyCompleted && isStatementCompleted(propValue)) {
               props.push(propValue);
               propValue = '';
            }

            if (!propValue && isPropertyCompleted && isStatementCompleted(trimed) && trimed) {
               props.push(trimed);
            } else {
               propValue += trimed;
            }

            if (propValue && isPropertyCompleted && isStatementCompleted(propValue)) {
               props.push(propValue);
               propValue = '';
            }
         });
         if (propValue) {
            props.push(propValue);
            propValue = '';
         }
         const sortedProps = sortByStringLength(props);

         const updatedDefineProps = defineProps.replace(regex, `{\n\t${sortedProps.join('\n\t')}\n}`);
         updatedDefinePropsArray.push(updatedDefineProps);
      } else {
         updatedDefinePropsArray.push(defineProps);
      }
   }

   return updatedDefinePropsArray;
}
