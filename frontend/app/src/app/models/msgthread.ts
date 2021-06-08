import { Message } from "./message";

export class MsgThread {
    subject: string;
    user1: string;
    user2: string;
    active: boolean;
    read: boolean;
    messages: Message[];
}