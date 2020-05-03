// server errors
exports.serverError = (res, err) => {
  console.log(err.message);
  res.status(500).send("Server Error");
};

// Express validation
exports.validationErrors = (res, errors) => {
  res.status(400).json({ errors: errors.array() });
};
