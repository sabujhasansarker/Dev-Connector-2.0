const user = require("./user");

const routers = [
  {
    path: "/user",
    hedelar: user,
  },
];

module.exports = (app) => {
  routers.forEach((router) => {
    app.use(router.path, router.hedelar);
  });
};
