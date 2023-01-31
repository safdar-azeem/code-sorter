export function splitVueCode(code: string): {
   script: string;
   template: string;
   style: string;
} {
   const scriptRegex = /<script[^>]*>([\s\S]*?)<\/script>/;
   const templateRegex = /<template>([\s\S]*)<\/template>/;
   const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/;

   const scriptMatch = code.match(scriptRegex);
   const templateMatch = code.match(templateRegex);
   const styleMatch = code.match(styleRegex);

   const script = scriptMatch ? scriptMatch[1] : '';
   const template = templateMatch ? templateMatch[1] : '';
   const style = styleMatch ? styleMatch[1] : '';

   return { script, template, style };
}
