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
exports.Apple = void 0;
var abstract_item_1 = require("../abstract-item");
var Apple = /** @class */ (function (_super) {
    __extends(Apple, _super);
    function Apple(amount) {
        var _this = _super.call(this, amount) || this;
        _this.id = 'apple';
        _this.displayName = 'Apple';
        return _this;
    }
    return Apple;
}(abstract_item_1.AbstractItem));
exports.Apple = Apple;
