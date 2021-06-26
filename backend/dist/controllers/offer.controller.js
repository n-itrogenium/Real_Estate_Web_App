"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfferController = void 0;
const offer_1 = __importDefault(require("../models/offer"));
class OfferController {
    constructor() {
        this.getAllOffers = (req, res) => {
            offer_1.default.find({}, (err, offers) => {
                if (err)
                    console.log(err);
                else
                    res.json(offers);
            });
        };
        /*findOffers = (req: express.Request, res: express.Response) => {
            if (req.body)
            Offer.find({}, (err, offers) => {
                if (err) console.log(err);
                else res.json(offers);
            })
        } */
        this.makeOffer = (req, res) => {
            offer_1.default.collection.insertOne({
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
                }
                else {
                    res.status(200).json({ 'message': 'offer made' });
                }
            });
        };
        this.acceptOffer = (req, res) => {
            var mongo = require('mongodb');
            var o_id = new mongo.ObjectID(req.body.offer_id);
            offer_1.default.collection.updateMany({ 'realestate': req.body.realestate }, { $set: { 'accepted': false } }, (err, offer) => {
                if (err)
                    console.log(err);
                else {
                    offer_1.default.collection.updateOne({ '_id': o_id }, { $set: { 'accepted': true } }, (err, data) => {
                        if (err)
                            console.log(err);
                        else
                            res.status(200).json({ 'message': 'offer accepted' });
                    });
                }
            });
            /*
            Offer.collection.updateOne({ '_id': o_id }, { $set: { 'accepted': true } }, (err, offer) => {
                if (err) {
                    res.status(400).json({ 'message': 'offer not accepted' });
                    console.log(err);
                } else {
                    Offer.collection.updateMany({
                        $and: [
                                { 'realestate': req.body.realestate },
                                { '_id': { $ne: req.body.offer_id } }
                            ]
                    }, {
                        $set: { 'accepted': false }
                    }, (err, offer) => {
                        if (err) {
                            res.status(400).json({ 'message': 'offer accepted, offers not declined' });
                            console.log(err);
                        } else {
                            res.status(200).json({ 'message': 'offer accepted, offers declined' });
                        }
                    });
                }
            }) */
        };
        this.declineOffer = (req, res) => {
            var mongo = require('mongodb');
            var o_id = new mongo.ObjectID(req.body.offer_id);
            offer_1.default.collection.updateOne({ '_id': o_id }, { $set: { 'accepted': false } }, (err, offer) => {
                if (err) {
                    res.status(400).json({ 'message': 'offer not declined' });
                    console.log(err);
                }
                else {
                    res.status(200).json({ 'message': 'offer declined' });
                }
            });
        };
        this.validateOffer = (req, res) => {
            var mongo = require('mongodb');
            var o_id = new mongo.ObjectID(req.body.offer_id);
            offer_1.default.collection.updateOne({ '_id': o_id }, { $set: { 'valid': true } }, (err, offer) => {
                if (err) {
                    res.status(400).json({ 'message': 'offer not validated' });
                    console.log(err);
                }
                else {
                    res.status(200).json({ 'message': 'offer validated' });
                }
            });
        };
        this.deleteOffer = (req, res) => {
            var mongo = require('mongodb');
            var o_id = new mongo.ObjectID(req.body.offer_id);
            offer_1.default.collection.deleteOne({ '_id': o_id }, (err, offer) => {
                if (err) {
                    res.status(400).json({ 'message': 'offer not deleted' });
                    console.log(err);
                }
                else {
                    offer_1.default.collection.updateMany({ 'realestate': req.body.realestate }, {
                        $set: { 'accepted': null }
                    }, (err, data) => {
                        if (err)
                            console.log(err);
                        else
                            res.status(200).json({ 'message': 'offer deleted' });
                    });
                }
            });
        };
    }
}
exports.OfferController = OfferController;
//# sourceMappingURL=offer.controller.js.map