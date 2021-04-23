export function cssValueIsEqual(
  valueA: number | string,
  valueB: number | string,
): boolean {
  let numA: number;
  let numB: number;

  if (typeof valueA === 'string') {
    numA = parseFloat(valueA);
  }
  if (typeof valueB === 'string') {
    numB = parseFloat(valueB);
  }

  return numA.toFixed(2) === numB.toFixed(2);
}
