const user = require("./user");
const profile = require("./profile");

const routers = [
  {
    path: "/user",
    hedelar: user,
  },
  {
    path: "/profile",
    hedelar: profile,
  },
];

module.exports = (app) => {
  routers.forEach((router) => {
    app.use(router.path, router.hedelar);
  });
};
