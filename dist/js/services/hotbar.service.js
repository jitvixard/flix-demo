"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotbarService = void 0;
var HotbarService = /** @class */ (function () {
    function HotbarService() {
        var _this = this;
        this.targetTranslate = 0;
        this.translateDistance = 0;
        this.translateFullDistance = 130;
        this.translateReducedDistance = 230;
        this.translateTimer = 0;
        this.cascadeInterval = function (index, startTime) {
            //console.log('firing interval')
            var translateFraction = _this.translateDistance / 100;
            var deltaTime = Date.now() - startTime;
            deltaTime = deltaTime > 100 ? 100 : deltaTime;
            var translateToSet = Math.round(translateFraction * deltaTime);
            if (_this.cascadingOn)
                translateToSet = _this.translateDistance - translateToSet;
            _this.hotbarCascadeOrder[index].forEach(function (ref) {
                ref.style.transform = 'translateY(' + translateToSet + '%)';
            });
            //console.log('[setting to :: ' + translateToSet + ']        [target is ::' + this.targetTranslate + ']')
            if (translateToSet === _this.targetTranslate) {
                clearInterval(_this.runningInterval);
                setTimeout(_this.cascadeNextColumn.bind(_this, index));
                return;
            }
        };
        this.hotbarRef = document.getElementById('hotbar');
        window.addEventListener('resize', function (e) { return _this.onResize(); });
        this.onResize();
    }
    HotbarService.prototype.cascadeOn = function () {
        this.cascade(true);
    };
    HotbarService.prototype.cascadeOff = function () {
        this.cascade(false);
    };
    HotbarService.prototype.cascade = function (on) {
        var index = on ? 0 : this.hotbarCascadeOrder.length - 1;
        this.cascadingOn = on;
        console.log('cascading from index::' + index);
        this.translateDistance = this.fullWidth ? 130 : 230;
        console.log('has a cascade distance of ' + this.translateDistance);
        this.targetTranslate = on ? 0 : this.translateDistance;
        console.log('moving to a translation of ' + this.targetTranslate);
        this.runningInterval = setInterval(this.cascadeInterval.bind(this, index, Date.now()), 10);
    };
    HotbarService.prototype.cascadeNextColumn = function (index) {
        index = this.cascadingOn ? index + 1 : index - 1;
        if (index < 0 || index >= this.hotbarCascadeOrder.length)
            return;
        this.runningInterval = setInterval(this.cascadeInterval.bind(this, index, Date.now()), 10);
    };
    HotbarService.prototype.onResize = function () {
        var fullWidthOnResize = window.innerWidth >= 1200;
        if (this.fullWidth != fullWidthOnResize) {
            this.hotbarCascadeOrder = fullWidthOnResize
                ? this.fullWidthOrder()
                : this.reducedWidthOrder();
        }
        this.fullWidth = fullWidthOnResize;
    };
    HotbarService.prototype.reducedWidthOrder = function () {
        var elementsInHotbar = document.getElementsByClassName('hotbar-item');
        return [
            [elementsInHotbar[0], elementsInHotbar[5]],
            [elementsInHotbar[1], elementsInHotbar[6]],
            [elementsInHotbar[2], elementsInHotbar[7]],
            [elementsInHotbar[3], elementsInHotbar[8]],
            [elementsInHotbar[4], elementsInHotbar[9]],
        ];
    };
    HotbarService.prototype.fullWidthOrder = function () {
        var elementsInHotbar = document.getElementsByClassName('hotbar-item');
        return [
            [elementsInHotbar[0]],
            [elementsInHotbar[1]],
            [elementsInHotbar[2]],
            [elementsInHotbar[3]],
            [elementsInHotbar[4]],
            [elementsInHotbar[5]],
            [elementsInHotbar[6]],
            [elementsInHotbar[7]],
            [elementsInHotbar[8]],
            [elementsInHotbar[9]],
        ];
    };
    return HotbarService;
}());
exports.HotbarService = HotbarService;
