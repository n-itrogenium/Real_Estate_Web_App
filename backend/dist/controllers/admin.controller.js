"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const user_1 = __importDefault(require("../models/user"));
class AdminController {
    constructor() {
        this.grantAccess = (req, res) => {
            let username = req.body.username;
            user_1.default.findOne({ 'username': username }, (err, user) => {
                if (err) {
                    console.log(err);
                }
                else {
                    if (user) {
                        user_1.default.collection.updateOne({ 'username': username }, { $set: { 'active': true } });
                        res.status(200).json({ 'message': 'user activated' });
                    }
                    else {
                        res.status(400).json({ 'message': 'user not found' });
                    }
                }
            });
        };
        this.deleteUser = (req, res) => {
            let username = req.body.username;
            user_1.default.findOne({ 'username': username }, (err, user) => {
                if (err) {
                    console.log(err);
                }
                else {
                    if (user) {
                        user_1.default.collection.deleteOne({ 'username': username });
                        res.status(200).json({ 'message': 'user deleted' });
                    }
                    else {
                        res.status(400).json({ 'message': 'user not found' });
                    }
                }
            });
        };
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
}
exports.AdminController = AdminController;
//# sourceMappingURL=admin.controller.js.map