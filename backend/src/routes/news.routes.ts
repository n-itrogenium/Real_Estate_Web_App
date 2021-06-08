import express from 'express'
import { NewsController } from '../controllers/news.controller';

const newsRouter = express.Router();

newsRouter.route('/getAllNews').get(
    (req, res) => new NewsController().getAllNews(req, res)
)

newsRouter.route('/addComment').post(
    (req, res) => new NewsController().addComment(req, res)
)

export default newsRouter;