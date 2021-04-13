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
exports.TranslationAnimationService = void 0;
var rxjs_1 = require("rxjs");
var abstract_animation_service_1 = require("./abstract-animation.service");
var TranslationAnimationService = /** @class */ (function (_super) {
    __extends(TranslationAnimationService, _super);
    function TranslationAnimationService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TranslationAnimationService.prototype.translateElement = function (elements, startPosition, targetPosition, interval, axis) {
        if (elements.length === 0)
            return undefined;
        var currentPosition = window.getElementTransform(elements[0]);
        interval = this.getAdjustedInterval(startPosition, currentPosition, targetPosition, interval);
        var timeoutId = setTimeout(this.translationAnimation.bind(this, elements, [currentPosition, targetPosition], [Date.now(), interval], axis), 5);
        var subject = new rxjs_1.BehaviorSubject(false);
        this.elementMap.set(elements, [subject, timeoutId]);
        return subject;
    };
    TranslationAnimationService.prototype.translationAnimation = function (elements, startAndEndPosition, startTimeAndInterval, axis) {
        var currentTransform;
        var startPosition = startAndEndPosition[0];
        var targetPosition = startAndEndPosition[1];
        var startTime = startTimeAndInterval[0];
        var interval = startTimeAndInterval[1];
        elements.forEach(function (e) {
            currentTransform = window.setElementTransform(e, axis.toUpperCase(), targetPosition, startPosition, startTime, interval);
        });
        if (currentTransform.toFixed(2) === targetPosition.toFixed(2))
            this.complete(elements);
        var observerIdTuple = this.elementMap.get(elements);
        observerIdTuple[1] = setTimeout(this.translationAnimation.bind(this, elements, startAndEndPosition, startTimeAndInterval, axis), 5);
        this.elementMap.set(elements, observerIdTuple);
    };
    return TranslationAnimationService;
}(abstract_animation_service_1.AbstractAnimationService));
exports.TranslationAnimationService = TranslationAnimationService;
