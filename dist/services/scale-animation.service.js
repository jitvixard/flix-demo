"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScaleAnimationService = void 0;
var rxjs_1 = require("rxjs");
var abstract_animation_service_1 = require("./abstract-animation.service");
var ScaleAnimationService = /** @class */ (function (_super) {
    __extends(ScaleAnimationService, _super);
    function ScaleAnimationService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ScaleAnimationService.prototype.scaleElement = function (elements, startScale, targetScale, interval) {
        if (elements.length === 0)
            return undefined;
        var currentScale = window.getElementScale(elements[0]);
        interval = this.getAdjustedInterval(startScale, currentScale, targetScale, interval);
        var timeoutId = setTimeout(this.translationAnimation.bind(this, elements, [currentScale, targetScale], [Date.now(), interval]), 5);
        var subject = new rxjs_1.BehaviorSubject(false);
        this.elementMap.set(elements, [subject, timeoutId]);
        return subject;
    };
    ScaleAnimationService.prototype.translationAnimation = function (elements, startAndEndScale, startTimeAndInterval) {
        var currentScale;
        var startScale = startAndEndScale[0];
        var targetScale = startAndEndScale[1];
        var startTime = startTimeAndInterval[0];
        var interval = startTimeAndInterval[1];
        elements.forEach(function (e) {
            currentScale = window.scaleElement(e, targetScale, startScale, startTime, interval);
        });
        if (currentScale.toFixed(2) === targetScale.toFixed(2))
            this.complete(elements);
        var observerIdTuple = this.elementMap.get(elements);
        observerIdTuple[1] = setTimeout(this.translationAnimation.bind(this, elements, startAndEndScale, startTimeAndInterval), 5);
        this.elementMap.set(elements, observerIdTuple);
    };
    return ScaleAnimationService;
}(abstract_animation_service_1.AbstractAnimationService));
exports.ScaleAnimationService = ScaleAnimationService;
