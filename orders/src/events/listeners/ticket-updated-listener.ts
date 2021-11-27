import { Message } from "node-nats-streaming";
import { Subjects, Listener, TicketUpdatedEvent } from "@luketickets/common";
import { queuueGroupName } from "./queue-group-name";
import { Ticket } from "../../models/ticket";

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
    queueGroupName = queuueGroupName;

    async onMessage(data: TicketUpdatedEvent["data"], msg: Message) {
        const ticket = await Ticket.findByEvent(data);

        if (!ticket) {
            throw new Error("Ticket not found");
        }
        // custom version plugin
        // const { title, price, version } = data;
        // ticket.set({ title, price, version });

        const { title, price } = data;
        ticket.set({ title, price });
        await ticket.save();

        msg.ack();
    }
}
