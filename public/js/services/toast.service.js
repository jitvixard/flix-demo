"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToastService = void 0;
var ToastService = /** @class */ (function () {
    function ToastService() {
        this.toastContainer = document.getElementById('toast-container');
        console.log(this.toastContainer);
    }
    return ToastService;
}());
exports.ToastService = ToastService;
