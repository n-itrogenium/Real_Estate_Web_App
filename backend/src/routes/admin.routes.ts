import express from 'express';
import { AdminController } from '../controllers/admin.controller';
const adminRouter = express.Router();


adminRouter.route('/grantAccess').post(
    (req, res) => new AdminController().grantAccess(req, res)
);

adminRouter.route('/deleteUser').post(
    (req, res) => new AdminController().deleteUser(req, res)
);

adminRouter.route('/setSalePercentage').post(
    (req, res) => new AdminController().setSalePercentage(req, res)
);

adminRouter.route('/setRentPercentage').post(
    (req, res) => new AdminController().setRentPercentage(req, res)
);

adminRouter.route('/getPercentage').get(
    (req, res) => new AdminController().getPercentage(req, res)
);


export default adminRouter;