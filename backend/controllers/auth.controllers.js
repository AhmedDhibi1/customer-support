const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const  User = require("../models/user");
roleServices = require("./role.controllers");
const userControllers = require("./user.controllers");

async function authenticate({ email, password }) {
  const user = await User.findOne({ where: { email } });
  if (user && bcrypt.compareSync(password, user.password)) {
  
    const token = jwt.sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '10d',
      
    });
  
    return { ...user.toJSON(), token };
  }
}

function verifyToken(req, res) {
    return new Promise((resolve, reject) => {
       const token = req.cookies.token;
       if (!token) {
        console.log('No token provided');
         return res.status(401).json({ message: 'No token provided' });
         
       }
       jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
         if (err) {
        console.log('Failed to authenticate token');
           return res.status(403).json({ message: 'Failed to authenticate token' });
           
         }
         resolve(decoded);
       });
    });
   }

   function getTokenId(req) {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    return decoded.userId;
}


// Middleware to verify token and check permission
function verifyTokenAndPermission(permissionName) {
  return async (req, res, next) => {
    console.log('-------------------------------------verifyTokenAndPermission  ',permissionName);
     try {
       // Verify the token
       const decoded = await verifyToken(req, res);
       if (!decoded) {
         return res.status(401).json({ message: 'No token provided or token is invalid' });
       }
 
       // Check the user's permission
       const userId = decoded.userId;
       console.log('userId:', userId);
       const hasPermission = await userControllers.checkPermission(userId, permissionName);
       console.log('----------hasPermission:', hasPermission);
       if (!hasPermission) {
         return res.status(403).json({ message: 'Not Authorized!' });
       }
 
       // If everything is fine, proceed to the next middleware or route handler
       next();
     } catch (error) {
       // Handle errors appropriately
       res.status(500).json({ message: 'Server error' });
     }
  };
 } 

module.exports = {
    verifyTokenAndPermission,
    verifyToken,
    getTokenId,
    authenticate
};