import mongoose from 'mongoose';

const Schema = mongoose.Schema;

class Message {
    to: string;
    from: string;
    timestamp: Date;
    read: boolean;
    content: string;
}

let MsgThread = new Schema(
    {
        subject: {
            type: String,
            required: true
        },
        user1: {
            type: String,
            required: true
        },
        user2: {
            type: String,
            required: true
        },
        active: {
            type: Boolean,
            required: true
        },
        read: {
            type: Boolean,
            required: true
        },
        messages: {
            type: Array<Message>()
        }
    }
);

export default mongoose.model('MsgThread', MsgThread, 'msgthreads');