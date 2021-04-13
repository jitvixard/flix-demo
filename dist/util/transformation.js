"use strict";
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
function lerp(startTime, interval, startValue, targetValue) {
    var fraction = Math.abs(targetValue - startValue) / interval;
    var deltaTime = Date.now() - startTime;
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
function setElementTransform(element, axis, targetPosition, startPosition, startTime, interval) {
    axis = axis.toUpperCase();
    if (startPosition !== undefined &&
        startTime !== undefined &&
        interval !== undefined) {
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
function scaleElement(element, targetSize, startSize, startTime, interval) {
    if (startSize !== undefined &&
        startTime !== undefined &&
        interval !== undefined) {
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
function setElementOpacity(element, targetOpacity, startOpacity, startTime, interval) {
    if (startOpacity !== undefined &&
        startTime !== undefined &&
        interval !== undefined) {
        targetOpacity = lerp(startTime, interval, startOpacity, targetOpacity);
    }
    element.style.opacity = targetOpacity.toString();
    return targetOpacity;
}
function getElementTransform(element) {
    var exp = new RegExp('d+[.]d+');
    return parseFloat(exp.exec(element.style.transform)[0]);
}
function getElementOpacity(element) {
    return parseFloat(element.style.opacity);
}
function getElementScale(element) {
    return parseFloat(element.style.scale);
}
function getElapsed(interval, startValue, currentValue, targetValue) {
    return Math.round((interval / Math.abs(targetValue - startValue)) *
        Math.abs(currentValue - startValue));
}
/**
 * Assigning utility function to window.
 * This would usually be allocated in a static class,
 * but I decided to implement it this way for the exercise.
 */
window.lerp = lerp;
window.scaleElement = scaleElement;
window.setElementOpacity = setElementOpacity;
window.setElementTransform = setElementTransform;
window.getElementOpacity = getElementOpacity;
window.getElementScale = getElementScale;
window.getElapsed = getElapsed;
