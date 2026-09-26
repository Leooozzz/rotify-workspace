import { IOrdersRepository } from "../../domain/repositories/IOrdersRepository";
import { AppError } from "../../shared/errors/AppError";
import { IMessageQueueProvider } from "../providers/IMessageQueueProvider";

export class CancelOrderUseCase { 
    constructor (private ordersRepository: IOrdersRepository,private messsageQueue: IMessageQueueProvider ){}

    async execute (orderId:string,companyId:string):Promise <void> {
        const order = await this.ordersRepository.findById(orderId)
        if(!order){
            throw new AppError("Order not found by Order Id",400)
        }
        if(order.companyId !== companyId){
            throw new AppError("Forbideen",403)
        }
        order.cancel()

        await this.ordersRepository.save(order)
        await this.messsageQueue.publish('order_cancelled', {
        orderId: order.id,
        companyId: order.companyId,
        });
    }
}