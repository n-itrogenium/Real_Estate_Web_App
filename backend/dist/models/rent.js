"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Rent = new Schema({
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
});
exports.default = mongoose_1.default.model('Rent', Rent, 'rents');
//# sourceMappingURL=rent.js.map