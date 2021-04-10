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

(window as any).lerp = lerp;
