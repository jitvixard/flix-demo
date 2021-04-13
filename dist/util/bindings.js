"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bindResizeListener = exports.bindButtons = void 0;
var apple_1 = require("../model/items/impl/apple");
var banana_1 = require("../model/items/impl/banana");
var bread_1 = require("../model/items/impl/bread");
var carrot_1 = require("../model/items/impl/carrot");
var orange_1 = require("../model/items/impl/orange");
var pear_1 = require("../model/items/impl/pear");
var factory_1 = require("./factory");
/**
 * @param app Main application buttons are being bound to.
 *
 * Utility function to bind all buttons.
 */
function bindButtons(app) {
    /*
     * Popup Toast
     */
    var bananaBtn = document.getElementById('addDemoBananaButton');
    bananaBtn.addEventListener('click', function (e) { return app.popup(new banana_1.Banana(1)); });
    var carrotBtn = document.getElementById('addDemoCarrotButton');
    carrotBtn.addEventListener('click', function (e) { return app.popup(new carrot_1.Carrot(3)); });
    var pearBtn = document.getElementById('addDemoPearButton');
    pearBtn.addEventListener('click', function (e) { return app.popup(new pear_1.Pear(1)); });
    /*
     * Hotbar Transitions
     */
    var cascadeOnBtn = document.getElementById('cascadeOnButton');
    cascadeOnBtn.addEventListener('click', function (e) { return app.cascade(true); });
    var cascadeOffBtn = document.getElementById('cascadeOffButton');
    cascadeOffBtn.addEventListener('click', function (e) { return app.cascade(false); });
    var fadeOnbtn = document.getElementById('subtleFadeOnButton');
    fadeOnbtn.addEventListener('click', function (e) { return app.subtleFade(true); });
    var fadeOffbtn = document.getElementById('subtleFadeOffButton');
    fadeOffbtn.addEventListener('click', function (e) { return app.subtleFade(false); });
    /*
     * Item Additions
     */
    var appleBtn = document.getElementById('addAppleButton');
    appleBtn.addEventListener('click', function (e) { return app.add(new apple_1.Apple(1), 1); });
    var breadBtn = document.getElementById('addBreadButton');
    breadBtn.addEventListener('click', function (e) { return app.add(new bread_1.Bread(1), 0); });
    var orangeBtn = document.getElementById('addOrangeButton');
    orangeBtn.addEventListener('click', function (e) { return app.add(new orange_1.Orange(1), 5); });
    var itemParent = document.getElementById('item-buttons');
    Array.from(itemParent.getElementsByTagName('input')).forEach(function (element) {
        var buttonValue = element.getAttribute('value');
        if (buttonValue !== undefined)
            element.addEventListener('click', function (e) {
                return app.add(factory_1.getItemFromName(buttonValue));
            });
    });
    /*
     * Slot Selection
     */
    var selectionParent = document.getElementById('selection-buttons');
    Array.from(selectionParent.getElementsByTagName('input')).forEach(function (element) {
        var buttonValue = Number(element.getAttribute('value'));
        if (buttonValue !== undefined)
            element.addEventListener('click', function (e) {
                return app.select(buttonValue - 1);
            });
    });
    /*
     * Style Alternation
     */
    var styleBtn = document.getElementById('restyle');
    styleBtn.addEventListener('click', function (e) {
        return app.alternateStyle(styleBtn);
    });
}
exports.bindButtons = bindButtons;
/**
 * @param app Main application.
 *
 * Will bind resize listeners
 */
function bindResizeListener(app) {
    window.addEventListener('resize', function (e) {
        app.onResize();
    });
    app.onResize();
}
exports.bindResizeListener = bindResizeListener;
