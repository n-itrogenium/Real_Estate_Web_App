"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Percentage = new Schema({
    sale: {
        type: Number,
        required: true
    },
    rent: {
        type: Number,
        required: true
    }
});
exports.default = mongoose_1.default.model('Percentage', Percentage, 'percentage');
//# sourceMappingURL=percentage.js.map