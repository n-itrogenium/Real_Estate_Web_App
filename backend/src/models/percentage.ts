import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Percentage = new Schema(
    {
        sale: {
            type: Number,
            required: true
        },
        rent: {
            type: Number,
            required: true
        }
    }
);

export default mongoose.model('Percentage', Percentage, 'percentage');