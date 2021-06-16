import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Message = new Schema(
    {
        _id: {
            type: String
        }, 
        thread: {
            type: String,
            required: true
        },
        to: {
            type: String,
            required: true
        },
        from: {
            type: String,
            required: true
        },
        timestamp: {
            type: Date,
            required: true
        },
        content: {
            type: String
        }
    }
);

export default mongoose.model('Message', Message, 'messages');