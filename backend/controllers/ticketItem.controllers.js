// Assuming this is in a file named ticketItem.controllers.js
const TicketItem = require("../models/ticketItem");
const Ticket = require("../models/ticket");

async function create(ticketItemData) {
 return await TicketItem.create(ticketItemData);
}

async function getAll() {
 return await TicketItem.findAll();
}

async function getById(id) {
 return await TicketItem.findByPk(id);
}

async function update(id, ticketItemData) {
 const ticketItem = await TicketItem.findByPk(id);
 console.log('ticketItem', ticketItem);
 if (!ticketItem) {
    throw new Error("TicketItem not found");
 }
 await ticketItem.update(ticketItemData);
}

async function _delete(id) {
 const ticketItem = await TicketItem.findByPk(id);
 if (!ticketItem) {
    throw new Error("TicketItem not found");
 }
 await Ticket.destroy({
   where: {
      TicketItemId: id 
   }
});
 await ticketItem.destroy();
}

module.exports = {
 create,
 getAll,
 getById,
 update,
 delete: _delete,
};