import express from 'express';
import { MsgController } from '../controllers/msg.controller';
const msgRouter = express.Router();

msgRouter.route('/getAllThreads').post(
    (req, res) => new MsgController().getAllThreads(req, res)
);

msgRouter.route('/getAllMessages').post(
    (req, res) => new MsgController().getAllMessages(req, res)
);

msgRouter.route('/sendMessage').post(
    (req, res) => new MsgController().sendMessage(req, res)
);

msgRouter.route('/readMessage').post(
    (req, res) => new MsgController().readMessage(req, res)
);

msgRouter.route('/archiveThread').post(
    (req, res) => new MsgController().archiveThread(req, res)
);

export default msgRouter;