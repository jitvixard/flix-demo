"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToastService = void 0;
var ToastService = /** @class */ (function () {
    function ToastService() {
        this.toastMap = new Map();
        this.activeToast = new Map();
        this.fadeIntervals = new Map();
        this.removeTimeouts = new Map();
        this.itemQueue = new Array();
        this.toastContainer = document.getElementById('toast-container');
    }
    ToastService.prototype.add = function (itemToAdd) {
        this.upsertItem(itemToAdd, this.fadeIntervals, this);
    };
    ToastService.prototype.pop = function () {
        if (this.itemQueue.length > 0) {
            var poppedToast = this.itemQueue.pop();
            this.activeToast.set(poppedToast.id, poppedToast);
            this.fadeIntervals.set(poppedToast.id, setInterval(this.fade, 10, poppedToast, this.fadeIntervals, this, true));
        }
    };
    ToastService.prototype.removeToast = function (itemToFade, intervalMap, t) {
        if (!t.toastMap.has(itemToFade.id))
            return;
        if (intervalMap.has(itemToFade.id)) {
            clearTimeout(intervalMap.get(itemToFade.id));
            intervalMap.delete(itemToFade.id);
        }
        //fade-out routine
        intervalMap.set(itemToFade.id, setInterval(t.fade, 10, itemToFade, intervalMap, t, false));
    };
    ToastService.prototype.fade = function (itemToFade, intervalMap, t, fadeIn) {
        var ref = itemToFade.elementRef;
        var op = parseFloat(ref.style.opacity);
        var targetOp = fadeIn ? 1 : 0;
        if ((fadeIn && op >= targetOp) || (!fadeIn && op <= targetOp)) {
            clearInterval(intervalMap.get(itemToFade.id));
            intervalMap.delete(itemToFade.id);
            if (fadeIn) {
                t.removeTimeouts.set(itemToFade.id, setTimeout(t.removeToast, 3000, itemToFade, intervalMap, t));
            }
            else {
                t.deleteElement(itemToFade, t);
            }
            return;
        }
        op = fadeIn ? op + 0.1 : op - 0.01;
        ref.style.opacity = op.toString();
    };
    ToastService.prototype.createToastElement = function (item) {
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
        //appending toast to container
        this.toastContainer.appendChild(toast);
        //setting to model
        item.elementRef = toast;
        //storing
        this.toastMap.set(item.id, item);
        return item;
    };
    ToastService.prototype.getExisting = function (item) {
        //stopping timeout
        if (this.fadeIntervals.has(item.id)) {
            var intervalId = this.fadeIntervals.get(item.id);
            clearInterval(intervalId);
            this.fadeIntervals.delete(item.id);
        }
        if (this.removeTimeouts.has(item.id)) {
            var intervalId = this.removeTimeouts.get(item.id);
            clearTimeout(intervalId);
            this.removeTimeouts.delete(item.id);
        }
        var exsistingItem = this.toastMap.get(item.id);
        //update amount
        exsistingItem.amount += item.amount;
        //update text
        var textNode = exsistingItem.elementRef.querySelector('p');
        textNode.textContent =
            exsistingItem.amount + ' x ' + exsistingItem.displayName + ' Added';
        return exsistingItem;
    };
    ToastService.prototype.upsertItem = function (itemToAdd, intervalMap, t) {
        itemToAdd = this.toastMap.has(itemToAdd.id)
            ? this.getExisting(itemToAdd)
            : this.createToastElement(itemToAdd);
        if (this.activeToast.size >= 2 && !this.activeToast.has(itemToAdd.id)) {
            this.itemQueue.push(itemToAdd);
            return;
        }
        this.activeToast.set(itemToAdd.id, itemToAdd);
        this.fadeIntervals.set(itemToAdd.id, setInterval(this.fade, 10, itemToAdd, intervalMap, t, true));
    };
    ToastService.prototype.deleteElement = function (item, t) {
        var ref = item.elementRef;
        ref.parentElement.removeChild(ref);
        t.toastMap.delete(item.id);
        var shouldPop = t.activeToast.size >= 2;
        if (t.activeToast.has(item.id))
            t.activeToast.delete(item.id);
        if (shouldPop)
            t.pop();
    };
    return ToastService;
}());
exports.ToastService = ToastService;
