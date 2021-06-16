import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let MsgThread = new Schema(
    {
        _id: {
            type: String
        },
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
        read1: {
            type: Boolean,
            required: true
        },
        read2: {
            type: Boolean,
            required: true
        },
        timestamp: {
            type: Date,
            required: true
        }
    }
);

export default mongoose.model('MsgThread', MsgThread, 'msgthreads');