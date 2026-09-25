import { IOrdersRepository } from "../../domain/repositories/IOrdersRepository";
import { AppError } from "../../shared/errors/AppError";
import { IMessageQueueProvider } from "../providers/IMessageQueueProvider";

export class DispatchOrderUseCase { 
    constructor (
        private ordersRepostory:IOrdersRepository,
        private messageQueue: IMessageQueueProvider
    ){}

    async exectute (orderId:string,companyId:string):Promise<void> {

        const order = await this.ordersRepostory.findById(orderId)

        if(!order){
            throw new AppError("Order not found",404)
        }

        if(order.companyId !== companyId){
            throw new AppError("Forbidden",403)
        }

        order.markAsReady()

        await this.ordersRepostory.save(order);
        
        await  this.messageQueue.publish('order_reach_for_dispatch',{
            orderId:order.id,
            companyId: order.companyId,
            pickupAddress: order.pickupAddress,
            deliveryAddress: order.deliveryAddress
        });
    }
}