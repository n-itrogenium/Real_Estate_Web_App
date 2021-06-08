"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RealEstateController = void 0;
const real_estate_1 = __importDefault(require("../models/real-estate"));
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
            /*
            let real_estate = new RealEstate(req.body);
            //insertovanje objekata u mongo bazu:
            real_estate.save().then((real_estate)=>{
                res.status(200).json({'message': 'real estate added'});
            }).catch((err)=>{
                res.status(400).json({'message': err});
            })*/
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
                if (data)
                    res.status(200).json({ 'message': 'real estate deleted' });
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
    }
}
exports.RealEstateController = RealEstateController;
//# sourceMappingURL=real-estate.controller.js.map