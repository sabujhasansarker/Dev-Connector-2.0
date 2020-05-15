const user = require("./user");
const profile = require("./profile");
const post = require("./post");

const routers = [
  {
    path: "/user",
    hedelar: user,
  },
  {
    path: "/profile",
    hedelar: profile,
  },
  {
    path: "/post",
    hedelar: post,
  },
];

module.exports = (app) => {
  routers.forEach((router) => {
    app.use(router.path, router.hedelar);
  });
};
