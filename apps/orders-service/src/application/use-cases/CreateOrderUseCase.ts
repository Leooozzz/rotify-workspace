import { Order } from "../../domain/entities/Order";
import { IOrdersRepository } from "../../domain/repositories/IOrdersRepository";

interface IRequest { 
    companyId: string;
  createdByUserId: string;
  recipientName: string;
  recipientPhone: string;
  pickupAddress: string;
  deliveryAddress: string;
}

export class CreateOrderUseCase {
    constructor(private ordersRepository: IOrdersRepository) {}
    async execute (data:IRequest) { 

    const order = new Order({
      companyId: data.companyId,
      createdByUserId: data.createdByUserId,
      recipientName: data.recipientName,
      recipientPhone: data.recipientPhone,
      pickupAddress: data.pickupAddress,
      deliveryAddress: data.deliveryAddress,
    });
    const createdOrder = await this.ordersRepository.create(order);
    return createdOrder;
    }    

}