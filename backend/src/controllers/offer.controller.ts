import express from 'express';
import Contract from '../models/contract';
import Offer from '../models/offer'

export class OfferController {

    getAllOffers = (req: express.Request, res: express.Response) => {
        Offer.find({}, (err, offers) => {
            if (err) console.log(err);
            else res.json(offers);
        })
    }

    makeOffer = (req: express.Request, res: express.Response) => {
        Offer.collection.insertOne({
            'realestate': req.body.realestate,
            'owner': req.body.owner,
            'client': req.body.client,
            'amount': req.body.amount,
            'accepted': null,
            'valid': false
        }, (err, data) => {
            if (err) {
                res.status(400).json({ 'message': 'offer not made' });
                console.log(err);
            } else {
                res.status(200).json({ 'message': 'offer made' });
            }
        });
    }

    acceptOffer = (req: express.Request, res: express.Response) => {
        var mongo = require('mongodb');
        var o_id = new mongo.ObjectID(req.body.offer_id);


        Offer.collection.updateMany({ 'realestate': req.body.realestate }, { $set: { 'accepted': false } }, (err, offer) => {
            if (err) console.log(err);
            else {
                Offer.collection.updateOne({ '_id': o_id }, { $set: { 'accepted': true } }, (err, data) => {
                    if (err) console.log(err);
                    else res.status(200).json({ 'message': 'offer accepted' });
                })
            }
        })
    }

    declineOffer = (req: express.Request, res: express.Response) => {
        var mongo = require('mongodb');
        var o_id = new mongo.ObjectID(req.body.offer_id);

        Offer.collection.updateOne({ '_id': o_id }, { $set: { 'accepted': false } }, (err, offer) => {
            if (err) {
                res.status(400).json({ 'message': 'offer not declined' });
                console.log(err);
            } else {
                res.status(200).json({ 'message': 'offer declined' });
            }
        })
    }

    validateOffer = (req: express.Request, res: express.Response) => {
        var mongo = require('mongodb');
        var o_id = new mongo.ObjectID(req.body.offer_id);

        Offer.collection.updateOne({ '_id': o_id }, { $set: { 'valid': true } }, (err, offer) => {
            if (err) {
                res.status(400).json({ 'message': 'offer not validated' });
                console.log(err);
            } else {
                res.status(200).json({ 'message': 'offer validated' });
            }
        })
    }

    deleteOffer = (req: express.Request, res: express.Response) => {
        var mongo = require('mongodb');
        var o_id = new mongo.ObjectID(req.body.offer_id);

        Offer.collection.deleteOne({ '_id': o_id }, (err, offer) => {
            if (err) {
                res.status(400).json({ 'message': 'offer not deleted' });
                console.log(err);
            } else {
                Offer.collection.updateMany({ 'realestate': req.body.realestate },
                    {
                        $set: { 'accepted': null }
                    }, (err, data) => {
                        if (err) console.log(err);
                        else res.status(200).json({ 'message': 'offer deleted' });
                    })
            }
        })
    }

    getAllContracts = (req: express.Request, res: express.Response) => {
        Contract.find({}, (err, contracts) => {
            if (err) console.log(err);
            else res.json(contracts);
        })
    }

}