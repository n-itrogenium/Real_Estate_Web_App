import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Rent = new Schema(
    {
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
        }
    }
);

export default mongoose.model('Rent', Rent, 'rents');