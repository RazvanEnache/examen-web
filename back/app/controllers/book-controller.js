const DATABASE = require("../models");
const Book = DATABASE.book;

exports.findAll = (req, res) => {
  Book.findAll()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.warn(err);
      res.status(500).send({
        message: "error",
      });
    });
};

exports.findByIdVirtualShelf = (req, res) => {
  const idVirtualShelf = req.params.idVirtualShelf;

  Book.findAll({ where: { idVirtualShelf: idVirtualShelf } })
    .then((data) => {
      if (data) {
        res.status(200).send(data);
      } else {
        res.status(404).send({
          message: `Cannot get books`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error from server",
      });
    });
};

exports.findOne = (req, res) => {
  const idBook = req.params.idBook;

  Book.findByPk(idBook)
    .then((data) => {
      if (data) {
        res.status(200).send(data);
      } else {
        res.status(404).send({
          message: `Cannot get Book with idBook=${idBook}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error from server",
      });
    });
};

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "empty",
    });
    return;
  }

  const config = {
    idVirtualShelf: req.body.idVirtualShelf,
    genLiterar: req.body.genLiterar,
    titlu: req.body.titlu,
    url: req.body.url,
  };

  Book.create(config)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.warn(err);
      res.status(500).send({
        message: "error from server",
      });
    });
};

exports.update = async (req, res) => {
  const idBook = req.params.idBook;

  try {
    const book = await Book.findByPk(idBook);

    if (book) {
      await book.update(req.body, {
        fields: ["idVirtualShelf", "genLiterar", "titlu", "url"],
      });
      res.status(202).json({ message: "accepted" });
    } else {
      res.status(404).json({ message: "not found" });
    }
  } catch (err) {
    console.warn(err);
    res.status(500).json({ message: "some error occured" });
  }
};

exports.delete = (req, res) => {
  const idBook = req.params.idBook;

  Book.destroy({
    where: { idBook: idBook },
  })
    .then((nrRecordsAffected) => {
      if (nrRecordsAffected == 1) {
        res.status(201).send({
          message: "deleted",
        });
      } else {
        res.send({
          message: `Cannot delete Book`,
        });
      }
    })
    .catch((err) => {
      console.warn(err);
      res.status(500).send({
        message: "error from server",
      });
    });
};
