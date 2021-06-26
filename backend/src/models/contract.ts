import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Contract = new Schema(
    {
        _id: {
            type: String
        },
        realestate: {
            type: String,
            required: true
        },
        sale: {
            type: Number,
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
        price: {
            type: Number,
            required: true
        }
    }
);

export default mongoose.model('Contract', Contract, 'contracts');