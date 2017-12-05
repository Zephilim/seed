process.env.NODE_ENV = "test";

import { suite, test } from "mocha-typescript";

// server
import { appServer } from "../app";

// require chai and use should assertions
const chai = require("chai");


// configure chai-http
chai.use(require("chai-http"));
const expect = chai.expect;

@suite class Test {

    /**
     * Using Expect
     */
    @test public user() {

      describe("TestRoute", () => {

              it("should return 200 ok status", () => {
                return chai.request(appServer).get("/user")
                .then((res) => {
                    expect(res.status).to.equal(200);
                });
              });

              it("should be json", () => {
                return chai.request(appServer).get("/user")
                .then( (res) => {
                  expect(res.type).to.eql("application/json");
                });
              });

              it("should have a prop", () => {
                return chai.request(appServer).get("/user")
                .then((res) => {
                  expect(res.body.message).to.eql("Hello World");
                  expect(res.body.name).to.eql("Alvin");
                });
              });

              it("should be an object", () => {
                return chai.request(appServer).get("/user")
                .then((res) => {
                  expect(res.body).to.be.an("object");

                });
              });

            });
    }

}
