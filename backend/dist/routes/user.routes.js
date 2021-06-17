"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const userRouter = express_1.default.Router();
userRouter.route('/login').post((req, res) => new user_controller_1.UserController().login(req, res));
userRouter.route('/register').post((req, res) => new user_controller_1.UserController().register(req, res));
userRouter.route('/getAllUsers').get((req, res) => new user_controller_1.UserController().getAllUsers(req, res));
userRouter.route('/updateUser').post((req, res) => new user_controller_1.UserController().updateUser(req, res));
userRouter.route('/changePassword').post((req, res) => new user_controller_1.UserController().changePassword(req, res));
userRouter.route('/blockUser').post((req, res) => new user_controller_1.UserController().blockUser(req, res));
userRouter.route('/unblockUser').post((req, res) => new user_controller_1.UserController().unblockUser(req, res));
userRouter.route('/getAllBlocks').get((req, res) => new user_controller_1.UserController().getAllBlocks(req, res));
exports.default = userRouter;
//# sourceMappingURL=user.routes.js.map