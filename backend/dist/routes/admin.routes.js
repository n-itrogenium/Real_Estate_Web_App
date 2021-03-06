"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_controller_1 = require("../controllers/admin.controller");
const adminRouter = express_1.default.Router();
adminRouter.route('/grantAccess').post((req, res) => new admin_controller_1.AdminController().grantAccess(req, res));
adminRouter.route('/deleteUser').post((req, res) => new admin_controller_1.AdminController().deleteUser(req, res));
adminRouter.route('/setSalePercentage').post((req, res) => new admin_controller_1.AdminController().setSalePercentage(req, res));
adminRouter.route('/setRentPercentage').post((req, res) => new admin_controller_1.AdminController().setRentPercentage(req, res));
adminRouter.route('/getPercentage').get((req, res) => new admin_controller_1.AdminController().getPercentage(req, res));
exports.default = adminRouter;
//# sourceMappingURL=admin.routes.js.map