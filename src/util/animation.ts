// ****** Translations ******//
function translateElement(
  elements: HTMLElement[],
  axis: string,
  startPosition: number,
  endPosistion: number,
  interval: number,
  startTime?: number,
  currentPosition?: number,
): void {
  if (startTime === undefined) startTime = Date.now();

  elements.forEach((element) => {
    currentPosition = window.setElementTransform(
      element,
      axis,
      endPosistion,
      startPosition,
      startTime,
      interval,
    );
  });

  if (currentPosition.toFixed(2) === endPosistion.toFixed(2))
    window.cancelAnimationFrame(elements[0]);
  else 
}

function enlargeElement(element: HTMLElement): number {}

// ****** Scaling ******//
function shrinkElement(element: HTMLElement): number {}

// ****** Appearance ******//
function fadeElement(fadeIn: boolean): number {}

// ****** Bindings ******//
(window as any).translateElement = translateElement;
(window as any).enlargeElement = enlargeElement;
(window as any).shrinkElement = shrinkElement;
(window as any).fadeElement = fadeElement;
