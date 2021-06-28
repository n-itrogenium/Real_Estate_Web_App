"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RealEstateController = void 0;
const rent_1 = __importDefault(require("../models/rent"));
const contract_1 = __importDefault(require("../models/contract"));
const real_estate_1 = __importDefault(require("../models/real-estate"));
const msgthread_1 = __importDefault(require("../models/msgthread"));
const offer_1 = __importDefault(require("../models/offer"));
class RealEstateController {
    constructor() {
        this.getAllRealEstate = (req, res) => {
            real_estate_1.default.find({}, (err, realestate) => {
                if (err)
                    console.log(err);
                else
                    res.json(realestate);
            });
        };
        this.addRealEstate = (req, res) => {
            real_estate_1.default.collection.insertOne(req.body, (err, re) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.status(200).json({ 'message': 'real estate added' });
                }
            });
        };
        this.updateRealEstate = (req, res) => {
            var mongo = require('mongodb');
            var o_id = new mongo.ObjectID(req.body._id);
            real_estate_1.default.collection.updateOne({ "_id": o_id }, {
                $set: {
                    'name': req.body.name,
                    'address': req.body.address,
                    'city': req.body.city,
                    'municipality': req.body.municipality,
                    'type': req.body.type,
                    'height': req.body.height,
                    'floor': req.body.floor,
                    'squaremeters': req.body.squaremeters,
                    'rooms': req.body.rooms,
                    'furnished': req.body.furnished,
                    'gallery': req.body.gallery,
                    'sale': req.body.sale,
                    'price': req.body.price
                }
            }, (err, data) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ 'message': 'real estate not updated' });
                }
                if (data)
                    res.status(200).json({ 'message': 'real estate updated' });
            });
        };
        this.deleteRealEstate = (req, res) => {
            var mongo = require('mongodb');
            var o_id = new mongo.ObjectID(req.body._id);
            real_estate_1.default.collection.deleteOne({ "_id": o_id }, (err, data) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ 'message': 'real estate not deleted' });
                }
                if (data) {
                    contract_1.default.collection.deleteMany({ 'realestate': req.body._id });
                    msgthread_1.default.collection.deleteMany({ 'realestate': req.body._id });
                    offer_1.default.collection.deleteMany({ 'realestate': req.body._id });
                    rent_1.default.collection.deleteMany({ 'realestate': req.body._id });
                    res.status(200).json({ 'message': 'real estate deleted' });
                }
            });
        };
        this.approveRealEstate = (req, res) => {
            var mongo = require('mongodb');
            var o_id = new mongo.ObjectID(req.body._id);
            real_estate_1.default.collection.updateOne({ "_id": o_id }, { $set: { 'approved': true } }, (err, data) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ 'message': 'real estate not approved' });
                }
                if (data)
                    res.status(200).json({ 'message': 'real estate approved' });
            });
        };
        this.promoteRealEstate = (req, res) => {
            var mongo = require('mongodb');
            var o_id = new mongo.ObjectID(req.body._id);
            real_estate_1.default.collection.updateOne({ "_id": o_id }, { $set: { 'promo': true } }, (err, data) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ 'message': 'real estate not promoted' });
                }
                if (data)
                    res.status(200).json({ 'message': 'real estate promoted' });
            });
        };
        this.removeFromPromoted = (req, res) => {
            var mongo = require('mongodb');
            var o_id = new mongo.ObjectID(req.body._id);
            real_estate_1.default.collection.updateOne({ "_id": o_id }, { $set: { 'promo': false } }, (err, data) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ 'message': 'real estate not removed from promoted' });
                }
                if (data)
                    res.status(200).json({ 'message': 'real estate removed from promoted' });
            });
        };
        this.sellRealEstate = (req, res) => {
            contract_1.default.collection.insertOne({
                'realestate': req.body.realestate,
                'owner': req.body.owner,
                'client': req.body.client,
                'price': req.body.price
            }, (err, data) => {
                if (err) {
                    console.log(err);
                }
                else {
                    if (req.body.sale == 1) {
                        var mongo = require('mongodb');
                        var o_id = new mongo.ObjectID(req.body.realestate);
                        real_estate_1.default.collection.updateOne({ "_id": o_id }, { $set: { 'sold': true } }, (err, data) => {
                            if (err)
                                console.log(err);
                        });
                    }
                    res.status(200).json({ 'message': 'contract added' });
                }
            });
        };
        this.getRents = (req, res) => {
            rent_1.default.find({}, (err, rents) => {
                if (err)
                    console.log(err);
                else
                    res.json(rents);
            });
        };
        this.reserve = (req, res) => {
            rent_1.default.collection.insertOne(req.body, (err, data) => {
                if (err)
                    console.log(err);
                else
                    res.status(200).json({ 'message': 'reserved' });
            });
        };
        this.validateRent = (req, res) => {
            var mongo = require('mongodb');
            var o_id = new mongo.ObjectID(req.body.rent_id);
            rent_1.default.collection.updateOne({ _id: o_id }, { $set: { valid: true } }, (err, data) => {
                if (err)
                    console.log(err);
                else {
                    contract_1.default.collection.insertOne({
                        'realestate': req.body.realestate,
                        'owner': req.body.owner,
                        'client': req.body.client,
                        'price': req.body.price
                    }, (err, data) => {
                        if (err)
                            console.log(err);
                        else
                            res.status(200).json({ 'message': 'rent validated' });
                    });
                }
            });
        };
        this.deleteRent = (req, res) => {
            var mongo = require('mongodb');
            var o_id = new mongo.ObjectID(req.body.rent_id);
            rent_1.default.collection.deleteOne({ _id: o_id }, (err, data) => {
                if (err)
                    console.log(err);
                else
                    res.status(200).json({ 'message': 'rent deleted' });
            });
        };
    }
}
exports.RealEstateController = RealEstateController;
//# sourceMappingURL=real-estate.controller.js.map