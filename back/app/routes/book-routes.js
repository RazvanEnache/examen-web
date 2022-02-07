module.exports = (app) => {
  const book = require("../controllers/book-controller.js");

  var router = require("express").Router();

  router.get("/", book.findAll);

  router.post("/", book.create);

  router.get("/virtualShelf/:idVirtualShelf", book.findByIdVirtualShelf);

  router.get("/:idBook", book.findOne);

  router.delete("/:idBook", book.delete);

  router.put("/:idBook", book.update);

  app.use("/api/book", router);
};
