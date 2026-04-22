import e, { Router } from "express";
import { getAllGadgets, getGadgetById } from "../controllers/gadget.controller.js";
const gadgetRouter = e.Router();

gadgetRouter.get('/all', getAllGadgets);
gadgetRouter.get('/:id', getGadgetById);

export default gadgetRouter;