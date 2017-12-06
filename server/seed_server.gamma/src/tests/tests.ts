process.env.NODE_ENV = "test";

const startExpressServer = require("start-express-server");

import { suite, test } from "mocha-typescript";

// server
import { appServer } from "../app";

import { setTimeout } from "timers";

// http
const http = require("http");

// require chai and use should assertions
const chai = require("chai");


// configure chai-http
chai.use(require("chai-http"));
const expect = chai.expect;

@suite class Test {

    public static server: any;

    public static before() {
      console.log("setting up server");

      const port = 3000;
      appServer.set("port", port);
      Test.server = http.createServer(appServer);
      Test.server.listen(port);
    }

    public static after() {
           
        Test.server.close(

         async () =>{
            
            setTimeout(() => {
              console.log("closing and shutting down connection");
              process.exit(0);
            
            }, 3*1000 )
          }
           
      
        );
        


      setTimeout( () => {
        console.error("Could not close connections in time, forcefully shutting down");
        process.exit(1); 
      }, 10*1000);
        
    }
   

    /**
     * Using Expect
     */
    // tslint:disable-next-line:align
    @test public user() {

      describe("TestRoute", () => {

              it("should return 200 ok status", () => {
                return chai.request(Test.server).get("/user")
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
                return chai.request(Test.server).get("/user")
                .then((res) => {
                  expect(res.body.message).to.eql("Hello World");
                  expect(res.body.name).to.eql("Alvin");
                });
              });

              it("should be an object", () => {
                return chai.request(Test.server).get("/user")
                .then((res) => {
                  expect(res.body).to.be.an("object");

                });
              });

            });
    }



}
// after(async () => {
//   console.log("shutting down");
//   Test.server.close(

//     setTimeout(() => {
//       process.exit(0);
    
//     }, 3*1000 )

//   );
  
//   setTimeout( () => {
//     console.error("Could not close connections in time, forcefully shutting down");
//     process.exit(1); 
//   }, 10*1000);

// });