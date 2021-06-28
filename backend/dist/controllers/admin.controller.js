"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const user_1 = __importDefault(require("../models/user"));
const percentage_1 = __importDefault(require("../models/percentage"));
const block_1 = __importDefault(require("../models/block"));
const contract_1 = __importDefault(require("../models/contract"));
const message_1 = __importDefault(require("../models/message"));
const msgthread_1 = __importDefault(require("../models/msgthread"));
const real_estate_1 = __importDefault(require("../models/real-estate"));
const rent_1 = __importDefault(require("../models/rent"));
class AdminController {
    constructor() {
        this.grantAccess = (req, res) => {
            let username = req.body.username;
            user_1.default.findOne({ 'username': username }, (err, user) => {
                if (err) {
                    console.log(err);
                }
                else {
                    if (user) {
                        user_1.default.collection.updateOne({ 'username': username }, { $set: { 'active': true } });
                        res.status(200).json({ 'message': 'user activated' });
                    }
                    else {
                        res.status(400).json({ 'message': 'user not found' });
                    }
                }
            });
        };
        this.deleteUser = (req, res) => {
            let username = req.body.username;
            user_1.default.collection.deleteOne({ 'username': username }, (err, data) => {
                if (err)
                    console.log(err);
                else {
                    block_1.default.collection.deleteMany({ 'blocker': username });
                    block_1.default.collection.deleteMany({ 'blocked': username });
                    contract_1.default.collection.deleteMany({ 'owner': username });
                    contract_1.default.collection.deleteMany({ 'client': username });
                    message_1.default.collection.deleteMany({ 'to': username });
                    message_1.default.collection.deleteMany({ 'from': username });
                    msgthread_1.default.collection.deleteMany({ 'user1': username });
                    msgthread_1.default.collection.deleteMany({ 'user2': username });
                    real_estate_1.default.collection.deleteMany({ 'owner': username });
                    rent_1.default.collection.deleteMany({ 'client': username });
                    res.status(200).json({ 'message': 'user deleted' });
                }
            });
        };
        this.setSalePercentage = (req, res) => {
            percentage_1.default.collection.findOne({}, (err, data) => {
                if (err)
                    console.log(err);
                else if (data)
                    percentage_1.default.collection.updateOne({}, { $set: { 'sale': req.body.percentage } }, (err, data) => {
                        if (err)
                            console.log(err);
                        else
                            res.status(200).json({ 'message': 'sale percentage set' });
                    });
                else
                    percentage_1.default.collection.insertOne({ 'sale': req.body.percentage, 'rent': null }, (err, data) => {
                        if (err)
                            console.log(err);
                        else
                            res.status(200).json({ 'message': 'sale percentage set' });
                    });
            });
        };
        this.setRentPercentage = (req, res) => {
            percentage_1.default.collection.findOne({}, (err, data) => {
                if (err)
                    console.log(err);
                else if (data)
                    percentage_1.default.collection.updateOne({}, { $set: { 'rent': req.body.percentage } }, (err, data) => {
                        if (err)
                            console.log(err);
                        else
                            res.status(200).json({ 'message': 'rent percentage set' });
                    });
                else
                    percentage_1.default.collection.insertOne({ 'sale': null, 'rent': req.body.percentage }, (err, data) => {
                        if (err)
                            console.log(err);
                        else
                            res.status(200).json({ 'message': 'rent percentage set' });
                    });
            });
        };
        this.getPercentage = (req, res) => {
            percentage_1.default.collection.findOne({}, (err, percentage) => {
                if (err)
                    console.log(err);
                else
                    res.json(percentage);
            });
        };
    }
}
exports.AdminController = AdminController;
//# sourceMappingURL=admin.controller.js.map