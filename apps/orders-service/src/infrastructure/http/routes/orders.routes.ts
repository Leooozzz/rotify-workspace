import { Router } from "express";
import { makeCreateOrdersController } from "../../../main/factories/makeCreateOrdersController.factory";

const ordersRouter = Router();

const createOrdersController = makeCreateOrdersController();

ordersRouter.post("/", createOrdersController.handle);

export { ordersRouter };