"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
/* GET home page. */
router.get("/", (req, res, next) => {
    res.render("shop/index", { title: "Express" });
});
exports.indexRouter = router;

//# sourceMappingURL=../dist/routes/index.js.map
