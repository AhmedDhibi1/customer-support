const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/user.controllers");
const AuthControllers = require("../controllers/auth.controllers");
const  User = require("../models/user");

const jwt = require("jsonwebtoken");
require('dotenv').config();


router.get('/checkPermission/:permissionName',checkPermission);
router.post("/authenticate", authenticate);
router.post("/register", register);
router.get("/getAll", AuthControllers.verifyTokenAndPermission('users-getAll'),getAll);
router.get("/current", getCurrent); 
router.get("/:id",AuthControllers.verifyTokenAndPermission('users-getById'), getById);
router.put("/:id",AuthControllers.verifyTokenAndPermission('users-update'), update);
router.delete("/:id",AuthControllers.verifyTokenAndPermission('users-delete'), _delete);

module.exports = router;


async function checkPermission (req, res){
  try {
    // Get the permission name from the request parameters
    const { permissionName } = req.params;

    // Extract user ID from decoded token
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const userId = decoded.userId;

    // Check if the user has the specified permission
    const hasPermission = await userControllers.checkPermission(userId, permissionName);

    // Return the boolean value indicating whether the user has the permission
    res.json({ hasPermission });
  } catch (error) {
    console.error('Error checking permission:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

function authenticate(req, res, next) {
  AuthControllers.authenticate(req.body)
    .then((user) => {
      user ? res.json({ user: user, message: "User logged in successfully" }) : res.status(400).json({ message: "Username or password is incorrect." });
    })
    .catch((error) => next(error));
}

function register(req, res, next) {
  
  // Ensure that req.body contains all required properties
  if (!req.body || !req.body.email || !req.body.password) {
    return res.status(400).json({ message: `Invalid request body` });
  }
  
  userControllers.create(req.body)
    .then((user) => res.json({ user: user, message: `User Registered successfully with email ${req.body.email}` }))
    .catch((error) => next(error));
}
async function getAll(req, res, next) {
  try {
     const users = await userControllers.getAll(req, res); 
     res.json(users);
  } catch (err) {
     // Handle errors appropriately
     res.status(401).json({ message: "Not Authorized!" });
  }
 }


function getCurrent(req, res, next) {
  // Extract the token from the request headers
  const token = req.cookies.token;
  
  // Decode the token to access the payload
  const decodedToken = jwt.decode(token);

  // Check if the decoded token contains the user ID
  if (!decodedToken || !decodedToken.userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Pass the user ID to the getById function
  userControllers.getById(decodedToken.userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    })
    .catch((error) => next(error));
}

function getById(req, res, next) {
  userControllers.getById(req.params.id)
    .then((user) => {
      if (!user) {
        console.log(user);
        res.status(404).json({ message: "User Not Found!" });
        next();
      }
      
      return res.json(user);
    })
    .catch((error) => next(error));
}

function update(req, res, next) {
  console.log('req.body:', req.body);
  userControllers.update(req.params.id, req.body)
    .then(() =>{ res.json({ message: `User with id: ${req.params.id} updated successfully.` })
            console.log(`User with id: ${req.params.id} updated successfully.`) })
    .catch((error) => next(error));
}

function _delete(req, res, next) {
  userControllers.delete(req.params.id)
    .then(() =>res.json({ message: `User with id: ${req.params.id} deleted successfully.` }))
    .catch((error) => next(error));
}