const DATABASE = require("../models");
const VirtualShelf = DATABASE.virtualshelf;

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Not found",
    });
    return;
  }
  VirtualShelf.create(req.body)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.warn(err);
      res.status(500).send({
        message: "Can't create VirtualShelf",
      });
    });
};

exports.findAll = (req, res) => {
  VirtualShelf.findAll({ order: [["createdAt", "DESC"]] })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.warn(err);
      res.status(500).send({
        message: "Can't get VirtualShelfs",
      });
    });
};

exports.findOne = (req, res) => {
  const idVirtualShelf = req.params.idVirtualShelf;

  VirtualShelf.findByPk(idVirtualShelf)
    .then((data) => {
      if (data) {
        res.status(200).send(data);
      } else {
        res.status(404).send({
          message: `Cannot get VirtualShelf with id=${idVirtualShelf}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          "Cannot get from server VirtualShelf with id=" + idVirtualShelf,
      });
    });
};

exports.findByIdVirtualShelfAndDescription = (req, res) => {
  const idVirtualShelf = req.query.idVirtualShelf;
  const description = req.query.description;
  console.warn(idVirtualShelf, description);
  VirtualShelf.findAll({
    where: { idVirtualShelf: idVirtualShelf, description: description },
  })
    .then((data) => {
      if (data) {
        res.status(200).send(data);
      } else {
        res.status(404).send({
          message: `Cannot get VirtualShelf with idVirtualShelf=${idVirtualShelf}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          "Cannot get from server VirtualShelf with id=" + idVirtualShelf,
      });
    });
};

exports.update = async (req, res) => {
  const idVirtualShelf = req.params.idVirtualShelf;

  try {
    const virtualShelf = await VirtualShelf.findByPk(req.params.idVirtualShelf);

    if (virtualShelf) {
      await virtualShelf.update(req.body, { fields: ["description"] });
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
  const idVirtualShelf = req.params.idVirtualShelf;

  VirtualShelf.destroy({
    where: { idVirtualShelf: idVirtualShelf },
  })
    .then((nrRecordsUpdated) => {
      if (nrRecordsUpdated == 1) {
        res.status(200).send({
          message: "deleted",
        });
      } else {
        res.send({
          message: `Cannot delete VirtualShelf with id=${idVirtualShelf}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error deleting VirtualShelf with id=" + idVirtualShelf,
      });
    });
};
