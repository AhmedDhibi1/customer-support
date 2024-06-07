// Assuming this is in a file named ticketItem.routes.js
const express = require("express");
const router = express.Router();
const ticketItemControllers = require("../controllers/ticketItem.controllers");

router.post("/create", (req, res, next) => {
 ticketItemControllers.create(req.body)
    .then((ticketItem) => res.json({ ticketItem, message: "TicketItem created successfully" }))
    .catch((error) => next(error));
});

router.get("/getAll", (req, res, next) => {
 ticketItemControllers.getAll()
    .then((ticketItems) => res.json(ticketItems))
    .catch((error) => next(error));
});

router.get("/:id", (req, res, next) => {
 ticketItemControllers.getById(req.params.id)
    .then((ticketItem) => {
      if (!ticketItem) {
        res.status(404).json({ message: "TicketItem not found" });
        return;
      }
      res.json(ticketItem);
    })
    .catch((error) => next(error));
});

router.put("/:id", (req, res, next) => {
  console.log('req.params.id', req.params.id);
  console.log('req.body', req.body);
 ticketItemControllers.update(req.params.id, req.body)
    .then(() => res.json({ message: `TicketItem with id ${req.params.id} updated successfully` }))
    .catch((error) => next(error));
});

router.delete("/:id", (req, res, next) => {
 ticketItemControllers.delete(req.params.id)
    .then(() => res.json({ message: `TicketItem with id ${req.params.id} deleted successfully` }))
    .catch((error) => next(error));
});

module.exports = router;