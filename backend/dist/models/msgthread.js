"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let MsgThread = new Schema({
    _id: {
        type: String
    },
    subject: {
        type: String,
        required: true
    },
    realestate: {
        type: String
    },
    user1: {
        type: String,
        required: true
    },
    user2: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        required: true
    },
    read1: {
        type: Boolean,
        required: true
    },
    read2: {
        type: Boolean,
        required: true
    },
    timestamp: {
        type: Date,
        required: true
    }
});
exports.default = mongoose_1.default.model('MsgThread', MsgThread, 'msgthreads');
//# sourceMappingURL=msgthread.js.map