import { Mongoose } from "mongoose";

const mongoose = require("mongoose");
const schema = mongoose.schema;

const productSchema = new schema({
    description: {type: String, require: true },
    imagePath: {type: String, require: true },
    price: {type: String, require: true },
    title: {type: String, require: true },
});


export const product = mongoose.model("Product", productSchema);
