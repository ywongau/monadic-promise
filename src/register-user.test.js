const { expect, assert } = require('chai');
const Register = require('./register-user');

const aValidPassword = 'fL&6%3Ps';

const failIfFulfilled = x =>
  assert.fail('expect a rejection but was resolved with: ' + x);

const failIfRejected = x =>
  assert.fail('expect a resolution but was rejected with: ' + x);

const isUserNameAvailable = userName =>
  new Promise(resolve => setTimeout(() => resolve(userName !== 'bob'), 0));

const register = Register(isUserNameAvailable);

it('resolves with a tuple if passed', () =>
  register('fred', aValidPassword, aValidPassword).then(
    data => expect(data).to.deep.equal(['fred', aValidPassword]),
    failIfRejected
  ));

it('rejects with an error message if user name is empty', () =>
  register('', aValidPassword, aValidPassword).then(failIfFulfilled, error =>
    expect(error).to.deep.equal(['user name cannot be empty'])
  ));

it("rejects with an error message if user name does't match regex", () =>
  register('a b', aValidPassword, aValidPassword).then(failIfFulfilled, error =>
    expect(error).to.deep.equal([
      'user name can only contain 3 to 10 alphanumeric characters or underscores'
    ])
  ));

it("rejects with an error message if user name does't match regex", () =>
  register('bob', aValidPassword, aValidPassword).then(failIfFulfilled, error =>
    expect(error).to.deep.equal(['user name already exists'])
  ));

it('rejects with an error message if password is empty', () =>
  register('fred', '', aValidPassword).then(failIfFulfilled, error =>
    expect(error).to.deep.equal(['password cannot be empty'])
  ));

it("rejects with an error message if password doesn't match regex", () =>
  register('fred', '1234567', '').then(failIfFulfilled, error =>
    expect(error).to.deep.equal(['password must be complex'])
  ));

it("rejects with an error message if password doesn't match confirm password", () =>
  register('fred', aValidPassword, 'doh').then(failIfFulfilled, error =>
    expect(error).to.deep.equal(['password must match confirm password'])
  ));

it('rejects with error messages if both user name and password are invalid', () =>
  register('c:\\', aValidPassword, 'sdf').then(failIfFulfilled, error =>
    expect(error).to.deep.equal([
      'user name can only contain 3 to 10 alphanumeric characters or underscores',
      'password must match confirm password'
    ])
  ));
