"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hotbar = void 0;
var hotbar_transition_service_1 = require("./hotbar-transition.service");
var Hotbar = /** @class */ (function () {
    function Hotbar() {
        var _this = this;
        this.targetTranslate = 0;
        this.translateDistance = 0;
        this.translateFullDistance = 130;
        this.translateReducedDistance = 230;
        this.hotbarRef = document.getElementById('hotbar');
        var cascadeOrder = window.innerWidth > 1200
            ? this.fullWidthOrder()
            : this.reducedWidthOrder();
        this.cascadeService = new hotbar_transition_service_1.HotbarTransitionService(cascadeOrder, 100, 130, 230, 'Y');
        this.fadeService = new hotbar_transition_service_1.HotbarTransitionService(this.getAllInOrder(), 1000, 1200, 700, 'X');
        window.addEventListener('resize', function (e) { return _this.onResize(); });
        this.onResize();
    }
    Hotbar.prototype.cascade = function (on) {
        if (on)
            this.cascadeService.on();
        else
            this.cascadeService.off();
    };
    Hotbar.prototype.fade = function (on) {
        if (on)
            this.fadeService.on();
        else
            this.fadeService.off();
    };
    Hotbar.prototype.onResize = function () {
        var fullWidthOnResize = window.innerWidth >= 1200;
        if (this.fullWidth != fullWidthOnResize) {
            //has changed?
            var cascadeOrder = fullWidthOnResize
                ? this.fullWidthOrder()
                : this.reducedWidthOrder();
            this.cascadeService.updateWidth(fullWidthOnResize, cascadeOrder);
            this.fadeService.updateWidth(fullWidthOnResize, undefined);
        }
    };
    Hotbar.prototype.reducedWidthOrder = function () {
        var elementsInHotbar = document.getElementsByClassName('hotbar-item');
        return [
            [elementsInHotbar[0], elementsInHotbar[5]],
            [elementsInHotbar[1], elementsInHotbar[6]],
            [elementsInHotbar[2], elementsInHotbar[7]],
            [elementsInHotbar[3], elementsInHotbar[8]],
            [elementsInHotbar[4], elementsInHotbar[9]],
        ];
    };
    Hotbar.prototype.fullWidthOrder = function () {
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
    Hotbar.prototype.getAllInOrder = function () {
        var elementsInHotbar = document.getElementsByClassName('hotbar-item');
        return [[
                elementsInHotbar[0],
                elementsInHotbar[1],
                elementsInHotbar[2],
                elementsInHotbar[3],
                elementsInHotbar[4],
                elementsInHotbar[5],
                elementsInHotbar[6],
                elementsInHotbar[7],
                elementsInHotbar[8],
                elementsInHotbar[9],
            ]];
    };
    return Hotbar;
}());
exports.Hotbar = Hotbar;
