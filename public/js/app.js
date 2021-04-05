"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var banana_1 = require("./model/banana");
var carrot_1 = require("./model/carrot");
var pear_1 = require("./model/pear");
var toast_service_1 = require("./services/toast.service");
var App = /** @class */ (function () {
    function App() {
        var _this = this;
        this.defaultStyleSheet = 'Style/fullwidth.css';
        this.smallerStyleSheet = 'Style/reducedwidth.css';
        this.toastService = new toast_service_1.ToastService();
        this.styleElementRef = document.getElementById('hotbarStyle'); //ref to hotbar style
        window.addEventListener('resize', function (e) { return _this.onResize(); }); //resizing event
        var bananaBtn = document.getElementById('addBananaButton'); //adding event to button
        bananaBtn.addEventListener('click', function (e) {
            return _this.toastService.add(new banana_1.Banana(1));
        });
        var carrotBtn = document.getElementById('addCarrotButton'); //adding event to button
        carrotBtn.addEventListener('click', function (e) {
            return _this.toastService.add(new carrot_1.Carrot(1));
        });
        var pearBtn = document.getElementById('addPearButton'); //adding event to button
        pearBtn.addEventListener('click', function (e) {
            return _this.toastService.add(new pear_1.Pear(1));
        });
        this.onResize();
    }
    App.prototype.onResize = function () {
        var styleId = 'hotbarStyle';
        if (window.innerWidth < 1200) {
            document
                .getElementById(styleId)
                .setAttribute('href', this.smallerStyleSheet);
        }
        else {
            document
                .getElementById(styleId)
                .setAttribute('href', this.defaultStyleSheet);
        }
    };
    return App;
}());
new App();
