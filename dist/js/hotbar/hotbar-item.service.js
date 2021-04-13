"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotbarItemService = void 0;
require("../util/transformation");
var HotbarItemService = /** @class */ (function () {
    function HotbarItemService() {
        var _this = this;
        this.upsert = function (item, atIndex) {
            var exsisting = _this.hotbarContents[atIndex];
            //Clears slot if item is present
            if (exsisting !== undefined && exsisting.id !== item.id) {
                _this.clearSlot(atIndex);
                exsisting = undefined;
            }
            //if nothing exists in that slot, then create an icon and populate it
            if (exsisting === undefined) {
                _this.createIcon(item, atIndex);
            }
            else {
                //if an animation is running on this icon then queue this
                if (_this.animationMap.has(exsisting.iconRef)) {
                    _this.queue(item, atIndex);
                    return;
                }
                exsisting.amount += item.amount;
                //run update animation
                _this.updateIcon(exsisting);
                return;
            }
            //starts animation
            _this.runAnimation(item.iconRef, setTimeout(_this.addToHotbar.bind(_this, item, Date.now(), true), 5));
        };
        this.clearSlot = function (index) {
            var itemToRemove = _this.hotbarContents[index];
            console.log(JSON.stringify(itemToRemove));
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
            item.iconRef = iconImg;
        };
        this.updateIcon = function (item) {
            var textElement = item.elementRef.getElementsByTagName('p')[0];
            textElement.innerText = item.amount.toString();
            _this.runAnimation(item.iconRef, setTimeout(_this.addToHotbar.bind(_this, item, Date.now(), true, true), 5));
        };
        this.interval = 500;
        this.animationMap = new Map();
        this.hotbarSlots = [].slice.call(document.getElementsByClassName('hotbar-item'));
        this.hotbarContents = new Array(this.hotbarSlots.length);
    }
    HotbarItemService.prototype.add = function (item, atIndex) {
        var index = 0;
        var firstAvailableIndex;
        var exsistingIndex;
        if (atIndex === undefined) {
            while (index < this.hotbarContents.length) {
                var currentItem = this.hotbarContents[index];
                if (currentItem === undefined && firstAvailableIndex === undefined)
                    firstAvailableIndex = index;
                else if (currentItem !== undefined && currentItem.id === item.id)
                    exsistingIndex = index;
                index++;
            }
            if (exsistingIndex !== undefined)
                atIndex = exsistingIndex;
            else if (firstAvailableIndex !== undefined)
                atIndex = firstAvailableIndex;
        }
        if (atIndex !== undefined)
            this.upsert(item, atIndex);
    };
    HotbarItemService.prototype.itemPresent = function (element, atIndex) {
        var isPresent = false;
        if (atIndex !== undefined)
            return this.hotbarContents[atIndex] !== undefined;
        else if (element !== undefined) {
            this.hotbarContents.forEach(function (item) {
                if (item.elementRef === element)
                    isPresent = true;
            });
        }
        return isPresent;
    };
    HotbarItemService.prototype.addToHotbar = function (item, startTime, initial, update) {
        //Current icon
        var icon = item.iconRef;
        //Setting target values
        var startSize = initial ? 1 : 1.25;
        var targetSize = initial ? 1.25 : 1;
        //Lerping icons scale
        var currentScale = window.scaleElement(icon, targetSize, startSize, startTime, this.interval);
        /*  Will lerp the elements opacity,
            if the item is expanding after being added for the first time. */
        if (initial && !update)
            window.setElementOpacity(icon, 1, 0, startTime, this.interval);
        // Will end the animation if element is set to the desired size
        if (currentScale.toFixed(2) === targetSize.toFixed(2)) {
            if (initial) {
                //Will set the start time and initial bool ready to shrink the element
                startTime = Date.now();
                initial = false;
            }
            else {
                //Otherwise ending the sequence
                this.animationMap.delete(icon);
                return;
            }
        }
        //Running again if not complete
        this.runAnimation(icon, setTimeout(this.addToHotbar.bind(this, item, startTime, initial, update), 5));
    };
    HotbarItemService.prototype.runAnimation = function (element, id) {
        this.stopAnimation(element);
        this.animationMap.set(element, id);
    };
    HotbarItemService.prototype.stopAnimation = function (element) {
        if (this.animationMap.has(element))
            clearTimeout(this.animationMap.get(element));
    };
    HotbarItemService.prototype.queue = function (item, atIndex) {
        setTimeout(this.canPop.bind(this, item, atIndex), 5);
    };
    HotbarItemService.prototype.canPop = function (item, atIndex) {
        if (this.animationMap.has(item.elementRef)) {
            setTimeout(this.queue.bind(this, item, atIndex), 5);
        }
        else {
            this.upsert(item, atIndex);
        }
    };
    return HotbarItemService;
}());
exports.HotbarItemService = HotbarItemService;
