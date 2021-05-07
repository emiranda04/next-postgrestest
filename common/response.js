const serverError = (req, res) => {
  const code = 500;
  const meta = {api_description: req.apiDescription, code: code, error_message: "Unable to process the request due to an error."};
  return setResponseError({meta, code}, res);
};

const accessTokenRequired = (req, res) => {
  const code = 401;
  const meta = {api_description: req.apiDescription, code: code, error_message: "Access token required."};
  return setResponseError({meta, code}, res);
};

const incorrectToken = (req, res) => {
  const code = 401;
  const meta = {api_description: req.apiDescription, code: code, error_message: "Incorrect token."};
  return setResponseError({meta, code}, res);
};

const methodNotAllowed = (req, res) => {
  const code = 405;
  const meta = {api_description: req.apiDescription, code: code, error_message: "Method is not allowed."};
  return setResponseError({meta, code}, res);
};

const requestMissingInformation = (req, res) => {
  const code = 400;
  const meta = {api_description: req.apiDescription, code: code, error_message: req.message};
  return setResponseError({meta, code}, res);
};

const setResponse = (request, response) => {
  const { meta, data } = request;
  const { code } = meta;
  return response.status(code).send({meta, data});
};

const setResponseError = (req, res) => {
  res.statusCode = req.code;
  res.end(JSON.stringify({ meta: req.meta }))
};

const isAuthenticated = (req, res, next) => {
  //checks go here
  const isAuth = false;

  if (isAuth) {
    return next();
  } else {
    res.redirect('/');
  }

  //if (req.user.authenticated)
  // return next();

  // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
  // res.redirect('/');
};

module.exports = {
  setResponse,
  setResponseError,
  methodNotAllowed,
  requestMissingInformation,
  isAuthenticated,
  accessTokenRequired,
  incorrectToken,
  serverError,
};