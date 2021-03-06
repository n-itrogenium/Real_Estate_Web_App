import express from 'express'
import { RealEstateController } from '../controllers/real-estate.controller';

const realEstateRouter = express.Router();

realEstateRouter.route('/getAllRealEstate').get(
    (req, res) => new RealEstateController().getAllRealEstate(req, res)
)

realEstateRouter.route('/addRealEstate').post(
    (req, res) => new RealEstateController().addRealEstate(req, res)
);

realEstateRouter.route('/updateRealEstate').post(
    (req, res) => new RealEstateController().updateRealEstate(req, res)
);

realEstateRouter.route('/deleteRealEstate').post(
    (req, res) => new RealEstateController().deleteRealEstate(req, res)
);

realEstateRouter.route('/approveRealEstate').post(
    (req, res) => new RealEstateController().approveRealEstate(req, res)
);

realEstateRouter.route('/promoteRealEstate').post(
    (req, res) => new RealEstateController().promoteRealEstate(req, res)
);

realEstateRouter.route('/removeFromPromoted').post(
    (req, res) => new RealEstateController().removeFromPromoted(req, res)
);

realEstateRouter.route('/sellRealEstate').post(
    (req, res) => new RealEstateController().sellRealEstate(req, res)
);

realEstateRouter.route('/getRents').get(
    (req, res) => new RealEstateController().getRents(req, res)
)

realEstateRouter.route('/reserve').post(
    (req, res) => new RealEstateController().reserve(req, res)
)

realEstateRouter.route('/validateRent').post(
    (req, res) => new RealEstateController().validateRent(req, res)
)

realEstateRouter.route('/deleteRent').post(
    (req, res) => new RealEstateController().deleteRent(req, res)
)


export default realEstateRouter;