"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotbarSelectionService = void 0;
var HotbarSelectionService = /** @class */ (function () {
    function HotbarSelectionService(hotbarItems, animationLength) {
        var _this = this;
        this.hotbarItems = hotbarItems;
        this.animationLength = animationLength;
        this.selectedClassName = 'selected';
        this.animationMap = new Map();
        this.createSelectionElement = function () {
            var div = document.createElement('div');
            div.className = _this.selectedClassName;
            window.setElementOpacity(div, 0);
            return div;
        };
    }
    HotbarSelectionService.prototype.selectAtIndex = function (index) {
        if (index >= this.hotbarItems.length || index < 0)
            return;
        this.selectElement(this.hotbarItems[index]);
    };
    HotbarSelectionService.prototype.selectElement = function (element) {
        //if this is not a hotbar item stop
        if (element.className !== 'hotbar-item')
            return;
        //deselect previous item
        if (this.currentlySelected !== undefined) {
            this.deselect();
        }
        if (this.currentlySelected === element)
            return;
        var selectionElement = this.createSelectionElement();
        element.appendChild(selectionElement);
        this.currentlySelected = element;
        var iconElement = this.currentlySelected.getElementsByTagName('img')[0];
        this.addAnimation(this.currentlySelected, setTimeout(this.selectAnimation.bind(this, [selectionElement, iconElement], true, Date.now()), 5));
    };
    HotbarSelectionService.prototype.deselect = function () {
        if (this.animationMap.has(this.currentlySelected)) {
            this.interruptAnimation(this.currentlySelected);
            return;
        }
        this.animationMap.set(this.currentlySelected, setTimeout(this.selectAnimation.bind(this, this.getHighlightIconTuple(this.currentlySelected), false, Date.now())));
    };
    HotbarSelectionService.prototype.selectAnimation = function (highlightIconTuple, selecting, startTime, startingOpacityAndScaleTuple) {
        var startingOpacity;
        var startingScale;
        if (startingOpacityAndScaleTuple !== undefined) {
            startingOpacity = startingOpacityAndScaleTuple[0];
            startingScale = startingOpacityAndScaleTuple[1];
        }
        var targetOpacity = selecting ? 1 : 0;
        var targetScale = selecting ? 1.25 : 1;
        var interval = this.animationLength;
        if (startingScale !== undefined && startingOpacity !== undefined) {
            var startValueToPass = targetScale === 1.25 ? 1 : 1.25;
            interval = interval = getElapsed(interval, startValueToPass, startingScale, targetScale);
        }
        var highlightElement = highlightIconTuple[0];
        var iconElement = highlightIconTuple[1];
        if (startingOpacity === undefined)
            startingOpacity = selecting ? 0 : 1;
        if (startingScale === undefined)
            startingScale = selecting ? 1 : 1.25;
        var currentOpacity;
        if (highlightElement !== undefined) {
            currentOpacity = window.setElementOpacity(highlightElement, targetOpacity, startingOpacity, startTime, interval);
        }
        var currentScale;
        if (iconElement !== undefined) {
            currentScale = window.scaleElement(iconElement, targetScale, startingScale, startTime, interval);
        }
        if (highlightElement !== undefined)
            this.stopAnimation(highlightElement.parentElement);
        else if (iconElement !== undefined)
            this.stopAnimation(iconElement.parentElement.parentElement);
        if ((currentScale !== undefined && currentScale >= targetScale) ||
            (currentOpacity !== undefined && currentOpacity >= targetOpacity)) {
            if (highlightElement !== undefined)
                window.setElementOpacity(highlightElement, targetOpacity);
            if (iconElement !== undefined)
                window.scaleElement(iconElement, targetScale);
            if (!selecting) {
                highlightElement.parentElement.removeChild(highlightElement);
            }
            return;
        }
        this.animationMap.set(highlightElement.parentElement, setTimeout(this.selectAnimation.bind(this, highlightIconTuple, selecting, startTime, startingOpacityAndScaleTuple)));
    };
    HotbarSelectionService.prototype.interruptAnimation = function (element) {
        var highlightElement = element.getElementsByClassName(this.selectedClassName)[0];
        var iconElement = element.getElementsByTagName('img')[0];
        var currentOpacity;
        var currentScale;
        if (highlightElement !== undefined)
            currentOpacity = window.getElementOpacity(highlightElement);
        if (iconElement !== undefined)
            currentScale = window.getElementScale(iconElement);
        this.animationMap.set(element, setTimeout(this.selectAnimation.bind(this, [highlightElement, iconElement], false, Date.now(), [currentOpacity, currentScale])));
    };
    HotbarSelectionService.prototype.addAnimation = function (element, id) {
        this.stopAnimation(element);
        this.animationMap.set(element, id);
    };
    HotbarSelectionService.prototype.stopAnimation = function (element) {
        if (this.animationMap.has(element)) {
            clearTimeout(this.animationMap.get(element));
            this.animationMap.delete(element);
        }
    };
    HotbarSelectionService.prototype.getHighlightIconTuple = function (element) {
        var highlightElement = element.getElementsByClassName(this.selectedClassName)[0];
        var iconElement = element.getElementsByTagName('img')[0];
        return [highlightElement, iconElement];
    };
    return HotbarSelectionService;
}());
exports.HotbarSelectionService = HotbarSelectionService;
