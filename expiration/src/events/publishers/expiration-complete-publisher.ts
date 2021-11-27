import {
    Subjects,
    Publisher,
    ExpirationCompleteEvnet,
} from "@luketickets/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvnet> {
    subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
