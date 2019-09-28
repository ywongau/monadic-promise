const messages = require('./error-messages');
const userNameRegex = /^[a-z0-9]{3,}/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
const equals = x => y => x === y;
const isNotEmpty = x => x.length > 0;
const matches = regex => s => regex.test(s);
const prop = key => o => o[key];
const propEquals = (key, value) => o => o[key] === value;
const validate = (predicate, errorMessage) => x =>
  Promise.resolve(predicate(x)).then(valid =>
    valid ? Promise.resolve(x) : Promise.reject(errorMessage)
  );
const okResult = value => ({
  ok: true,
  value
});
const errorResult = reason => ({
  ok: false,
  reason
});

const validateUserName = userNameAvailable => userName =>
  Promise.resolve(userName)
    .then(validate(isNotEmpty, messages.userName.empty))
    .then(validate(matches(userNameRegex), messages.userName.incorrectFormat))
    .then(validate(userNameAvailable, messages.userName.notAvailable))
    .then(okResult, errorResult);

const validatePassword = confirmPassword => password =>
  Promise.resolve(password)
    .then(validate(isNotEmpty, messages.password.empty))
    .then(validate(matches(passwordRegex), messages.password.incorrectFormat))
    .then(validate(equals(confirmPassword), messages.password.confirm))
    .then(okResult, errorResult);

const checkResults = results =>
  results.every(prop('ok'))
    ? Promise.resolve(results.map(prop('value')))
    : Promise.reject(results.filter(propEquals('ok', false)).map(prop('reason')));

module.exports = userNameAvailable => (userName, password, confirmPassword) =>
  Promise.all([
    validateUserName(userNameAvailable)(userName),
    validatePassword(confirmPassword)(password)
  ]).then(checkResults);
