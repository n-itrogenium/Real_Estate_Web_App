import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Rent = new Schema(
    {
        _id: {
            type: String
        },
        realestate: {
            type: String,
            required: true
        },
        client: {
            type: String,
            required: true
        },
        startdate: {
            type: Date,
            required: true
        },
        enddate: {
            type: Date,
            required: true
        },
        valid: {
            type: Boolean,
            required: true,
            default: false
        }
    }
);

export default mongoose.model('Rent', Rent, 'rents');