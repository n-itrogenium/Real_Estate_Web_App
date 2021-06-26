import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let RealEstate = new Schema(
    {
        _id: {
            type: String
        },
        name: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        municipality: {
            type: String,
            required: true
        },
        type: {
            type: Number,
            required: true
        },
        height: {
            type: Number,
            required: true
        },
        floor: {
            type: Number
        },
        squaremeters: {
            type: Number,
            required: true
        },
        rooms: {
            type: Number,
            required: true
        },
        furnished: {
            type: Boolean,
            required: true
        },
        gallery: {
            type: Array
        },
        sale: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        owner: {
            type: String,
            required: true
        },
        promo: {
            type: Boolean,
            required: true,
            default: false
        },
        approved: {
            type: Boolean,
            required: true,
            default: false
        },
        sold: {
            type: Boolean,
            required: true,
            default: false
        }
    }
);

export default mongoose.model('RealEstate', RealEstate, 'realestate');