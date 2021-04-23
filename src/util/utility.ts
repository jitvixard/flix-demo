export function valueIsEqual(
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

export function calculateUpdatedDuration(
  idealStartPosition: number,
  currentPosition: number,
  targetPosition: number,
  interval: number,
) {
  let fullValue = Math.abs(targetPosition - idealStartPosition);
  let actualValue = Math.abs(targetPosition - currentPosition);
  return (interval / fullValue) * actualValue;
}
