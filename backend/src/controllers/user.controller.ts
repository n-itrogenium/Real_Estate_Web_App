import express from 'express';
import User from '../models/user';
import Block from '../models/block';

export class UserController{
    login = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let password = req.body.password;

        User.findOne({'username':username, 'password': password},
            (err, user)=>{
                if(err) console.log(err);
                else res.json(user);
            })
    }

    register = (req: express.Request, res: express.Response) => {
        let user = new User(req.body);
        //insertovanje objekata u mongo bazu:
        user.save().then((user)=>{
            res.status(200).json({'message': 'user added'});
        }).catch((err)=>{
            res.status(400).json({'message': err});
        })
    }

    getAllUsers = (req: express.Request, res: express.Response) => {
        User.find({}, (err, user) => {
            if (err) console.log(err);
            else res.json(user);
        })
    }

    updateUser = (req: express.Request, res: express.Response) => {
        let name = req.body.name;
        let surname = req.body.surname;
        let username = req.body.username;
        let avatar = req.body.avatar;
        let mail = req.body.mail;
        let city = req.body.city;
        let country = req.body.country;
        let type = req.body.type;

        User.findOne({'username': username},
            (err, user) => {
                if (err) {
                    console.log(err);
                } else {
                    User.collection.updateOne({'username': username},
                        {$set: {
                            'name': name,
                            'surname': surname,
                            'avatar': avatar,
                            'mail': mail,
                            'city': city,
                            'country': country,
                            'type': type
                        }
                    });
                    res.status(200).json({'message': 'user updated'});
                }
            })
    }


    changePassword = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let password = req.body.password;

        User.findOne({'username': username},
        (err, user) => {
            if (err) {
                console.log(err);
            } else {
                if (user) {
                    User.collection.updateOne({'username': username}, {$set: {'password': password}});
                    res.status(200).json({'message': 'password changed'});
                }
                else {
                    res.status(400).json({'message': 'password not changed'});
                }
            }
        })
    }

    blockUser = (req: express.Request, res: express.Response) => {
        Block.collection.insertOne(
            {
                'blocker': req.body.blocker,
                'blocked': req.body.blocked
            }, (err, data) => {
                if (err) console.log(err);
                else {
                    res.status(200).json({ 'message': 'user blocked' });
                }
            });

    }

    unblockUser = (req: express.Request, res: express.Response) => {
        Block.collection.deleteOne(
            {
                'blocker': req.body.blocker,
                'blocked': req.body.blocked
            }, (err, data) => {
                if (err) console.log(err);
                else {
                    res.status(200).json({ 'message': 'user unblocked' });
                }
            });

    }

    getAllBlocks = (req: express.Request, res: express.Response) => {
        Block.find({}, (err, block) => {
            if (err) console.log(err);
            else res.json(block);
        })
    }
    
}