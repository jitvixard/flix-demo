"use strict";
var App = /** @class */ (function () {
    function App() {
        var _this = this;
        this.defaultStyleSheet = "Style/fullwidth.css";
        this.smallerStyleSheet = "Style/reducedwidth.css";
        this.styleElementRef = document.getElementById("hotbarStyle");
        window.addEventListener("resize", function (e) { return _this.onResize(); }); //resizing event
        var btn = document.getElementById("addItemButton"); //adding event to button
        btn.addEventListener("click", function (e) { return _this.addItem(); });
        this.onResize();
    }
    App.prototype.addItem = function () {
    };
    App.prototype.onResize = function () {
        var styleId = "hotbarStyle";
        if (window.innerWidth < 1200) {
            document.getElementById(styleId).setAttribute("href", this.smallerStyleSheet);
        }
        else {
            document.getElementById(styleId).setAttribute("href", this.defaultStyleSheet);
        }
    };
    return App;
}());
new App();
