"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotbarItemService = void 0;
var HotbarItemService = /** @class */ (function () {
    function HotbarItemService() {
        var _this = this;
        this.upsert = function (item, atIndex) {
            var exsisting = _this.hotbarContents[atIndex];
            if (exsisting !== undefined && exsisting.id !== item.id) {
                console.log('clearing old element');
                _this.clearSlot(atIndex);
                exsisting = undefined;
            }
            if (exsisting === undefined) {
                console.log('creating new element');
                _this.createIcon(item, atIndex);
            }
            console.log('playing animation');
            _this.playAnimation(item, atIndex);
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
            icon.style.opacity = (0).toString();
            //setting of icon
            var iconImg = document.createElement('img');
            iconImg.setAttribute('src', item.getPath());
            //setting into element
            icon.appendChild(iconImg);
            //setting refs icon
            _this.hotbarSlots[atIndex].appendChild(icon);
            item.elementRef = icon;
        };
        this.playAnimation = function (item, atIndex) {
            var elementRef = item.elementRef;
            elementRef.style.opacity = (1).toString();
        };
        this.hotbarSlots = [].slice.call(document.getElementsByClassName('hotbar-item'));
        this.hotbarContents = new Array(this.hotbarSlots.length);
    }
    HotbarItemService.prototype.add = function (item, atIndex) {
        console.log('adding');
        var index = 0;
        var unplaced = true;
        var currentRef;
        while (index < this.hotbarContents.length) {
            currentRef = this.hotbarContents[index];
            if (((atIndex !== undefined && atIndex === index) ||
                (atIndex === undefined && currentRef === undefined)) &&
                unplaced) {
                console.log('upserting ' + item.id + ' at index ' + index);
                this.upsert(item, index);
                unplaced = false;
            }
            index++;
        }
    };
    return HotbarItemService;
}());
exports.HotbarItemService = HotbarItemService;
