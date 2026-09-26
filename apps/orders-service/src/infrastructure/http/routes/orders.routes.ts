import { Router } from "express";
import { makeCreateOrdersController } from "../../../main/factories/makeCreateOrdersController.factory";
import { makeDispatchOrdersController } from "../../../main/factories/makeDispatchOrdersController.factory";
import { makeOrderByTrackingCodeController } from "../../../main/factories/makeOrderByTrackingCodeController.factory";

const ordersRouter = Router();

const createOrdersController = makeCreateOrdersController();
const dispatchOrdersController = makeDispatchOrdersController();
const orderByTrackingCodeController = makeOrderByTrackingCodeController();

ordersRouter.post("/", createOrdersController.handle);
ordersRouter.post("/:orderId/dispatch", dispatchOrdersController.handle);
ordersRouter.get("/tracking/:trackingCode", orderByTrackingCodeController.handle);


export { ordersRouter };