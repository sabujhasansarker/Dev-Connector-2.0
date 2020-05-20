// server errors
exports.serverError = (res, err) => {
  console.log(err.message);
  res.json(err.message);
};

// Express validation
exports.validationErrors = (res, errors) => {
  res.status(400).json({ errors: errors.array() });
};
