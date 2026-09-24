import { Request, Response } from "express";
import { CreateOrderUseCase } from "../../../application/use-cases/CreateOrderUseCase";
import { AppError } from "../../../shared/errors/AppError";

export class CreateOrdersController { 
    constructor(private createOrderUseCase: CreateOrderUseCase) {}

    async handle(req: Request, res: Response): Promise<Response> {
        try {
            const companyId = req.headers['x-company-id'] as string;
            const createdByUserId = req.headers['x-user-id'] as string;

            if (!companyId || !createdByUserId) {
                return res.status(401).json({
                    error: "UnauthorizedError",
                    message: "Headers x-company-id e x-user-id são obrigatórios.",
                });
            }

            const {
                recipientName,
                recipientPhone,
                pickupAddress,
                deliveryAddress,
            } = req.body;

            const order = await this.createOrderUseCase.execute({
                companyId,
                createdByUserId,
                recipientName,
                recipientPhone,
                pickupAddress,
                deliveryAddress,
            });

            return res.status(201).json(order);
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