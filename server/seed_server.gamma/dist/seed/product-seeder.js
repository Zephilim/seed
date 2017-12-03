"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../models/product");
const mongoose = require("mongoose");
mongoose.connect("localhost:27017/");
const products = [
    new product_1.product({
        description: "Shooting Game",
        imagePath: "...",
        price: "12",
        title: "Contra",
    }),
    new product_1.product({
        description: "Adventure Game",
        imagePath: "...",
        price: "12",
        title: "mario",
    }),
    new product_1.product({
        description: "brick Game",
        imagePath: "...",
        price: "12",
        title: "Tetris",
    }),
    new product_1.product({
        description: "Racing Game",
        imagePath: "...",
        price: "12",
        title: "Asphalt",
    }),
    new product_1.product({
        description: "Action Game",
        imagePath: "...",
        price: "12",
        title: "Hitman",
    }),
    new product_1.product({
        description: "Shooting Game",
        imagePath: "...",
        price: "12",
        title: "Contra",
    }),
];
let done = 0;
products.forEach((i) => products[i].save((err, result) => {
    done++;
    if (done === products.length) {
        mongoose.diconnect();
    }
}));

//# sourceMappingURL=../dist/seed/product-seeder.js.map
