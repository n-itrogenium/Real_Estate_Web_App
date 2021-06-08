"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let RealEstate = new Schema({
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
    }
});
exports.default = mongoose_1.default.model('RealEstate', RealEstate, 'realestate');
//# sourceMappingURL=real-estate.js.map