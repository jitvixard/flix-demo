export function calculateRemainingDuration(
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
  const opacityString = element.style.opacity;
  return opacityString === null || opacityString === ''
    ? 1
    : parseFloat(element.style.opacity);
}

export function getElementScale(element: HTMLElement) {
  return parseFloat(element.style.scale);
}

export function getElementTranslation(element: HTMLElement): number {
  let translationValue = element.style.transform.replace(/[^0-9$.,]/g, '');
  return translationValue ? parseFloat(translationValue) : 0;
}

export function isScreenFullWidth(): boolean {
  return window.innerWidth > 1200;
}

export function calculateHotBarColumns(): HTMLElement[][] {
  const elementsToColumn = isScreenFullWidth() ? 1 : 2;
  const columns = new Array<HTMLElement[]>();
  const elements = <HTMLElement[]>(
    (<any>document.getElementsByClassName('hotbar-item'))
  );
  let i = 0;
  let totalElements = 0;
  while (i < elements.length / elementsToColumn) {
    const column = new Array<HTMLElement>();
    let elementCount = 0;
    while (elementCount < elementsToColumn) {
      column[elementCount++] = elements[totalElements++];
    }
    columns[i++] = column;
  }
  return columns;
}
