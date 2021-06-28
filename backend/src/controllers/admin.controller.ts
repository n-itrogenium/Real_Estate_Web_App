import express from 'express';
import User from '../models/user'
import Percentage from '../models/percentage'
import Block from '../models/block';
import Contract from '../models/contract';
import Message from '../models/message';
import MsgThread from '../models/msgthread';
import RealEstate from '../models/real-estate';
import Rent from '../models/rent';

export class AdminController {
    grantAccess = (req: express.Request, res: express.Response) => {
        let username = req.body.username;

        User.findOne({ 'username': username },
            (err, user) => {
                if (err) {
                    console.log(err);
                } else {
                    if (user) {
                        User.collection.updateOne({ 'username': username }, { $set: { 'active': true } });
                        res.status(200).json({ 'message': 'user activated' });
                    }
                    else {
                        res.status(400).json({ 'message': 'user not found' });
                    }
                }
            })
    }

    deleteUser = (req: express.Request, res: express.Response) => {
        let username = req.body.username;

        User.collection.deleteOne({ 'username': username }, (err, data) => {
            if (err) console.log(err);
            else {
                Block.collection.deleteMany({ 'blocker': username });
                Block.collection.deleteMany({ 'blocked': username });
                Contract.collection.deleteMany({ 'owner': username });
                Contract.collection.deleteMany({ 'client': username });
                Message.collection.deleteMany({ 'to': username });
                Message.collection.deleteMany({ 'from': username });
                MsgThread.collection.deleteMany({ 'user1': username });
                MsgThread.collection.deleteMany({ 'user2': username });
                RealEstate.collection.deleteMany({ 'owner': username });
                Rent.collection.deleteMany({ 'client': username });
                res.status(200).json({ 'message': 'user deleted' });
            }
        });

    }


    setSalePercentage = (req: express.Request, res: express.Response) => {
        Percentage.collection.findOne({}, (err, data) => {
            if (err) console.log(err);
            else
                if (data)
                    Percentage.collection.updateOne({}, { $set: { 'sale': req.body.percentage } }, (err, data) => {
                        if (err) console.log(err);
                        else res.status(200).json({ 'message': 'sale percentage set' });
                    });
                else
                    Percentage.collection.insertOne({ 'sale': req.body.percentage, 'rent': null }, (err, data) => {
                        if (err) console.log(err);
                        else res.status(200).json({ 'message': 'sale percentage set' });
                    });
        })
    }

    setRentPercentage = (req: express.Request, res: express.Response) => {
        Percentage.collection.findOne({}, (err, data) => {
            if (err) console.log(err);
            else
                if (data)
                    Percentage.collection.updateOne({}, { $set: { 'rent': req.body.percentage } }, (err, data) => {
                        if (err) console.log(err);
                        else res.status(200).json({ 'message': 'rent percentage set' });
                    });
                else
                    Percentage.collection.insertOne({ 'sale': null, 'rent': req.body.percentage }, (err, data) => {
                        if (err) console.log(err);
                        else res.status(200).json({ 'message': 'rent percentage set' });
                    });
        })
    }

    getPercentage = (req: express.Request, res: express.Response) => {
        Percentage.collection.findOne({}, (err, percentage) => {
            if (err) console.log(err);
            else res.json(percentage);
        })
    }

}