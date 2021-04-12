"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
var hotbar_1 = require("./hotbar/hotbar");
var toast_1 = require("./pop-up/toast");
var App = /** @class */ (function () {
    function App() {
        var _this = this;
        this.defaultStyleSheet = 'Style/fullwidth.css';
        this.smallerStyleSheet = 'Style/reducedwidth.css';
        this.hotbarService = new hotbar_1.Hotbar();
        this.toastService = new toast_1.ToastService();
        this.onResize = function () {
            if (window.innerWidth < 1200) {
                _this.styleElementRef.setAttribute('href', _this.smallerStyleSheet);
            }
            else {
                _this.styleElementRef.setAttribute('href', _this.defaultStyleSheet);
            }
        };
        this.bindResizeListener = function () {
            window.addEventListener('resize', function (e) {
                _this.onResize();
                _this.hotbarService.resize();
            });
            _this.onResize();
            _this.hotbarService.resize();
        };
        this.styleElementRef = document.getElementById('hotbarStyle'); //ref to hotbar style
        this.bindResizeListener();
    }
    return App;
}());
exports.App = App;
new App();
