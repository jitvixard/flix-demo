"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotbarItemService = void 0;
require("../util/transformation");
var HotbarItemService = /** @class */ (function () {
    function HotbarItemService() {
        var _this = this;
        this.intervalMap = new Map();
        this.currentScale = 1;
        this.upsert = function (item, atIndex) {
            var exsisting = _this.hotbarContents[atIndex];
            if (exsisting !== undefined && exsisting.id !== item.id) {
                _this.clearSlot(atIndex);
                exsisting = undefined;
            }
            if (exsisting === undefined) {
                _this.createIcon(item, atIndex);
            }
            else {
                if (_this.intervalMap.has(exsisting.id)) {
                    _this.queue(item, atIndex);
                    return;
                }
                exsisting.amount += item.amount;
                _this.updateIcon(exsisting);
                return;
            }
            _this.intervalMap.set(item.id, setTimeout(_this.addToHotbar.bind(_this, item, Date.now(), true), 5));
        };
        this.clearSlot = function (index) {
            var itemToRemove = _this.hotbarContents[index];
            _this.hotbarContents[index] = undefined;
            _this.hotbarSlots[index].parentElement.removeChild(itemToRemove.elementRef);
        };
        this.createIcon = function (item, atIndex) {
            //creation of icon & make transparent
            var icon = document.createElement('div');
            icon.className = 'hotbar-content';
            //setting of icon
            var iconImg = document.createElement('img');
            iconImg.setAttribute('src', item.getPath());
            iconImg.style.opacity = (0).toString();
            //setting amount
            var amountText = document.createElement('p');
            amountText.innerText = item.amount.toString();
            //setting into element
            icon.appendChild(iconImg);
            icon.appendChild(amountText);
            //setting refs icon
            _this.hotbarSlots[atIndex].appendChild(icon);
            _this.hotbarContents[atIndex] = item;
            item.elementRef = icon;
        };
        this.updateIcon = function (item) {
            var textElement = item.elementRef.getElementsByTagName('p')[0];
            textElement.innerText = item.amount.toString();
            _this.intervalMap.set(item.id, setTimeout(_this.addToHotbar.bind(_this, item, Date.now(), true, true), 5));
        };
        this.addToHotbar = function (item, startTime, initial, update) {
            //setting current image/icon
            if (_this.currentIcon === undefined) {
                _this.currentIcon = item.elementRef.getElementsByTagName('img')[0];
            }
            //setting target
            var startSize = initial ? 1 : 1.25;
            var targetSize = initial ? 1.25 : 1;
            //lerp scale
            _this.currentScale = window.scaleElement(_this.currentIcon, targetSize, startSize, startTime, _this.interval);
            //lerp transparency if fading in
            if (initial && !update) {
                var targetOpacity = window.lerp(startTime, _this.interval, 0, 1);
                _this.currentIcon.style.opacity = targetOpacity.toString();
            }
            //ending animation if target is met
            if (_this.currentScale.toFixed(2) === targetSize.toFixed(2)) {
                _this.currentIcon = undefined;
                if (initial) {
                    _this.intervalMap.set(item.id, setTimeout(_this.addToHotbar.bind(_this, item, Date.now(), false, update), 5));
                }
                else {
                    _this.intervalMap.delete(item.id);
                }
                return;
            }
            //running again if not
            _this.intervalMap.set(item.id, setTimeout(_this.addToHotbar.bind(_this, item, startTime, initial, update), 5));
        };
        this.interval = 500;
        this.hotbarSlots = [].slice.call(document.getElementsByClassName('hotbar-item'));
        this.hotbarContents = new Array(this.hotbarSlots.length);
    }
    HotbarItemService.prototype.add = function (item, atIndex) {
        var index = 0;
        var unplaced = true;
        var currentRef;
        while (index < this.hotbarContents.length) {
            currentRef = this.hotbarContents[index];
            if (((atIndex !== undefined && atIndex === index) ||
                (atIndex === undefined && currentRef === undefined)) &&
                unplaced) {
                this.upsert(item, index);
                unplaced = false;
            }
            index++;
        }
    };
    HotbarItemService.prototype.queue = function (item, atIndex) {
        setTimeout(this.canPop.bind(this, item, atIndex), 5);
    };
    HotbarItemService.prototype.canPop = function (item, atIndex) {
        if (this.intervalMap.has(item.id)) {
            this.intervalMap.set(item.id, setTimeout(this.queue.bind(this, item, atIndex), 5));
        }
        else {
            this.upsert(item, atIndex);
        }
    };
    return HotbarItemService;
}());
exports.HotbarItemService = HotbarItemService;
