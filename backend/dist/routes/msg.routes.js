"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const msg_controller_1 = require("../controllers/msg.controller");
const msgRouter = express_1.default.Router();
msgRouter.route('/getAllThreads').post((req, res) => new msg_controller_1.MsgController().getAllThreads(req, res));
msgRouter.route('/getAllAgentThreads').get((req, res) => new msg_controller_1.MsgController().getAllAgentThreads(req, res));
msgRouter.route('/getAllMessages').post((req, res) => new msg_controller_1.MsgController().getAllMessages(req, res));
msgRouter.route('/sendMessage').post((req, res) => new msg_controller_1.MsgController().sendMessage(req, res));
msgRouter.route('/readMessage').post((req, res) => new msg_controller_1.MsgController().readMessage(req, res));
msgRouter.route('/archiveThread').post((req, res) => new msg_controller_1.MsgController().archiveThread(req, res));
exports.default = msgRouter;
//# sourceMappingURL=msg.routes.js.map