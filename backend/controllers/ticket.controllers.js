const Ticket = require("../models/ticket");

async function create(ticketData ) {
  console.log(ticketData);
  const { title, description, status, priority,UserId, uploadFile,TicketItemId } = ticketData;

  return await Ticket.create(
    {
      title: title,
      description: description,
      status:  status,
      priority: priority,
      uploadFile:uploadFile,
      UserId: UserId,
      TicketItemId: TicketItemId

    }
  );
}
async function getAll() {
  return await Ticket.findAll();
}

async function getById(id) {
  return await Ticket.findByPk(id);
}

async function update(id, ticketData) {
 console.log('Ticket to update:', id);
 console.log('Ticket data:', ticketData);

 // Validate and convert agentId to an integer if necessary
 if (ticketData.agentId && !Number.isInteger(ticketData.agentId)) {
    ticketData.agentId = parseInt(ticketData.agentId, 10);
    if (isNaN(ticketData.agentId)) {
      throw new Error("Invalid agentId value");
    }
 }

 try {
    const ticket = await Ticket.findByPk(id);
    if (!ticket) {
      throw new Error("Ticket not found");
    }

    await ticket.update(ticketData);
    console.log('Ticket updated successfully');
 } catch (error) {
    console.error('Error updating ticket:', error);
    throw error; // Re-throw the error or handle it differently depending on your application's needs
 }
}
async function _delete(id) {
  const ticket = await Ticket.findByPk(id);
  if (!ticket) {
    throw new Error("Ticket not found");
  }
  await ticket.destroy();
}

module.exports = {
  create,
  getAll,
  getById,
  update,
  delete: _delete,
};
