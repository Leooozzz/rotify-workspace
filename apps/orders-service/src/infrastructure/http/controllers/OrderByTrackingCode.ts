import { Request, Response } from "express";
import { AppError } from "../../../shared/errors/AppError";
import { orderByTrackingCodeUseCase } from "../../../application/use-cases/OrderByTrackingCodeUseCase";

export class OrderByTrackingCodeController {
    constructor(private orderByTrackingCodeUseCase: orderByTrackingCodeUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { trackingCode } = request.params;

            if (!trackingCode) {
                throw new AppError("TrackingCode is required", 400);
            }

            const parsedTrackingCode = String(trackingCode);

            const ordersDetails = await this.orderByTrackingCodeUseCase.execute(parsedTrackingCode);

            return response.status(200).json(ordersDetails);
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
