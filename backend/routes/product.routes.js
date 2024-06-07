const express = require("express");
const router = express.Router();
const productControllers = require("../controllers/product.controllers");

router.post("/create", create);
router.get("/getAll", getAll);
router.get("/:id", getById);
router.put("/:id", update);
router.delete("/:id", _delete);

module.exports = router;

function create(req, res, next) {
  productControllers.create(req.body)
    .then((product) => res.json({ product: product, message: "Product created successfully" }))
    .catch((error) => next(error));
}

async function getAll(req, res, next) {
  try {
    const products = await productControllers.getAll();
    res.json(products);
  } catch (err) {
    next(err);
  }
}

function getById(req, res, next) {
  productControllers.getById(req.params.id)
    .then((product) => {
      if (!product) {
        res.status(404).json({ message: "Product not found" });
        return;
      }
      res.json(product);
    })
    .catch((error) => next(error));
}

function update(req, res, next) {
  productControllers.update(req.params.id, req.body)
    .then(() => res.json({ message: `Product with id ${req.params.id} updated successfully` }))
    .catch((error) => next(error));
}

function _delete(req, res, next) {
  productControllers.delete(req.params.id)
    .then(() => res.json({ message: `Product with id ${req.params.id} deleted successfully` }))
    .catch((error) => next(error));
}
