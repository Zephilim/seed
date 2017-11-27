import { sayHello } from './greet';
import { expect } from 'mocha';

// In visual studio code, the following words are producing linting errors and have a red
// wiggly line underneath them (so I need help in performing the correct import to get this
// working):
//
// describe
// it
// expect

describe("Greetings", () => {
  it("say hello", () => {

    const result = sayHello("Billy");
    expect(result).to.equal("Hello from Billy");

  });
});

// This is what I'm seeing on command line when running "gulp compile":

// src / app / dummy.spec.ts(2, 10): error TS2305: Module '"mocha"' has no exported member 'expect'.
// [17: 52: 11]TypeScript: 1 semantic error
// [17: 52: 11]TypeScript: emit succeeded(with errors)
// [17: 52: 11] Finished 'compile' after 1.11 s
// λ ~/dev/github / seed / server / seed_server.gamma / gamma * 
