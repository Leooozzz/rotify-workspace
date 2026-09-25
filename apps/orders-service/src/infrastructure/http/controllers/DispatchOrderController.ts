import { Request, Response } from "express";
import { AppError } from "../../../shared/errors/AppError";
import { DispatchOrderUseCase } from "../../../application/use-cases/DispatchOrderUseCase";

export class DispatchOrderController {
    constructor(private dispatchOrderUseCase: DispatchOrderUseCase) {}

    async handle(req: Request, res: Response): Promise<Response> {
        try {
            const { orderId } = req.params;
            const companyId = req.headers['x-company-id'];

            if (typeof orderId !== "string") {
                throw new AppError("Invalid order id", 400);
            }

            if (typeof companyId !== "string") {
                throw new AppError("Unauthorized", 401);
            }

            await this.dispatchOrderUseCase.exectute(orderId, companyId);

            return res
                .status(200)
                .json({ error: null, data: "Order released for delivery" });
        } catch (error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({
                    error: error.name,
                    message: error.message,
                });
            }

            console.error(error);
            return res.status(500).json({
                error: "InternalServerError",
                message: "Internal server error",
            });
        }
    }
}