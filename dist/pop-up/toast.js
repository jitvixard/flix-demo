"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Toast = void 0;
var Toast = /** @class */ (function () {
    function Toast() {
        var _this = this;
        this.toastSet = new Set();
        this.activeToast = new Set();
        this.fadeOnInterval = 100;
        this.fadeOffInterval = 1000;
        this.stayInterval = 3000;
        this.intervalMap = new Map();
        this.stayMap = new Map();
        this.itemQueue = new Array();
        this.itemAlreadyPresent = function (item) {
            var present = false;
            _this.toastSet.forEach(function (toast) {
                if (toast.id === item.id)
                    present = true;
            });
            return present;
        };
        this.itemHasActiveToast = function (item) {
            var present = false;
            _this.activeToast.forEach(function (toast) {
                if (item.id === toast.id)
                    present = true;
            });
            return present;
        };
        this.exisitingItem = function (item) {
            var exsisting;
            _this.toastSet.forEach(function (toast) {
                if (toast.id === item.id)
                    exsisting = toast;
            });
            return exsisting;
        };
        this.getUpdatedInterval = function (startValue, targetValue, actualValue) {
            return (_this.fadeOnInterval / Math.abs(targetValue - startValue)) * actualValue;
        };
        this.toastContainer = document.getElementById('toast-container');
    }
    Toast.prototype.add = function (itemToAdd) {
        this.upsertItem(itemToAdd);
    };
    Toast.prototype.fade = function (itemToFade, fadeIn, startTime, startingOpacity) {
        this.intervalMap.delete(itemToFade);
        if (startTime === undefined)
            startTime = Date.now();
        var ref = itemToFade.popupRef;
        var interval = fadeIn ? this.fadeOnInterval : this.fadeOffInterval;
        var targetOpacity = fadeIn ? 1 : 0;
        if (startingOpacity === undefined)
            startingOpacity = fadeIn ? 0 : 1;
        else
            interval = this.getUpdatedInterval(fadeIn ? 0 : 1, targetOpacity, startingOpacity);
        var currentOpacity = window.setElementOpacity(ref, targetOpacity, startingOpacity, startTime, interval);
        if (currentOpacity.toFixed(2) === targetOpacity.toFixed(2)) {
            if (fadeIn) {
                this.intervalMap.set(itemToFade, setTimeout(this.fade.bind(this, itemToFade, false), this.stayInterval));
            }
            else {
                this.deleteElement(itemToFade);
            }
            return;
        }
        this.intervalMap.set(itemToFade, setTimeout(this.fade.bind(this, itemToFade, fadeIn, startTime), 5));
    };
    Toast.prototype.popToast = function () {
        if (this.itemQueue.length < 1)
            return;
        var poppedToast = this.itemQueue.pop();
        this.activeToast.add(poppedToast);
        //appending toast to container
        this.toastContainer.appendChild(poppedToast.popupRef);
        this.intervalMap.set(poppedToast, setTimeout(this.fade.bind(this, poppedToast, true, Date.now()), 5));
    };
    Toast.prototype.createToastElement = function (item) {
        //create toast element and set opacity
        var toast = document.createElement('div');
        toast.className = 'popup-toast';
        toast.style.opacity = (0).toString();
        //create content
        var content = document.createElement('div');
        content.classList.add('item', item.id);
        //create image
        var image = document.createElement('img');
        image.setAttribute('src', item.getPath());
        //set text
        var text = document.createElement('p');
        text.innerText = item.amount + ' x ' + item.displayName + ' Added';
        //append elements to pop-up
        content.appendChild(image);
        content.appendChild(text);
        //set content
        toast.appendChild(content);
        //setting to model
        item.popupRef = toast;
        //storing
        this.toastSet.add(item);
        return item;
    };
    Toast.prototype.getExisting = function (item) {
        //stopping timeout
        if (this.intervalMap.has(item)) {
            var intervalId = this.intervalMap.get(item);
            clearInterval(intervalId);
            this.intervalMap.delete(item);
        }
        if (this.stayMap.has(item)) {
            var intervalId = this.stayMap.get(item);
            clearTimeout(intervalId);
            this.stayMap.delete(item);
        }
        //fetch exsisting item from set
        var exsistingItem = this.exisitingItem(item);
        //update amount
        exsistingItem.amount += item.amount;
        //update text
        var textNode = exsistingItem.popupRef.querySelector('p');
        textNode.textContent =
            exsistingItem.amount + ' x ' + exsistingItem.displayName + ' Added';
        return exsistingItem;
    };
    Toast.prototype.upsertItem = function (itemToAdd) {
        itemToAdd = this.itemAlreadyPresent(itemToAdd)
            ? this.getExisting(itemToAdd)
            : this.createToastElement(itemToAdd);
        if (this.itemHasActiveToast(itemToAdd)) {
            this.extendAnimation(itemToAdd);
            return;
        }
        this.itemQueue.push(itemToAdd);
        if (this.activeToast.size < 2)
            this.popToast();
    };
    Toast.prototype.extendAnimation = function (item) {
        if (this.stayMap.has(item)) {
            clearTimeout(this.stayMap.get(item));
            this.stayMap.set(item, setTimeout(this.fade.bind(this, item, false), this.stayInterval));
        }
        else {
            if (this.intervalMap.has(item)) {
                clearTimeout(this.intervalMap.get(item));
            }
            this.intervalMap.set(item, setTimeout(this.fade.bind(this, item, true, Date.now(), window.getElementOpacity(item.popupRef))));
        }
    };
    Toast.prototype.deleteElement = function (item) {
        var ref = item.popupRef;
        ref.parentElement.removeChild(ref);
        this.toastSet.delete(item);
        var shouldPop = this.activeToast.size >= 2;
        if (this.activeToast.has(item))
            this.activeToast.delete(item);
        if (shouldPop)
            this.popToast();
    };
    return Toast;
}());
exports.Toast = Toast;
