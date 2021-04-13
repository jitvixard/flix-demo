"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractItem = void 0;
var AbstractItem = /** @class */ (function () {
    function AbstractItem(amount) {
        var _this = this;
        this.getPath = function () { return 'assets/icons/' + _this.id + '.png'; };
        this.amount = amount;
    }
    return AbstractItem;
}());
exports.AbstractItem = AbstractItem;
