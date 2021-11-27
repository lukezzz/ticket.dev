import { Message } from "node-nats-streaming";
import { Subjects, Listener, TicketCreatedEvent } from "@luketickets/common";
import { Ticket } from "../../models/ticket";
import { queuueGroupName } from "./queue-group-name";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
    queueGroupName = queuueGroupName;

    async onMessage(data: TicketCreatedEvent["data"], msg: Message) {
        const { id, title, price } = data;
        const ticket = Ticket.build({
            id,
            title,
            price,
        });

        await ticket.save();

        msg.ack();
    }
}
