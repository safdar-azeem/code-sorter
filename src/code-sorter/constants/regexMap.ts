import { IStatement } from '../types';

export const regexMap: Record<IStatement, RegExp[]> = {
   defineProps: [/\b(?:defineProps<|defineProps\(|withDefaults\()(\{[^}]*\})?/gm],
   defineEmits: [
      /^(?:export\s+)?(?:const|let|var)\s+((?:\[[^\]]*]\s*|\{[^}]*\}\s*|[\w\d_$]+)\s*(?:[,=]\s*(?:[\w\d_$]+))?)\s*=\s*defineEmits\s*\([\s\S]*?\);?(?![^{}]*})/gm,
   ],
   hooks: [
      /^(?:(?:export\s+)?(?:const|let|var)\s+((?:\[[^\]]*]\s*|\{[^}]*\}\s*|[\w\d_$]+)\s*(?:[,=]\s*(?:[\w\d_$]+))?)\s*=\s*(?!(defineProps|defineEmits)\b)(\w+)\([\s\S]*?\);?(?![^{}]*})|const\s+(\w+)\s*=\s*\w+<.*>\(.+$|const\s+\[\s*(\w+)\s*\]\s*=\s*\w+\(.+$|const\s+\[\s*(\w+)\s*\]\s*=\s*\w+<.*>\(.+$)|(let|var|const)\s+.*?\S+\.\w+\([^)]*\)$/gm,
   ],
   lifeCycles: [
      /\b(beforeCreate|created|beforeMount|mounted|beforeUpdate|updated|onMounted|beforeUnmount|unmounted)\b.*\(.*/gm,
   ],
   types: [/^type.*=.*$/gm],
   functionCalls: [
      /^(?<!\w\s*=\s*)\b(?!(?:if|else|while|for|switch|beforeCreate|created|beforeMount|mounted|beforeUpdate|updated|onMounted|beforeUnmount|unmounted)\s*\()([a-zA-Z_]\w*\s*\.\s*)?([a-zA-Z_]\w*\s*)\(\s*([^)]*\s*)/gm,
   ],
   ifElseSwitch: [/^((if|else|switch)\s*\(.*?\)\s*\{(?:.*\n?)*?(?:\}\s*else\s*\{(?:.*\n?)*?)?\}?)$/gm],
   loops: [/^((for|while|do)\s*\(.*?\)\s*\{(?:.*\n?)*?(?:\}\s*else\s*\{(?:.*\n?)*?)?\}?)$/gm],
   doWhileLoops: [/do\s*{\s*([\s\S]*?)\s*}\s*while\s*\(\s*([^)]*?)\s*\)(?![^{}]*});/gm],
   imports: [/\bimport\s*[\w{},\s*]+from\s*['"]([^'"]+)['"];?/gm],
   functions: [
      /^(?:const|let|var)?\s*([\w$]+)\s*=\s*(?:async\s*)?\(([^)]*)\)\s*=>|function\s+([\w$]+)\s*\(([^)]*)\)|const\s+([\w$]+)\s*=\s*\(([^)]*)\)\s*=>/gm,
   ],
   objects: [
      /(const|let)\s+\w+\s*=\s*\{|(const|let)\s+\w+\s*:\s*(?:\{[^{}]*\}|Record\s*<\s*\w+\s*,\s*\w+\s*>|(\w+\s*\|\s*)?(\w+))\s*=\s*\{[^{}]*\}|(?:const|let|var)?\s*\w+\s*=\s*\{(?:[^{}]|(?:\{[^{}]*\}))*\}\s*;?\s*$/gm,
   ],
   arrays: [
      /(const\s+(?:\[?[a-zA-Z0-9,\s\[\]]+\]?|(?:\w+\s*:\s*\w+\s*\[\s*\]))\s*=\s*\[(?:[^[\]]+|\[[^\]]+\])*\](?:\s*as\s*\w+\[\s*\])?)|(const\s+\w+\s*=\s*\[)|(const\s*\[.+?\]\s*=\s*\[)/g,
   ],

   interfaces: [/^(?:export\s+)?(?:interface\s+[A-Za-z_][A-Za-z0-9_]*\s*{[^}]*}?)\s*$/gm],
   conditionVariables: [
      /^\bconst\s+(\w+)\s*=\s*((?:(?!=>).)*(?:==|>|<|>=|<=|&&|\|\||\?|:|\+\+|--|!)\s*.*)\s*;?(?=[^\\]=>|\\?:)/gm,
   ],
   numberVariables: [/^(?:export\s+)?(?:(const|let|var)\s+\w+\s*=\s*[0-9]+)(?![^{}]*})/gm],
   stringVariables: [
      /^(?:export\s+)?(?:const\s+\w+\s*=\s*(`(?:[^`\\]*(?:\\.[^`\\]*)*)`|'(?:[^'\\]*(?:\\.[^'\\]*)*)'|"(?:[^"\\]*(?:\\.[^"\\]*)*)"))(?![^{}]*})/gm,
   ],
   booleanVariables: [/^(const|let|var)\s+\w+\s*=\s*(true|false)\s*;$/gm],
   nullVariables: [/^(?:export\s+)?(?:const|let|var)\s+(\w+)\s*=\s*null;?(?![^{}]*})/gm],
   undefinedVariables: [/^\b(const|let|var)\s+(\w+)\s*(?:=\s*(undefined))?\s*(?=(?:;|\n|$))(?![^{}]*})/gm],
   others: [],
};
