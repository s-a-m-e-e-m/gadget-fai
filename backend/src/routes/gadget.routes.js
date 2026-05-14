import e, { Router } from "express";
import { getAffordableLaptops, getAffordableSmartphones, getGadgetById, getGadgetsByBrand, getPaginatedLaptops, getPaginatedSmartphones, getTopRatedLaptops, getTopRatedSmartphones } from "../controllers/gadget.controller.js";
import { recommend } from "../controllers/recommendation.js";
const gadgetRouter = e.Router();

gadgetRouter.get('/smartphones/paginated', getPaginatedSmartphones);
gadgetRouter.get('/laptops/paginated', getPaginatedLaptops);
gadgetRouter.get('/smartphones/affordable', getAffordableSmartphones);
gadgetRouter.get('/laptops/affordable', getAffordableLaptops);
gadgetRouter.get('/smartphones/rated', getTopRatedSmartphones);
gadgetRouter.get('/laptops/rated', getTopRatedLaptops);
gadgetRouter.get('/gadgets', getGadgetsByBrand);
gadgetRouter.get('/recommend', recommend);
gadgetRouter.get('/:id', getGadgetById);

export default gadgetRouter;