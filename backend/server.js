const express = require("express");
const cors = require('cors');
const usersRouter = require("./routes/user.routes");
const rolesRouter = require("./routes/role.routes");
const permissionRouter = require("./routes/permission.routes");
const ticketRouter = require("./routes/ticket.routes");
const productRouter = require("./routes/product.routes");
const serviceRouter = require("./routes/service.routes");
const messageRoutes = require("./routes/message.routes");
const ticketItemRoutes = require("./routes/ticketItem.routes");
const chatbotRouter = require("./routes/chatbot.routes");
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const sequelize = require('./config/db');
require('dotenv').config();
const http = require('http');
const socketIo = require('socket.io');
const { col } = require("sequelize");



app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.BASE_URL , 
    credentials: true
}));

app.use((req, res, next) => {
   res.setHeader('Content-Security-Policy', "default-src 'self'; img-src 'self' http://localhost:5000; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';");
   next();
  });

const basePath=process.env.BASE_PATH;
app.use(`${basePath}/test`, rolesRouter);
app.use(`${basePath}/chatbot`, chatbotRouter);
app.use(`${basePath}/uploads`, express.static('uploads'));
app.use(`${basePath}/ticketItems`, ticketItemRoutes);
app.use(`${basePath}/users`, usersRouter);
app.use(`${basePath}/roles`, rolesRouter);
app.use(`${basePath}/permissions`, permissionRouter);
app.use(`${basePath}/tickets`, ticketRouter);
app.use(`${basePath}/products`, productRouter);
app.use(`${basePath}/services`, serviceRouter);
app.use(`${basePath}/messages`, messageRoutes);


// Create HTTP server
const server = http.createServer(app);

// Attach Socket.IO to the HTTP server
const io = socketIo(server, {
   cors: {
       origin: process.env.BASE_URL , // Adjust this to match your client's origin
       methods: ["GET", "POST", "PUT", "DELETE"],
       credentials: true
   }
});

// Socket.io logic handled in messages.controller.js
require('./controllers/message.controllers')(io);

// Sync models with the database
sequelize.sync()
 .then(() => {
    console.log('Models synchronized with the database.');
 })
 .catch(error => {
    console.error('Error synchronizing models:', error);
 });

// Use the HTTP server to listen for requests
server.listen(5000, () => console.log(`Server is listening on PORT: 5000`));