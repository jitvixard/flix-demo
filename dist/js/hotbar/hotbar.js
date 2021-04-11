"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hotbar = void 0;
var hotbar_item_service_1 = require("./hotbar-item.service");
var hotbar_selection_service_1 = require("./hotbar-selection.service");
var hotbar_transition_service_1 = require("./hotbar-transition.service");
var Hotbar = /** @class */ (function () {
    function Hotbar() {
        this.targetTranslate = 0;
        this.translateDistance = 0;
        this.translateFullDistance = 130;
        this.translateReducedDistance = 230;
        this.getHotbarElements = function (fullwidth) {
            var elementsInHotbar = document.getElementsByClassName('hotbar-item');
            if (fullwidth === undefined) {
                //getting all elements in order
                return [
                    [
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
                    ],
                ];
            }
            if (fullwidth) {
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
            }
            else {
                return [
                    [elementsInHotbar[0], elementsInHotbar[5]],
                    [elementsInHotbar[1], elementsInHotbar[6]],
                    [elementsInHotbar[2], elementsInHotbar[7]],
                    [elementsInHotbar[3], elementsInHotbar[8]],
                    [elementsInHotbar[4], elementsInHotbar[9]],
                ];
            }
        };
        this.hotbarRef = document.getElementById('hotbar');
        var cascadeOrder = this.getHotbarElements(window.innerWidth > 1200);
        this.itemService = new hotbar_item_service_1.HotbarItemService();
        this.selectService = new hotbar_selection_service_1.HotbarSelectionService(this.getHotbarElements()[0]);
        this.cascadeService = new hotbar_transition_service_1.HotbarTransitionService(cascadeOrder, 100, 130, 230, 'Y');
        this.fadeService = new hotbar_transition_service_1.HotbarTransitionService(this.getHotbarElements(), 1000, 1200, 700, 'X');
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
    Hotbar.prototype.add = function (item, atIndex) {
        this.itemService.add(item, atIndex);
    };
    Hotbar.prototype.resize = function () {
        console.log('resizing');
        var fullWidthOnResize = window.innerWidth >= 1200;
        if (this.fullWidth != fullWidthOnResize) {
            //has changed?
            var cascadeOrder = this.getHotbarElements(fullWidthOnResize);
            this.cascadeService.updateWidth(fullWidthOnResize, cascadeOrder);
            this.fadeService.updateWidth(fullWidthOnResize, undefined);
        }
    };
    Hotbar.prototype.select = function (index, element) {
        if (element !== undefined)
            this.selectService.selectElement(element);
        else if (index !== undefined)
            this.selectService.selectAtIndex(index);
    };
    return Hotbar;
}());
exports.Hotbar = Hotbar;
