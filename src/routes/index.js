const nguyenlieuRouter = require("./nguyenlieu");
const siteRouter = require("./site");

function route(app) {
  app.use("/nguyenlieu", nguyenlieuRouter);

  app.use("/", siteRouter);
}

module.exports = route;
