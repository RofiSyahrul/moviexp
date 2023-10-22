export default function stringifyNumber(
  value: number,
  entity: string,
  pluralForm?: string,
): string {
  const name = value > 1 ? pluralForm || entity + 's' : entity;
  return value + ' ' + name;
}
