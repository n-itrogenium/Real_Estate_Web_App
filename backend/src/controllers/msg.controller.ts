import express from 'express';
import MsgThread from '../models/msgthread';
import Message from '../models/message';
import User from '../models/user';

export class MsgController {

    getAllThreads = (req: express.Request, res: express.Response) => {
        MsgThread.find({ $or: [{ 'user1': req.body.username }, { 'user2': req.body.username }] }, (err, thread) => {
            if (err) console.log(err);
            else res.json(thread);
        })
    }

    getAllMessages = (req: express.Request, res: express.Response) => {
        Message.find({ 'thread': req.body.thread_id }, (err, messages) => {
            if (err) console.log(err);
            else res.json(messages);
        })
    }

    sendMessage = (req: express.Request, res: express.Response) => {
        User.collection.findOne({ 'username': req.body.to }, (err, user) => {
            if ((err || user == null) && req.body.to != 'Agencija') {
                console.log(err);
                res.status(400).json({ 'message': 'user not found' });
            }
            else {
                if (req.body.thread == null) {
                    MsgThread.collection.insertOne(
                        {
                            'subject': req.body.subject,
                            'realestate': req.body.realestate,
                            'user1': req.body.to,
                            'user2': req.body.from,
                            'active': true,
                            'read1': false,
                            'read2': true,
                            'timestamp': req.body.timestamp
                        }, (err, thr) => {
                            if (err) console.log(err);
                            else {
                                let thread: string = thr.insertedId.toHexString();

                                Message.collection.insertOne(
                                    {
                                        'thread': thread,
                                        'to': req.body.to,
                                        'from': req.body.from,
                                        'timestamp': req.body.timestamp,
                                        'content': req.body.content
                                    }, (err, msg) => {
                                        if (err) console.log(err);
                                        else {
                                            res.status(200).json({ 'message': 'message sent' });
                                        }
                                    });
                            }
                        });
                } else {
                    var mongo = require('mongodb');
                    var o_id = new mongo.ObjectID(req.body.thread);

                    MsgThread.collection.updateOne({ "_id": o_id, "user1": req.body.to },
                        {
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
                    MsgThread.collection.updateOne({ "_id": o_id, "user2": req.body.to },
                        {
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
                    Message.collection.insertOne(
                        {
                            'thread': req.body.thread,
                            'to': req.body.to,
                            'from': req.body.from,
                            'timestamp': req.body.timestamp,
                            'content': req.body.content
                        }, (err, msg) => {
                            if (err) console.log(err);
                            else {
                                res.status(200).json({ 'message': 'message sent' });
                            }
                        });
                }
            }
        });
    }

    readMessage = (req: express.Request, res: express.Response) => {
        var mongo = require('mongodb');
        var o_id = new mongo.ObjectID(req.body.thread);

        if (req.body.user1) {
            MsgThread.collection.updateOne({ "_id": o_id },
                {
                    $set: {
                        'read1': true
                    }
                }, (err, data) => {
                    if (err) console.log(err);
                    else res.status(200).json({ 'message': 'user1 read message' });
                });
        } else {
            MsgThread.collection.updateOne({ "_id": o_id },
                {
                    $set: {
                        'read2': true
                    }
                }, (err, data) => {
                    if (err) console.log(err);
                    else res.status(200).json({ 'message': 'user2 read message' });
                });
        }
    }

    archiveThread = (req: express.Request, res: express.Response) => {
        var mongo = require('mongodb');
        var o_id = new mongo.ObjectID(req.body.thread);
        MsgThread.collection.updateOne({ "_id": o_id },
            {
                $set: {
                    'active': req.body.active
                }
            }, (err, data) => {
                if (err) console.log(err);
                else res.status(200).json({ 'message': 'user1 read message' });
            });

    }
}