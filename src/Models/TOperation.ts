// "formula" means plain formula, already compound like "10 + 3 - 5"
export type TOp = "+" | "-" | "*" | ":" | "formula";

let AllOperations: TOp[] = ["+", "-", "*", ":", "formula"];
export { AllOperations };
