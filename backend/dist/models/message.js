"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Message = new Schema({
    _id: {
        type: String
    },
    thread: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        required: true
    },
    content: {
        type: String
    }
});
exports.default = mongoose_1.default.model('Message', Message, 'messages');
//# sourceMappingURL=message.js.map