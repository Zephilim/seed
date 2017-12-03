process.env.NODE_ENV = "test";

// mocha
import "mocha";
import { suite, test } from "mocha-typescript";

// mongodb
import { ObjectID } from "mongodb";

// server
import { appServer } from "../app";

// // model
// import { Hero } from "../interfaces/hero";
// import { HeroModel, HeroModelStatic } from "../models/hero";
// import { heroSchema } from "../schemas/hero";

// mongoose
import mongoose = require("mongoose");

// require http server
const http = require("http");

// require chai and use should assertions
const chai = require("chai");
chai.should();

// configure chai-http
chai.use(require("chai-http"));