export function capitalize(
  str: string,
  { autoLowerCase = false, firstLetterOnly = false } = {}
): string {
  if (autoLowerCase) str = str.toLowerCase();
  return str.replace(firstLetterOnly ? /^\S/g : /(^|\s)\S/g, match =>
    match.toUpperCase()
  );
}
