// message.routes.js
const express = require("express");
const router = express.Router();
const messageControllers = require("../controllers/message.controllers");

router.post("/create", async (req, res, next) => {
 try {
    
    const message = await messageControllers.create(req.body);
    res.json({ message, message: "Message created successfully" });
 } catch (error) {
    next(error);
 }
});

router.get("/getAll", async (req, res, next) => {
 try {
    const messages = await messageControllers.getAll();
    res.json(messages);
 } catch (error) {
    next(error);
 }
});

router.delete("/:id", async (req, res, next) => {
 try {
    await messageControllers.remove(req.params.id);
    res.json({ message: `Message with id: ${req.params.id} deleted successfully` });
 } catch (error) {
    next(error)
 }
});

module.exports = router;