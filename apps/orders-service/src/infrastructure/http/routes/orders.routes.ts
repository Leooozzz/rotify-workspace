import { Router } from "express";
import { makeCreateOrdersController } from "../../../main/factories/makeCreateOrdersController.factory";
import { makeDispatchOrdersController } from "../../../main/factories/makeDispatchOrdersController.factory";
import { makeOrderByTrackingCodeController } from "../../../main/factories/makeOrderByTrackingCodeController.factory";
import { makeListOrdersByCompanyController } from "../../../main/factories/makeListOrdersByCompanyController.factory";
import { makeCancelOrderController } from "../../../main/factories/makeCancelOrderController.factory";

const ordersRouter = Router();

const createOrdersController = makeCreateOrdersController();
const dispatchOrdersController = makeDispatchOrdersController();
const orderByTrackingCodeController = makeOrderByTrackingCodeController();
const listOrdersByCompanyController = makeListOrdersByCompanyController();
const cancelOrderController = makeCancelOrderController();

ordersRouter.post("/", createOrdersController.handle);
ordersRouter.post("/:orderId/dispatch", dispatchOrdersController.handle);
ordersRouter.get("/tracking/:trackingCode", orderByTrackingCodeController.handle);
ordersRouter.get("/list-order-company", listOrdersByCompanyController.handle);
ordersRouter.patch("/:orderId/cancel", cancelOrderController.handle);
export { ordersRouter };