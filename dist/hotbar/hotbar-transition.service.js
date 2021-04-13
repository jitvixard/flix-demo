"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotbarTransitionService = void 0;
var HotbarTransitionService = /** @class */ (function () {
    function HotbarTransitionService(elementsInOrder, animationLength, fullWidthDistance, reducedWidthDistance, axis) {
        this.elementsInOrder = elementsInOrder;
        this.animationLength = animationLength;
        this.fullWidthDistance = fullWidthDistance;
        this.reducedWidthDistance = reducedWidthDistance;
        this.axis = axis;
        this.onPosition = true;
        this.targetPosition = 0;
        this.offPosition = 0;
        this.startingPosition = 0;
        this.hotbar = document.getElementById('hotbar');
    }
    HotbarTransitionService.prototype.on = function () {
        this.prepare(true);
        this.currentRoutine = setTimeout(this.animate.bind(this, this.currentIndex, Date.now()), 5);
    };
    HotbarTransitionService.prototype.off = function () {
        this.prepare(false);
        this.currentRoutine = setTimeout(this.animate.bind(this, this.currentIndex, Date.now()), 5);
    };
    HotbarTransitionService.prototype.updateWidth = function (fullWidth, newOrder) {
        var _this = this;
        if (newOrder !== undefined)
            this.elementsInOrder = newOrder;
        this.offPosition = fullWidth
            ? this.fullWidthDistance
            : this.reducedWidthDistance;
        this.startingPosition = this.onPosition ? 0 : this.offPosition;
        if (fullWidth && this.startingPosition <= this.fullWidthDistance) {
            this.elementsInOrder.forEach(function (eArr) {
                eArr.forEach(function (element) {
                    return window.setElementTransform(element, _this.axis, _this.startingPosition);
                });
            });
        }
    };
    HotbarTransitionService.prototype.animate = function (index, startTime) {
        var _this = this;
        clearTimeout(this.currentRoutine);
        var targetOpacity = this.onPosition ? 1 : 0;
        var startingOpactiy = Math.abs(targetOpacity - 1);
        var elementsToTransform = this.axis === 'Y' ? this.elementsInOrder[index] : [this.hotbar];
        var currentTransform;
        //setting the transform and opacity for each element
        elementsToTransform.forEach(function (element) {
            currentTransform = window.setElementTransform(element, _this.axis, _this.targetPosition, _this.startingPosition, startTime, _this.animationLength);
            window.setElementOpacity(element, targetOpacity, startingOpactiy, startTime, _this.animationLength);
        });
        if (currentTransform.toFixed(2) === this.targetPosition.toFixed(2)) {
            //end if at target
            console.log('stopping animation');
            this.currentRoutine = setTimeout(this.moveOnToNextColumn.bind(this, index), this.animationLength);
            return;
        }
        console.log(this.elementsInOrder[index][0].style.opacity);
        this.currentRoutine = setTimeout(this.animate.bind(this, index, startTime), 5);
    };
    HotbarTransitionService.prototype.prepare = function (on) {
        this.onPosition = on;
        this.currentIndex = on ? 0 : this.elementsInOrder.length - 1;
        this.targetPosition = on ? 0 : this.offPosition;
        this.startingPosition = on ? this.offPosition : 0;
    };
    HotbarTransitionService.prototype.moveOnToNextColumn = function (completedIndex) {
        clearTimeout(this.currentRoutine);
        completedIndex = this.onPosition ? ++completedIndex : --completedIndex;
        if (completedIndex === -1 ||
            completedIndex === this.elementsInOrder.length) {
            return;
        }
        this.currentRoutine = setInterval(this.animate.bind(this, completedIndex, Date.now()), 5);
    };
    return HotbarTransitionService;
}());
exports.HotbarTransitionService = HotbarTransitionService;
