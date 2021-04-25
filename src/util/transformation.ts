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
export function lerp(
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

function getElapsed(
  interval: number,
  startValue: number,
  currentValue: number,
  targetValue: number,
): number {
  return Math.round(
    (interval / Math.abs(targetValue - startValue)) *
      Math.abs(currentValue - startValue),
  );
}

/**
 * Assigning utility function to window.
 * This would usually be allocated in a static class,
 * but I decided to implement it this way for the exercise.
 */
(window as any).getElapsed = getElapsed;
