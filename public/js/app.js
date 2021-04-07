"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var banana_1 = require("./model/banana");
var carrot_1 = require("./model/carrot");
var pear_1 = require("./model/pear");
var hotbar_service_1 = require("./services/hotbar.service");
var toast_service_1 = require("./services/toast.service");
var App = /** @class */ (function () {
    function App() {
        var _this = this;
        this.defaultStyleSheet = 'Style/fullwidth.css';
        this.smallerStyleSheet = 'Style/reducedwidth.css';
        this.hotbarService = new hotbar_service_1.HotbarService();
        this.toastService = new toast_service_1.ToastService();
        this.styleElementRef = document.getElementById('hotbarStyle'); //ref to hotbar style
        window.addEventListener('resize', function (e) { return _this.onResize(); });
        var bananaBtn = document.getElementById('addDemoBananaButton');
        bananaBtn.addEventListener('click', function (e) {
            return _this.toastService.add(new banana_1.Banana(1));
        });
        var carrotBtn = document.getElementById('addDemoCarrotButton');
        carrotBtn.addEventListener('click', function (e) {
            return _this.toastService.add(new carrot_1.Carrot(3));
        });
        var pearBtn = document.getElementById('addDemoPearButton');
        pearBtn.addEventListener('click', function (e) {
            return _this.toastService.add(new pear_1.Pear(1));
        });
        var cascadeOnBtn = document.getElementById('cascadeOnButton');
        cascadeOnBtn.addEventListener('click', function (e) {
            return _this.hotbarService.cascadeOn();
        });
        var cascadeOffBtn = document.getElementById('cascadeOffButton');
        cascadeOffBtn.addEventListener('click', function (e) {
            return _this.hotbarService.cascadeOff();
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
