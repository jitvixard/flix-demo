"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
var hotbar_1 = require("./hotbar/hotbar");
var toast_1 = require("./pop-up/toast");
var bindings_1 = require("./util/bindings");
var App = /** @class */ (function () {
    function App() {
        var _this = this;
        this.defaultStyleSheet = 'Style/fullwidth.css';
        this.smallerStyleSheet = 'Style/reducedwidth.css';
        this.hotbar = new hotbar_1.Hotbar();
        this.toast = new toast_1.Toast();
        this.add = function (item, atIndex) {
            _this.hotbar.add(item, atIndex);
            _this.toast.add(item);
        };
        this.select = function (index) {
            _this.hotbar.select(index);
        };
        this.popup = function (item) { return _this.toast.add(item); };
        this.cascade = function (on) { return _this.hotbar.cascade(on); };
        this.subtleFade = function (on) { return _this.hotbar.fade(on); };
        this.onResize = function () {
            var isNowFullWidth = window.innerWidth > 1200;
            if (_this.fullWidth !== undefined && _this.fullWidth == isNowFullWidth) {
                return;
            }
            _this.fullWidth = isNowFullWidth;
            if (_this.fullWidth) {
                _this.hotbarStyleRef.setAttribute('href', _this.defaultStyleSheet);
            }
            else {
                _this.hotbarStyleRef.setAttribute('href', _this.smallerStyleSheet);
            }
            _this.hotbar.resize();
        };
        this.alternateStyle = function (button) {
            var styleRef = document.getElementById('alternateStyle');
            if (_this.alternateStyleActivated)
                styleRef.setAttribute('href', '');
            else
                styleRef.setAttribute('href', 'Style/alternate.css');
            _this.alternateStyleActivated = !_this.alternateStyleActivated;
            var textToSet = _this.alternateStyleActivated
                ? 'Revert Style'
                : 'Adjust Style';
            button.setAttribute('value', textToSet);
        };
        // *** references *** //
        this.hotbarStyleRef = document.getElementById('hotbarStyle');
        this.alternateStyleActivated = false;
        // *** bindings *** //
        bindings_1.bindButtons(this);
        bindings_1.bindResizeListener(this);
    }
    return App;
}());
exports.App = App;
new App();
