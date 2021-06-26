import express from 'express'
import Rent from '../models/rent';
import Contract from '../models/contract';
import RealEstate from '../models/real-estate'

export class RealEstateController {

    getAllRealEstate = (req: express.Request, res: express.Response) => {
        RealEstate.find({}, (err, realestate) => {
            if (err) console.log(err);
            else res.json(realestate);
        })
    }

    addRealEstate = (req: express.Request, res: express.Response) => {
        RealEstate.collection.insertOne(req.body, (err, re) => {
            if (err) {
                console.log(err);
            } else {
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
    }

    updateRealEstate = (req: express.Request, res: express.Response) => {
        var mongo = require('mongodb');
        var o_id = new mongo.ObjectID(req.body._id);

        RealEstate.collection.updateOne({ "_id": o_id },
            {
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
                if (data) res.status(200).json({ 'message': 'real estate updated' });
            });

    }

    deleteRealEstate = (req: express.Request, res: express.Response) => {
        var mongo = require('mongodb');
        var o_id = new mongo.ObjectID(req.body._id);

        RealEstate.collection.deleteOne({ "_id": o_id }, (err, data) => {
            if (err) {
                console.log(err);
                res.status(400).json({ 'message': 'real estate not deleted' });
            }
            if (data)
                res.status(200).json({ 'message': 'real estate deleted' });
        });
    }

    approveRealEstate = (req: express.Request, res: express.Response) => {
        var mongo = require('mongodb');
        var o_id = new mongo.ObjectID(req.body._id);

        RealEstate.collection.updateOne({ "_id": o_id }, { $set: { 'approved': true } }, (err, data) => {
            if (err) {
                console.log(err);
                res.status(400).json({ 'message': 'real estate not approved' });
            }
            if (data)
                res.status(200).json({ 'message': 'real estate approved' });
        });
    }

    promoteRealEstate = (req: express.Request, res: express.Response) => {
        var mongo = require('mongodb');
        var o_id = new mongo.ObjectID(req.body._id);

        RealEstate.collection.updateOne({ "_id": o_id }, { $set: { 'promo': true } }, (err, data) => {
            if (err) {
                console.log(err);
                res.status(400).json({ 'message': 'real estate not promoted' });
            }
            if (data)
                res.status(200).json({ 'message': 'real estate promoted' });
        });
    }

    removeFromPromoted = (req: express.Request, res: express.Response) => {
        var mongo = require('mongodb');
        var o_id = new mongo.ObjectID(req.body._id);

        RealEstate.collection.updateOne({ "_id": o_id }, { $set: { 'promo': false } }, (err, data) => {
            if (err) {
                console.log(err);
                res.status(400).json({ 'message': 'real estate not removed from promoted' });
            }
            if (data)
                res.status(200).json({ 'message': 'real estate removed from promoted' });
        });
    }

    sellRealEstate = (req: express.Request, res: express.Response) => {
        Contract.collection.insertOne(req.body, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                if (req.body.sale == 1) {
                    var mongo = require('mongodb');
                    var o_id = new mongo.ObjectID(req.body.realestate);
                    RealEstate.collection.updateOne({ "_id": o_id }, { $set: { 'sold': true } }, (err, data) => {
                        if (err) console.log(err);
                    })
                }
                res.status(200).json({ 'message': 'contract added' });
            }
        });
    }

    getRents = (req: express.Request, res: express.Response) => {
        Rent.find({}, (err, rents) => {
            if (err) console.log(err);
            else res.json(rents);
        })
    }

    reserve = (req: express.Request, res: express.Response) => {
        Rent.collection.insertOne(req.body, (err, data) => {
            if (err) console.log(err);
            else res.status(200).json({'message': 'reserved'});
        })
    }

}