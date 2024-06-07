const express = require('express');
const router = express.Router();
const ticketControllers = require("../controllers/ticket.controllers");
const jwt = require("jsonwebtoken");
require('dotenv').config();

router.post("/create", create);
router.get("/getAll", getAll);
router.get("/:id", getById);
router.put("/:id", update);
router.delete("/:id", _delete);

module.exports = router;


const multer = require('multer');

const storage = multer.diskStorage({
 destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify the upload directory
 },
 filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Generate a unique filename
 },
});

const upload = multer({ storage: storage });


function create(req, res, next) {
  console.log("create ticket");
  // Use multer to handle the file upload
  upload.single('uploadFile')(req, res, async (err) => {
     if (err) {
       return next(err);
     }
 // Extract the token from the request headers
 const token = req.cookies.token;  
 // Decode the token to access the payload
 const decodedToken = jwt.decode(token);

 // Check if the decoded token contains the user ID
 if (!decodedToken || !decodedToken.userId) {
   return res.status(401).json({ message: 'Unauthorized' });
 }
     // Extract the file URL from the uploaded file
     const fileUrl = req.file ? req.file.path : null;
 console.log(req.body);
     // Replace the file data in the request body with the file URL
     const ticketData = {
       ...req.body,
        UserId: decodedToken.userId,
       uploadFile: fileUrl, // Assuming 'uploadFile' is the field name for the file URL
     };
 console.log(ticketData);
     try {
       const ticket = await ticketControllers.create(ticketData);
       res.json({ ticket: ticket, message: "Ticket created successfully" });
     } catch (error) {
       next(error);
     }
  });
 }

//  async function getAll(req, res, next) {
//   try {
//      const tickets = await ticketControllers.getAll();
//      // Assuming each ticket object has an 'uploadFile' property that contains the file name
//      const ticketsWithFileUrls = tickets.map(ticket => ({
//        ...ticket,
//        uploadFile: ticket.uploadFile ? `http://localhost:5000/${ticket.uploadFile}` : null,
       
//      }));
     
//      res.json(ticketsWithFileUrls);
//   } catch (err) {
//      next(err);
//   }
//  }
async function getAll(req, res, next) {
  try {
    const tickets = await ticketControllers.getAll();
    
    // Iterate through each ticket and update the file URL
    for (let i = 0; i < tickets.length; i++) {
      if (tickets[i].uploadFile) {
        tickets[i].uploadFile = `http://localhost:5000/customer-support/${tickets[i].uploadFile}`;
      }
    }
    
    res.json(tickets);
  } catch (err) {
    next(err);
  }
}

function getById(req, res, next) {
  ticketControllers.getById(req.params.id)
    .then((ticket) => {
      if (!ticket) {
        res.status(404).json({ message: "Ticket not found" });
        return;
      }
      res.json(ticket);
    })
    .catch((error) => next(error));
}

function update(req, res, next) {
  console.log(req.body.uploadFile);
  upload.single('uploadFile')(req, res, async (err) => {
     if (err) {
       return next(err);
     }
     const fileUrl = req.file ? req.file.path : null;
     console.log('-----------------------', fileUrl);
      ticketData = {}
 if (fileUrl === null) {
      ticketData = {
       ...req.body,
     };
    }else{
        ticketData = {
         ...req.body,
         uploadFile: fileUrl, 
       };
     }
     console.log(ticketData);
 
     try {
       await ticketControllers.update(req.params.id, ticketData);
       res.json({ message: `Ticket with id ${req.params.id} updated successfully` });
     } catch (error) {
       next(error);
     }
  });
 }

function _delete(req, res, next) {
  ticketControllers.delete(req.params.id)
    .then(() => res.json({ message: `Ticket with id ${req.params.id} deleted successfully` }))
    .catch((error) => next(error));
}
