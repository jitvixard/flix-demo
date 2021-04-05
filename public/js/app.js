"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var carrot_1 = require("./model/carrot");
var toast_service_1 = require("./services/toast.service");
var App = /** @class */ (function () {
    function App() {
        var _this = this;
        this.defaultStyleSheet = 'Style/fullwidth.css';
        this.smallerStyleSheet = 'Style/reducedwidth.css';
        this.toastService = new toast_service_1.ToastService();
        this.styleElementRef = document.getElementById('hotbarStyle'); //ref to hotbar style
        window.addEventListener('resize', function (e) { return _this.onResize(); }); //resizing event
        var addBtn = document.getElementById('addItemButton'); //adding event to button
        addBtn.addEventListener('click', function (e) {
            return _this.toastService.add(new carrot_1.Carrot(1));
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
