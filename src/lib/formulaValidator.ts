export function validateFormula(formula: string): string[] {
  const errors: string[] = [];

  // Check for balanced parentheses
  let parenCount = 0;
  let bracketCount = 0;

  for (const char of formula) {
    if (char === '(') parenCount++;
    if (char === ')') parenCount--;
    if (char === '[') bracketCount++;
    if (char === ']') bracketCount--;

    if (parenCount < 0) {
      errors.push("Parêntese de fechamento ')' sem abertura correspondente");
      break;
    }
    if (bracketCount < 0) {
      errors.push("Colchete de fechamento ']' sem abertura correspondente");
      break;
    }
  }

  if (parenCount > 0) {
    errors.push(`${parenCount} parêntese(s) '(' não fechado(s)`);
  }
  if (bracketCount > 0) {
    errors.push(`${bracketCount} colchete(s) '[' não fechado(s)`);
  }

  return errors;
}
