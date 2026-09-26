import { Request, Response } from "express";
import { AppError } from "../../../shared/errors/AppError";
import { ListOrderByCompanyIdUseCase } from "../../../application/use-cases/ListOrderByCompanyIdUseCase";

export class ListOrdersByCompanyController {
    constructor(private listOrderByCompanyIdUseCase: ListOrderByCompanyIdUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const companyId = request.headers['x-company-id'] as string;

            if (!companyId) {
                throw new AppError("companyId is required", 401);
            }

            const orders = await this.listOrderByCompanyIdUseCase.execute(companyId);

            return response.status(200).json(orders);
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
