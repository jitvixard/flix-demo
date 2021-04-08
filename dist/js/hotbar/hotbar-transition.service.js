"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotbarTransitionService = void 0;
var HotbarTransitionService = /** @class */ (function () {
    function HotbarTransitionService(elementsInOrder, animationLength, fullWidthDistance, reducedWidthDistance, axis) {
        var _this = this;
        this.elementsInOrder = elementsInOrder;
        this.animationLength = animationLength;
        this.fullWidthDistance = fullWidthDistance;
        this.reducedWidthDistance = reducedWidthDistance;
        this.axis = axis;
        this.setForElements = function (translate, opacity, elements) {
            return elements.forEach(function (element) {
                _this.setTranslate(element, translate);
                element.style.opacity = opacity.toString();
            });
        };
        this.setTranslate = function (element, value) {
            return (element.style.transform = 'translate' + _this.axis + '(' + value + '%)');
        };
        this.onPosition = true;
        this.target = 0;
        this.offPosition = 0;
        this.hotbar = document.getElementById('hotbar');
    }
    HotbarTransitionService.prototype.on = function () {
        this.prepForeOn();
        this.currentRoutine = setInterval(this.animate.bind(this, this.currentIndex, Date.now()), 5);
    };
    HotbarTransitionService.prototype.off = function () {
        this.prepForOff();
        this.currentRoutine = setInterval(this.animate.bind(this, this.currentIndex, Date.now()), 5);
    };
    HotbarTransitionService.prototype.updateWidth = function (fullWidth, newOrder) {
        var _this = this;
        if (newOrder !== undefined)
            this.elementsInOrder = newOrder;
        this.offPosition = fullWidth
            ? this.fullWidthDistance
            : this.reducedWidthDistance;
        this.current = this.onPosition ? 0 : this.offPosition;
        if (fullWidth && this.current <= this.fullWidthDistance) {
            var diff = this.reducedWidthDistance - this.fullWidthDistance;
            this.currentOfRow = this.current + diff;
            this.elementsInOrder.forEach(function (eArr) {
                eArr.forEach(function (element) { return _this.setTranslate(element, _this.current); });
            });
        }
    };
    HotbarTransitionService.prototype.animate = function (index, startTime) {
        var opacity = this.getOpacity(startTime, this.animationLength);
        if (this.current === this.target) {
            //end if at target
            clearInterval(this.currentRoutine);
            this.currentRoutine = setTimeout(this.moveOnToNextColumn.bind(this, index), this.animationLength);
            if (this.axis === 'Y') {
                this.setForElements(this.target, opacity, this.elementsInOrder[index]);
            }
            else if (this.axis === 'X') {
                this.setForElements(this.target, opacity, [this.hotbar]);
            }
            return;
        }
        var translateToSet = this.lerpBetweenCurrentAndTarget(startTime, this.animationLength);
        translateToSet = this.onPosition
            ? this.offPosition - translateToSet
            : translateToSet;
        if (this.axis === 'Y') {
            this.setForElements(translateToSet, opacity, this.elementsInOrder[index]);
        }
        else if (this.axis === 'X') {
            this.setForElements(translateToSet, opacity, [this.hotbar]);
        }
        this.current = translateToSet;
    };
    HotbarTransitionService.prototype.prepForeOn = function () {
        this.onPosition = true;
        this.currentIndex = 0;
        this.target = 0;
        this.currentOfRow = this.offPosition;
    };
    HotbarTransitionService.prototype.prepForOff = function () {
        this.onPosition = false;
        this.currentIndex = this.elementsInOrder.length - 1;
        this.target = this.offPosition;
        this.currentOfRow = 0;
    };
    HotbarTransitionService.prototype.moveOnToNextColumn = function (completedIndex) {
        clearTimeout(this.currentRoutine);
        completedIndex = this.onPosition ? ++completedIndex : --completedIndex;
        if (completedIndex === -1 ||
            completedIndex === this.elementsInOrder.length) {
            return;
        }
        this.current = this.currentOfRow;
        this.currentRoutine = setInterval(this.animate.bind(this, completedIndex, Date.now()), 5);
    };
    HotbarTransitionService.prototype.lerpBetweenCurrentAndTarget = function (startTime, interval) {
        var transformDistance = Math.abs(this.currentOfRow) + Math.abs(this.target);
        var fraction = transformDistance / interval;
        var deltaTime = Date.now() - startTime;
        deltaTime = deltaTime > interval ? interval : deltaTime;
        return Math.round(deltaTime * fraction);
    };
    HotbarTransitionService.prototype.getOpacity = function (startTime, interval) {
        var opac = (Date.now() - startTime) / interval;
        opac = opac > 1 ? 1 : opac;
        return this.onPosition ? opac : 1 - opac;
    };
    return HotbarTransitionService;
}());
exports.HotbarTransitionService = HotbarTransitionService;
