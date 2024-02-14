# Overview

The `code-sorter` extension is a powerful tool for organize and sort code elements in JavaScript and TypeScript files within Visual Studio Code. It greatly enhances code readability and maintainability by intelligently grouping and sorting various code snippets, such as `imports`, `variables`, `functions`, `interfaces`, `types`, `enums`, and more, in a structured manner.

<br>

# Features

![alt text](preview.gif)
<br/>
<br/>

The extension follows a specific order when grouping and sorting different types of code elements within a file:

1. Imports
2. Requires
3. Types
4. Enums
5. Interfaces
6. Variables
7. Functions
8. Others

## Subgroup Distribution

Once the code elements are grouped, the extension further divides certain groups into subgroups based on their characteristics. Each subgroup is then sorted by length to provide a consistent and logical arrangement.

### Imports or Requires

-  Export Imports (`export * from`)
-  Default and Named Imports (`import a from 'a'`)
-  Type Imports (`import type a from 'a'`)

### Variables

-  Documented Selectors (`const a = document.querySelector('a')`)
-  Undefined Variables (`const a;`)
-  Numbers (`const a = 1`)
-  Strings (`const a = 'a'`)
-  Arrays (`const a = []`)
-  Objects (`const a = {}`)
-  Function Calls (`const a = b()`)
-  Hooks (`const [a, setA] = useState()`)

### Functions

-  Shorthand Arrow Functions (`const sum = (a,b) => a + b`)
-  Arrow Functions (`const sum = (a,b) => { return a + b }`)
-  Function Expressions (`const sum = function(a,b) { return a + b }`)
-  Function Declarations (`function sum(a,b) { return a + b }`)

By organizing your code using this methodology, you'll greatly improve its readability and maintainability.

<br>

# Usage

To use the `codeSorter` extension, follow these steps:

1. Install the extension in Visual Studio Code.
2. Open a JavaScript or TypeScript file that you want to sort and organize.
3. Select the code you want to sort.
4. Open the Command Palette (press `Ctrl+Shift+P` or `Cmd+Shift+P`).
5. Search for the "Sort Code" command and select it.
6. The selected code will be sorted and organized according to the defined rules.

<br>
<br>

## Supported File Types

Currently this extension is primarily designed for JavaScript and TypeScript language. However, it can also be used with other langauges but to sort just single lines of codes
