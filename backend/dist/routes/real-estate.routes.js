"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const real_estate_controller_1 = require("../controllers/real-estate.controller");
const realEstateRouter = express_1.default.Router();
realEstateRouter.route('/getAllRealEstate').get((req, res) => new real_estate_controller_1.RealEstateController().getAllRealEstate(req, res));
realEstateRouter.route('/addRealEstate').post((req, res) => new real_estate_controller_1.RealEstateController().addRealEstate(req, res));
realEstateRouter.route('/updateRealEstate').post((req, res) => new real_estate_controller_1.RealEstateController().updateRealEstate(req, res));
realEstateRouter.route('/deleteRealEstate').post((req, res) => new real_estate_controller_1.RealEstateController().deleteRealEstate(req, res));
realEstateRouter.route('/approveRealEstate').post((req, res) => new real_estate_controller_1.RealEstateController().approveRealEstate(req, res));
realEstateRouter.route('/promoteRealEstate').post((req, res) => new real_estate_controller_1.RealEstateController().promoteRealEstate(req, res));
realEstateRouter.route('/removeFromPromoted').post((req, res) => new real_estate_controller_1.RealEstateController().removeFromPromoted(req, res));
realEstateRouter.route('/sellRealEstate').post((req, res) => new real_estate_controller_1.RealEstateController().sellRealEstate(req, res));
realEstateRouter.route('/getRents').get((req, res) => new real_estate_controller_1.RealEstateController().getRents(req, res));
realEstateRouter.route('/reserve').post((req, res) => new real_estate_controller_1.RealEstateController().reserve(req, res));
exports.default = realEstateRouter;
//# sourceMappingURL=real-estate.routes.js.map