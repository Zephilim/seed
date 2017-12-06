import {product} from "../models/product";
const mongoose = require("mongoose");

mongoose.connect("localhost:27017/");

const products = [
    new product({
        description: "Shooting Game",
        imagePath: "...",
        price: "12",
        title: "Contra",
    }),

    new product({
        description: "Adventure Game",
        imagePath: "...",
        price: "12",
        title: "mario",
    }),

    new product({
        description: "brick Game",
        imagePath: "...",
        price: "12",
        title: "Tetris",
    }),

    new product({
        description: "Racing Game",
        imagePath: "...",
        price: "12",
        title: "Asphalt",
    }),

    new product({
        description: "Action Game",
        imagePath: "...",
        price: "12",
        title: "Hitman",
    }),

    new product({
        description: "Shooting Game",
        imagePath: "...",
        price: "12",
        title: "Contra",
    }),
];

let done = 0;
products.forEach((i) => products[i].save(
    (err, result) => {
        done++;
        if (done === products.length) {
            mongoose.diconnect();
        }
    },
));
