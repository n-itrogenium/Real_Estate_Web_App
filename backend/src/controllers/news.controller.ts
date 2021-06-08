import express from 'express'
import News from '../models/news'

export class NewsController {
    getAllNews = (req: express.Request, res: express.Response) => {
        News.find({}, (err, news) => {
            if (err) console.log(err);
            else res.json(news);
        })
    }

    addComment = (req: express.Request, res: express.Response) => {
        let id = req.body.id;
        let text = req.body.text;

        News.findOne({'id': id}, (err, news) => {
            if (err) {
                console.log(err);
            } else {
                if (news) {
                    let comment = {
                        text: text
                    }
                    News.collection.updateOne({'id': id}, {$push: {'comments': comment}});
                    res.json({'message': 'comment added'});
                }
                else {
                    res.json({'message': 'news not found'});
                }
            }
        })
    }
}