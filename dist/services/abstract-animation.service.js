"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractAnimationService = void 0;
var AbstractAnimationService = /** @class */ (function () {
    function AbstractAnimationService() {
        this.elementMap = new Map();
        this.getAdjustedInterval = function (idealStartPosition, currentPosition, targetPosition, interval) {
            var fullValue = Math.abs(targetPosition - idealStartPosition);
            var actualValue = Math.abs(targetPosition - currentPosition);
            return (interval / fullValue) * actualValue;
        };
        this.getObservableFromMap = function (elements, storageMap) {
            if (storageMap.has(elements))
                return storageMap.get(elements)[0];
            else
                return undefined;
        };
    }
    AbstractAnimationService.prototype.complete = function (elements) {
        this.getObservableFromMap(elements, this.elementMap).next(true);
        this.elementMap.delete(elements);
    };
    return AbstractAnimationService;
}());
exports.AbstractAnimationService = AbstractAnimationService;
