"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsController = void 0;
const news_1 = __importDefault(require("../models/news"));
class NewsController {
    constructor() {
        this.getAllNews = (req, res) => {
            news_1.default.find({}, (err, news) => {
                if (err)
                    console.log(err);
                else
                    res.json(news);
            });
        };
        this.addComment = (req, res) => {
            let id = req.body.id;
            let text = req.body.text;
            news_1.default.findOne({ 'id': id }, (err, news) => {
                if (err) {
                    console.log(err);
                }
                else {
                    if (news) {
                        let comment = {
                            text: text
                        };
                        news_1.default.collection.updateOne({ 'id': id }, { $push: { 'comments': comment } });
                        res.json({ 'message': 'comment added' });
                    }
                    else {
                        res.json({ 'message': 'news not found' });
                    }
                }
            });
        };
    }
}
exports.NewsController = NewsController;
//# sourceMappingURL=news.controller.js.map