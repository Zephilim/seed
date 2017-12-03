"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const schema = mongoose.schema;
const productSchema = new schema({
    description: { type: String, require: true },
    imagePath: { type: String, require: true },
    price: { type: String, require: true },
    title: { type: String, require: true },
});
exports.product = mongoose.model("Product", productSchema);

//# sourceMappingURL=../dist/models/product.js.map
