import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Offer = new Schema(
    {
        _id: {
            type: String
        },
        realestate: {
            type: String,
            required: true
        },
        owner: {
            type: String,
            required: true
        },
        client: {
            type: String,
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        accepted: {
            type: Boolean,
            required: true,
            default: false
        },
        valid: {
            type: Boolean,
            required: true,
            default: false
        },
    }
);

export default mongoose.model('Offer', Offer, 'offers');