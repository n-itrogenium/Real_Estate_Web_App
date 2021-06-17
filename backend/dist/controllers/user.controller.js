"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_1 = __importDefault(require("../models/user"));
const block_1 = __importDefault(require("../models/block"));
class UserController {
    constructor() {
        this.login = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            user_1.default.findOne({ 'username': username, 'password': password }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.register = (req, res) => {
            let user = new user_1.default(req.body);
            //insertovanje objekata u mongo bazu:
            user.save().then((user) => {
                res.status(200).json({ 'message': 'user added' });
            }).catch((err) => {
                res.status(400).json({ 'message': err });
            });
        };
        this.getAllUsers = (req, res) => {
            user_1.default.find({}, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.updateUser = (req, res) => {
            let name = req.body.name;
            let surname = req.body.surname;
            let username = req.body.username;
            let avatar = req.body.avatar;
            let mail = req.body.mail;
            let city = req.body.city;
            let country = req.body.country;
            let type = req.body.type;
            user_1.default.findOne({ 'username': username }, (err, user) => {
                if (err) {
                    console.log(err);
                }
                else {
                    user_1.default.collection.updateOne({ 'username': username }, { $set: {
                            'name': name,
                            'surname': surname,
                            'avatar': avatar,
                            'mail': mail,
                            'city': city,
                            'country': country,
                            'type': type
                        }
                    });
                    res.status(200).json({ 'message': 'user updated' });
                }
            });
        };
        this.changePassword = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            user_1.default.findOne({ 'username': username }, (err, user) => {
                if (err) {
                    console.log(err);
                }
                else {
                    if (user) {
                        user_1.default.collection.updateOne({ 'username': username }, { $set: { 'password': password } });
                        res.status(200).json({ 'message': 'password changed' });
                    }
                    else {
                        res.status(400).json({ 'message': 'password not changed' });
                    }
                }
            });
        };
        this.blockUser = (req, res) => {
            block_1.default.collection.insertOne({
                'blocker': req.body.blocker,
                'blocked': req.body.blocked
            }, (err, data) => {
                if (err)
                    console.log(err);
                else {
                    res.status(200).json({ 'message': 'user blocked' });
                }
            });
        };
        this.unblockUser = (req, res) => {
            block_1.default.collection.deleteOne({
                'blocker': req.body.blocker,
                'blocked': req.body.blocked
            }, (err, data) => {
                if (err)
                    console.log(err);
                else {
                    res.status(200).json({ 'message': 'user unblocked' });
                }
            });
        };
        this.getAllBlocks = (req, res) => {
            block_1.default.find({}, (err, block) => {
                if (err)
                    console.log(err);
                else
                    res.json(block);
            });
        };
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map