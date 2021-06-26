"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const offer_controller_1 = require("../controllers/offer.controller");
const offerRouter = express_1.default.Router();
offerRouter.route('/getAllOffers').get((req, res) => new offer_controller_1.OfferController().getAllOffers(req, res));
/*offerRouter.route('/findOffers').post(
    (req, res) => new OfferController().findOffers(req, res)
); */
offerRouter.route('/makeOffer').post((req, res) => new offer_controller_1.OfferController().makeOffer(req, res));
offerRouter.route('/acceptOffer').post((req, res) => new offer_controller_1.OfferController().acceptOffer(req, res));
offerRouter.route('/declineOffer').post((req, res) => new offer_controller_1.OfferController().declineOffer(req, res));
offerRouter.route('/validateOffer').post((req, res) => new offer_controller_1.OfferController().validateOffer(req, res));
offerRouter.route('/deleteOffer').post((req, res) => new offer_controller_1.OfferController().deleteOffer(req, res));
exports.default = offerRouter;
//# sourceMappingURL=offer.routes.js.map