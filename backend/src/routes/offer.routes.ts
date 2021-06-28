import express from 'express';
import { OfferController } from '../controllers/offer.controller';
const offerRouter = express.Router();

offerRouter.route('/getAllOffers').get(
    (req, res) => new OfferController().getAllOffers(req, res)
)

offerRouter.route('/makeOffer').post(
    (req, res) => new OfferController().makeOffer(req, res)
);

offerRouter.route('/acceptOffer').post(
    (req, res) => new OfferController().acceptOffer(req, res)
);

offerRouter.route('/declineOffer').post(
    (req, res) => new OfferController().declineOffer(req, res)
);

offerRouter.route('/validateOffer').post(
    (req, res) => new OfferController().validateOffer(req, res)
);

offerRouter.route('/deleteOffer').post(
    (req, res) => new OfferController().deleteOffer(req, res)
);

offerRouter.route('/getAllContracts').get(
    (req, res) => new OfferController().getAllContracts(req, res)
)


export default offerRouter;