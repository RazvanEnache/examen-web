module.exports = (app) => {
  const virtualShelf = require("../controllers/virtualshelf-controller.js");

  var router = require("express").Router();

  router.post("/", virtualShelf.create);

  router.get("/", virtualShelf.findAll);

  router.get("/filter", virtualShelf.findByIdVirtualShelfAndDescription);

  router.get("/:idVirtualShelf", virtualShelf.findOne);

  router.put("/:idVirtualShelf", virtualShelf.update);

  router.delete("/:idVirtualShelf", virtualShelf.delete);

  app.use("/api/virtualShelf", router);
};
