import express from 'express';
import { UserController } from '../controllers/user.controller';
const userRouter = express.Router();

userRouter.route('/login').post(
    (req, res) => new UserController().login(req, res)
);

userRouter.route('/register').post(
    (req, res) => new UserController().register(req, res)
);

userRouter.route('/getAllUsers').get(
    (req, res) => new UserController().getAllUsers(req, res)
)

userRouter.route('/updateUser').post(
    (req, res) => new UserController().updateUser(req, res)
)

userRouter.route('/changePassword').post(
    (req, res) => new UserController().changePassword(req, res)
)

userRouter.route('/blockUser').post(
    (req, res) => new UserController().blockUser(req, res)
)

userRouter.route('/unblockUser').post(
    (req, res) => new UserController().unblockUser(req, res)
)

userRouter.route('/getAllBlocks').get(
    (req, res) => new UserController().getAllBlocks(req, res)
)

export default userRouter;