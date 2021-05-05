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
  const scaleString = element.style.scale;
  return scaleString ? parseFloat(element.style.scale) : 1;
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
  const offset = elements.length / elementsToColumn;
  let i = 0;
  while (i < elements.length / elementsToColumn) {
    let entries = i;
    const column = new Array<HTMLElement>();
    while (column.length < elementsToColumn) {
      column.push(elements[entries]);
      entries += offset;
    }
    columns.push(column);
    i++;
  }
  return columns;
}

export function removeElement(element: HTMLElement) {
  const parent = element.parentElement;
  parent.removeChild(element);
}
