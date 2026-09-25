import { Router } from "express";
import { makeCreateOrdersController } from "../../../main/factories/makeCreateOrdersController.factory";
import { makeDispatchOrdersController } from "../../../main/factories/makeDispatchOrdersController.factory";

const ordersRouter = Router();

const createOrdersController = makeCreateOrdersController();
const dispatchOrdersController = makeDispatchOrdersController();
ordersRouter.post("/", createOrdersController.handle);
ordersRouter.post("/:orderId/dispatch", dispatchOrdersController.handle);

export { ordersRouter };