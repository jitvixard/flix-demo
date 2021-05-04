import { isNumeric } from 'rxjs/internal-compatibility';

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

export function getElementOpacity(element: HTMLElement): number {
  return parseFloat(element.style.opacity);
}

export function getElementScale(element: HTMLElement) {
  return parseFloat(element.style.scale);
}

export function getElementTranslation(element: HTMLElement) {
  let exp = new RegExp('d+[.]d+');
  return isNumeric(exp)
    ? parseFloat(exp.exec(element.style.transform)[0])
    : undefined;
}

export function isScreenFullWidth(): boolean {
  return window.innerWidth > 1200;
}
