const Message = require('../models/message');
const { Op } = require('sequelize');

module.exports = function(io) {
    io.on('connection', (socket) => {
        console.log('A user connected');

        socket.on('joinChat', (chatId) => {
            socket.join(chatId);
            // Send previous messages upon joining
            Message.findAll({
                where: {
                    ticketId: chatId
                }
                ,attributes: ['id', 'message', 'createdAt', 'senderId', 'ticketId']
            })
            .then(messages => {
               io.in(chatId).emit("previousMessages", messages);
            })
            .catch(error => {
                console.error('Error fetching previous messages:', error);
            });
        });

        socket.on('sendMessage', (messageObject) => {
         console.log('sendMessage', messageObject.message,
             messageObject.ticketId,
             messageObject.senderId,
            messageObject.createdAt);
            Message.create({
                message: messageObject.message,
                ticketId: messageObject.ticketId,
                senderId: messageObject.senderId,
                createdAt:messageObject.createdAt
            })
            .then(() => {
                io.in(messageObject.ticketId).emit('newMessage',messageObject);
            })
            .catch(error => {
                console.error('Error saving message to database:', error);
            });
        });

        socket.on('disconnect', () => {
            console.log('A user disconnected');
        });
    });
};