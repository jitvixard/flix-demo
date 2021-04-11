/**
 * @param startTime Starting time of interpolation (time in millis)
 * @param interval  Length of the interpolation (time in millis)
 * @param startValue  Starting position/value of interpolation
 * @param targetValue Target value of interpolation
 *
 * @returns Interpolated value based on the current time in millis
 *
 * Function assigned to the `window` to allow for global interpolation
 */
function lerp(
  startTime: number,
  interval: number,
  startValue: number,
  targetValue: number,
): number {
  const fraction = Math.abs(targetValue - startValue) / interval;
  let deltaTime = Date.now() - startTime;
  deltaTime = deltaTime > interval ? interval : deltaTime;
  return startValue > targetValue
    ? startValue - deltaTime * fraction
    : startValue + deltaTime * fraction;
}

/**
 * @param element Element to set Tansform of
 * @param axis  Axis of Tran
 * @param targetPosition  Target transform position
 * @param startPosition Starting transform position
 * @param startTime Start time of interpolation
 * @param interval  Interval to interpolate over
 *
 * @returns Position element is now at (%)
 */
function setElementTransform(
  element: HTMLElement,
  axis: string,
  targetPosition: number,
  startPosition?: number,
  startTime?: number,
  interval?: number,
) {
  axis = axis.toUpperCase();

  if (
    startPosition !== undefined &&
    startTime !== undefined &&
    interval !== undefined
  ) {
    targetPosition = lerp(startTime, interval, startPosition, targetPosition);
  }

  element.style.transform = 'translate' + axis + '(' + targetPosition + '%)';
  return targetPosition;
}

/**
 * @param element Element to be scaled
 * @param targetSize Scale Element is to be set to
 * @param startSize Optional parameter. Starting scale of element.
 * @param startTime Optional parameter. Starting time of interpolation.
 * @param interval Optional parameter. Used in interpolation.
 *
 * Will set the scale of the element to the specified value.
 * Will use interpolation if startSize & interval are present.
 * Sets to a maximum accuracy of 2 decimal places.
 *
 * @returns New scale of the element.
 */
function scaleElement(
  element: HTMLElement,
  targetSize: number,
  startSize?: number,
  startTime?: number,
  interval?: number,
): number {
  if (
    startSize !== undefined &&
    startTime !== undefined &&
    interval !== undefined
  ) {
    targetSize = lerp(startTime, interval, startSize, targetSize);
  }

  element.style.scale = targetSize.toFixed(2);
  return targetSize;
}

/**
 * @param element Element to set the opacity on
 * @param targetOpacity Target Opacity
 * @param startOpacity Starting Opacity (optional)
 * @param startTime  Starting Time (Optional)
 * @param interval Interval (only to use when Lerping)
 *
 * Sets the elements opacity. Will lerp if all optional parameters
 * are available.
 *
 * @returns Opacity Set
 */
function setElementOpacity(
  element: HTMLElement,
  targetOpacity: number,
  startOpacity?: number,
  startTime?: number,
  interval?: number,
): number {
  if (
    startOpacity !== undefined &&
    startTime !== undefined &&
    interval !== undefined
  ) {
    targetOpacity = lerp(startTime, interval, startOpacity, targetOpacity);
  }

  element.style.opacity = targetOpacity.toString();
  return targetOpacity;
}

/**
 * Assigning utility function to window.
 * This would usually be allocated in a static class,
 * but I decided to implement it this way for the exercise.
 */
(window as any).lerp = lerp;
(window as any).scaleElement = scaleElement;
(window as any).setElementOpacity = setElementOpacity;
(window as any).setElementTransform = setElementTransform;
