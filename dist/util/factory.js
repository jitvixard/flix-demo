"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getItemFromName = void 0;
var apple_1 = require("../model/items/impl/apple");
var banana_1 = require("../model/items/impl/banana");
var bread_1 = require("../model/items/impl/bread");
var carrot_1 = require("../model/items/impl/carrot");
var orange_1 = require("../model/items/impl/orange");
var pear_1 = require("../model/items/impl/pear");
function getItemFromName(name) {
    switch (name.toLowerCase()) {
        case 'apple': {
            return new apple_1.Apple(1);
        }
        case 'banana': {
            return new banana_1.Banana(1);
        }
        case 'bread': {
            return new bread_1.Bread(1);
        }
        case 'carrot': {
            return new carrot_1.Carrot(1);
        }
        case 'orange': {
            return new orange_1.Orange(1);
        }
        case 'pear': {
            return new pear_1.Pear(1);
        }
    }
}
exports.getItemFromName = getItemFromName;
