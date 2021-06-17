import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Block = new Schema(
    {
        blocker: {
            type: String,
            required: true
        },
        blocked: {
            type: String,
            required: true
        }
    }
);

export default mongoose.model('Block', Block, 'blocks');