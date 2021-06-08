import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let User = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        surname: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        avatar: {
            type: String
        },
        mail: {
            type: String,
            required: true,
            unique: true
        },
        city: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        type: {
            type: Number,
            default: 1
        },
        active: {
            type: Boolean,
            default: false
        }
    }
);

export default mongoose.model('User', User, 'users');