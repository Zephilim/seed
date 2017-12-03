"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
// import * as favicon from "serve-favicon";
const logger = require("morgan");
// import * as cookieParser from "cookie-parser";
const bodyParser = require("body-parser");
const index_1 = require("./routes/index");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const expressHandleBars = require("express-handlebars").create({
    defaultLayout: "layout",
    extname: "hbs",
    layoutsDir: path.join(__dirname, "views/layouts"),
    partialsDir: path.join(__dirname, "views/partials"),
});
const app = express();
// connecting to mongoose
mongoose.connect("localhost:27017/");
// view engine setup
app.engine("hbs", expressHandleBars.engine);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/", index_1.indexRouter);
// app.use('/users', users);
// catch 404 and forward to error handler
app.use((req, res, next) => {
    let err;
    err = new Error("Not Found");
    err.status = 404;
    next(err);
});
// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render("error");
});
// module.exports = app;
exports.appServer = app;

//# sourceMappingURL=dist/app.js.map
