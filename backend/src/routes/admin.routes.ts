import express from 'express';
import { AdminController } from '../controllers/admin.controller';
const adminRouter = express.Router();


adminRouter.route('/grantAccess').post(
    (req, res) => new AdminController().grantAccess(req, res)
);

adminRouter.route('/deleteUser').post(
    (req, res) => new AdminController().deleteUser(req, res)
);

export default adminRouter;