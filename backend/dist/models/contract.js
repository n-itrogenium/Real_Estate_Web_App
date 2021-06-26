"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Contract = new Schema({
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
});
exports.default = mongoose_1.default.model('Contract', Contract, 'contracts');
//# sourceMappingURL=contract.js.map