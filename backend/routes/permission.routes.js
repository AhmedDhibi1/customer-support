const express = require("express");
const router = express.Router();
const permissionControllers = require("../controllers/permission.controllers");

router.post("/create", create);
router.get("/getAll", getAll);
router.get("/:id", getById);
router.put("/:id", update);
router.delete("/:id", _delete);

module.exports = router;

function create(req, res, next) {
  permissionControllers.create(req.body)
    .then((permission) => res.json({ permission: permission, message: "Permission created successfully" }))
    .catch((error) => next(error));
}

async function getAll(req, res, next) {
  console.log('getAll');
  try {
    const permissions = await permissionControllers.getAll();
    console.log('permissions', permissions);
    res.json(permissions);
  } catch (err) {
    next(err);
  }
}

function getById(req, res, next) {
  permissionControllers.getById(req.params.id)
    .then((permission) => {
      if (!permission) {
        res.status(404).json({ message: "Permission not found" });
        return;
      }
      res.json(permission);
    })
    .catch((error) => next(error));
}

function update(req, res, next) {
  permissionControllers.update(req.params.id, req.body)
    .then(() => res.json({ message: `Permission with id ${req.params.id} updated successfully` }))
    .catch((error) => next(error));
}

function _delete(req, res, next) {
  permissionControllers.delete(req.params.id)
    .then(() => res.json({ message: `Permission with id ${req.params.id} deleted successfully` }))
    .catch((error) => next(error));
}
