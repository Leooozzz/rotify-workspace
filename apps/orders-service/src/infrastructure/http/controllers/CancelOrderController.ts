import { Request, Response } from "express";
import { AppError } from "../../../shared/errors/AppError";
import { CancelOrderUseCase } from "../../../application/use-cases/CancelOrderUseCase";

export class CancelOrderController {
    constructor(private cancelOrderUseCase: CancelOrderUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { orderId } = request.params;
            const companyId = request.headers['x-company-id'] as string;

            if (!companyId) {
                throw new AppError("Unauthorized company id is required", 403);
            }

            if (!orderId) {
                throw new AppError("Unauthorized orderId is required", 403);
            }

            const parsedOrderId = String(orderId);

            await this.cancelOrderUseCase.execute(parsedOrderId, companyId);

            return response.status(200).json({
                error: null,
                data: "Pedido cancelado com sucesso. O sistema foi notificado.",
            });
        } catch (error) {
            if (error instanceof AppError) {
                return response.status(error.statusCode).json({
                    error: error.name,
                    message: error.message,
                });
            }

            console.error(error);
            return response.status(500).json({
                error: "InternalServerError",
                message: "Internal server error",
            });
        }
    }
}
