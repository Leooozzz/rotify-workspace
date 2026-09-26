import { IOrdersRepository } from "../../domain/repositories/IOrdersRepository";
import { AppError } from "../../shared/errors/AppError";

export class orderByTrackingCodeUseCase { 
    constructor (private ordesRepository:IOrdersRepository){}

    async execute (trackingCode:string) { 

        const order = await this.ordesRepository.findByTackingCode (trackingCode)

        if(!order) {
            throw new AppError("Order not found by tracking Code",404)
        }

        return {
            trackingCode: order.trackingCode,
            status: order.status,
            recipientName: order.recipientName,
            pickupAddress: order.pickupAddress,
            deliveryAddress: order.deliveryAddress,
            createdAt: order.createdAt,
            updatedAt: order.updatedAt,
        }
    }
}