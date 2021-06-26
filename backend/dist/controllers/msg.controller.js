"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgController = void 0;
const msgthread_1 = __importDefault(require("../models/msgthread"));
const message_1 = __importDefault(require("../models/message"));
const user_1 = __importDefault(require("../models/user"));
class MsgController {
    constructor() {
        this.getAllThreads = (req, res) => {
            msgthread_1.default.find({ $or: [{ 'user1': req.body.username }, { 'user2': req.body.username }] }, (err, thread) => {
                if (err)
                    console.log(err);
                else
                    res.json(thread);
            });
        };
        this.getAllMessages = (req, res) => {
            message_1.default.find({ 'thread': req.body.thread_id }, (err, messages) => {
                if (err)
                    console.log(err);
                else
                    res.json(messages);
            });
        };
        this.sendMessage = (req, res) => {
            user_1.default.collection.findOne({ 'username': req.body.to }, (err, user) => {
                if ((err || user == null) && req.body.to != 'Agencija') {
                    console.log(err);
                    res.status(400).json({ 'message': 'user not found' });
                }
                else {
                    if (req.body.thread == null) {
                        msgthread_1.default.collection.insertOne({
                            'subject': req.body.subject,
                            'realestate': req.body.realestate,
                            'user1': req.body.to,
                            'user2': req.body.from,
                            'active': true,
                            'read1': false,
                            'read2': true,
                            'timestamp': req.body.timestamp
                        }, (err, thr) => {
                            if (err)
                                console.log(err);
                            else {
                                let thread = thr.insertedId.toHexString();
                                message_1.default.collection.insertOne({
                                    'thread': thread,
                                    'to': req.body.to,
                                    'from': req.body.from,
                                    'timestamp': req.body.timestamp,
                                    'content': req.body.content
                                }, (err, msg) => {
                                    if (err)
                                        console.log(err);
                                    else {
                                        res.status(200).json({ 'message': 'message sent' });
                                    }
                                });
                            }
                        });
                    }
                    else {
                        var mongo = require('mongodb');
                        var o_id = new mongo.ObjectID(req.body.thread);
                        msgthread_1.default.collection.updateOne({ "_id": o_id, "user1": req.body.to }, {
                            $set: {
                                'active': true,
                                'read1': false,
                                'timestamp': req.body.timestamp
                            }
                        }, (err, data) => {
                            if (err) {
                                console.log(err);
                            }
                        });
                        msgthread_1.default.collection.updateOne({ "_id": o_id, "user2": req.body.to }, {
                            $set: {
                                'active': true,
                                'read2': false,
                                'timestamp': req.body.timestamp
                            }
                        }, (err, data) => {
                            if (err) {
                                console.log(err);
                            }
                        });
                        message_1.default.collection.insertOne({
                            'thread': req.body.thread,
                            'to': req.body.to,
                            'from': req.body.from,
                            'timestamp': req.body.timestamp,
                            'content': req.body.content
                        }, (err, msg) => {
                            if (err)
                                console.log(err);
                            else {
                                res.status(200).json({ 'message': 'message sent' });
                            }
                        });
                    }
                }
            });
        };
        this.readMessage = (req, res) => {
            var mongo = require('mongodb');
            var o_id = new mongo.ObjectID(req.body.thread);
            if (req.body.user1) {
                msgthread_1.default.collection.updateOne({ "_id": o_id }, {
                    $set: {
                        'read1': true
                    }
                }, (err, data) => {
                    if (err)
                        console.log(err);
                    else
                        res.status(200).json({ 'message': 'user1 read message' });
                });
            }
            else {
                msgthread_1.default.collection.updateOne({ "_id": o_id }, {
                    $set: {
                        'read2': true
                    }
                }, (err, data) => {
                    if (err)
                        console.log(err);
                    else
                        res.status(200).json({ 'message': 'user2 read message' });
                });
            }
        };
        this.archiveThread = (req, res) => {
            var mongo = require('mongodb');
            var o_id = new mongo.ObjectID(req.body.thread);
            msgthread_1.default.collection.updateOne({ "_id": o_id }, {
                $set: {
                    'active': req.body.active
                }
            }, (err, data) => {
                if (err)
                    console.log(err);
                else
                    res.status(200).json({ 'message': 'user1 read message' });
            });
        };
    }
}
exports.MsgController = MsgController;
//# sourceMappingURL=msg.controller.js.map