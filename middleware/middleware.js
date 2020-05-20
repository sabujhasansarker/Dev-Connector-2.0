const fileUpload = require("express-fileupload");
const express = require("express");

const middlewares = [express.json({ extendend: false }), fileUpload()];

module.exports = (app) => {
  middlewares.forEach((middleware) => {
    app.use(middleware);
  });
};
