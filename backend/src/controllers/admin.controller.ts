import express from 'express';
import User from '../models/user'
import Percentage from '../models/percentage'

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

        User.findOne({ 'username': username },
            (err, user) => {
                if (err) {
                    console.log(err);
                } else {
                    if (user) {
                        User.collection.deleteOne({ 'username': username });
                        res.status(200).json({ 'message': 'user deleted' });
                    }
                    else {
                        res.status(400).json({ 'message': 'user not found' });
                    }
                }
            })
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



    /*
        denyAccess = (req: express.Request, res: express.Response) => {
            let user = new User(req.body); // u zahtevu već imamo te podatke, pa samo uzimamo telo req
            //insertovanje objekata u mongo bazu:
            user.save().then((user)=>{
                res.status(200).json({'message': 'user added'});
            }).catch((err)=>{
                res.status(400).json({'message': err});
            })
            //then: ako je sve ispravno, pošalji kod 200 za ispravno izvršenje i vrati poruku u json formatu da je korisnik dodat
            //catch: ako je došlo do greške, vrati koja je to greška
        }*/
}