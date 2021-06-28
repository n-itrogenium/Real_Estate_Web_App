"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfferController = void 0;
const real_estate_1 = __importDefault(require("../models/real-estate"));
const contract_1 = __importDefault(require("../models/contract"));
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
            var r_id = new mongo.ObjectID(req.body.realestate);
            offer_1.default.collection.updateMany({ 'realestate': req.body.realestate }, { $set: { 'accepted': false } }, (err, offer) => {
                if (err)
                    console.log(err);
                else {
                    real_estate_1.default.collection.updateOne({ '_id': r_id }, { $set: { 'sold': true } }, (err, data) => {
                        if (err)
                            console.log(err);
                    });
                    offer_1.default.collection.updateOne({ '_id': o_id }, { $set: { 'accepted': true } }, (err, data) => {
                        if (err)
                            console.log(err);
                        else
                            res.status(200).json({ 'message': 'offer accepted' });
                    });
                }
            });
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
                    o_id = new mongo.ObjectID(req.body.realestate);
                    real_estate_1.default.collection.updateOne({ '_id': o_id }, { $set: { 'sold': false } }, (err, data) => {
                        if (err)
                            console.log(err);
                    });
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
        this.getAllContracts = (req, res) => {
            contract_1.default.find({}, (err, contracts) => {
                if (err)
                    console.log(err);
                else
                    res.json(contracts);
            });
        };
    }
}
exports.OfferController = OfferController;
//# sourceMappingURL=offer.controller.js.map