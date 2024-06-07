const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/service.controllers");

router.post("/create", create);
router.get("/getAll", getAll);
router.get("/:id", getById);
router.put("/:id", update);
router.delete("/:id", _delete);

module.exports = router;

function create(req, res, next) {
  serviceController.create(req.body)
    .then((service) => res.json({ service: service, message: "Service created successfully" }))
    .catch((error) => next(error));
}

async function getAll(req, res, next) {
  try {
    const services = await serviceController.getAll();
    res.json(services);
  } catch (err) {
    next(err);
  }
}

function getById(req, res, next) {
  serviceController.getById(req.params.id)
    .then((service) => {
      if (!service) {
        res.status(404).json({ message: "Service not found" });
        return;
      }
      res.json(service);
    })
    .catch((error) => next(error));
}

function update(req, res, next) {
  serviceController.update(req.params.id, req.body)
    .then(() => res.json({ message: `Service with id ${req.params.id} updated successfully` }))
    .catch((error) => next(error));
}

function _delete(req, res, next) {
  serviceController.delete(req.params.id)
    .then(() => res.json({ message: `Service with id ${req.params.id} deleted successfully` }))
    .catch((error) => next(error));
}
