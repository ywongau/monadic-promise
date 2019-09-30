# Monadic Promise

This is an example of using Promise as a monad to handle asynchronicity and errors. 
The program is composed of pure functions and **const** is the only JavaScript keyword used

## Requirements
A validation function:
- Given user name, password and confirm password
- Given a remote service for validating user name availability
- Returns a resolved Promise of [userName, password] if validation passed
- Returns a rejected Promise of error messages if validation failed
- See the flowchart and [test cases](./src/validate-user.test.js) for details

<img src="img/flowchart.png" width="500px">

## Test
- 'npm test' to start an auto re-run mocha test
- 'npm run build' to run a [stryker-mutator](https://github.com/stryker-mutator) mutation test, to show off the 100% true coverage by TDD