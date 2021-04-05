"use strict";
var App = /** @class */ (function () {
    function App() {
        var _this = this;
        this.defaultStyleSheet = 'Style/fullwidth.css';
        this.smallerStyleSheet = 'Style/reducedwidth.css';
        this.count = 0;
        this.toastList = new Array();
        this.styleElementRef = document.getElementById('hotbarStyle');
        this.toastContainer = document.getElementById('toast-container');
        console.log(this.toastContainer);
        window.addEventListener('resize', function (e) { return _this.onResize(); }); //resizing event
        var addBtn = document.getElementById('addItemButton'); //adding event to button
        addBtn.addEventListener('click', function (e) { return _this.addItem(); });
        var rmvBtn = document.getElementById('removeItemButton'); //adding event to button
        rmvBtn.addEventListener('click', function (e) { return _this.removeItem(); });
        this.onResize();
    }
    App.prototype.addItem = function () {
        console.log('adding');
        var toast = document.createElement('div');
        toast.className = 'popup-toast';
        var text = document.createTextNode(this.count.toString());
        this.count++;
        toast.appendChild(text);
        this.toastContainer.appendChild(toast);
        this.toastList.push(toast);
    };
    App.prototype.removeItem = function () {
        console.log('removing');
        var poppedToast = this.toastList.pop();
        this.toastContainer.removeChild(poppedToast);
    };
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
