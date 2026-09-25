import { Order } from "../../../domain/entities/Order";
import { IOrdersRepository } from "../../../domain/repositories/IOrdersRepository";
import { prisma } from "../prisma/PrismaClient";
import { OrderNotFoundError } from "../../../domain/errors/OrderNotFoundError";
import { InvalidOrderDataError } from "../../../domain/errors/InvalidOrderDataError";

export class PrismaOrdersRepository implements IOrdersRepository { 
    async create(order: Order): Promise<Order> {
        const createOrder = await prisma.order.create({
            data:{
                companyId:order.companyId,
                createdByUserId:order.createdByUserId,
                deliveryAddress:order.deliveryAddress,
                pickupAddress:order.pickupAddress,
                recipientName:order.recipientName,
                recipientPhone:order.recipientPhone,
                trackingCode:order.trackingCode,
            }
        })
        return new Order(createOrder as Order,createOrder.id) 
    }
    async findById(id: string): Promise<Order | null> {
        const order = await prisma.order.findUnique({
            where:{id}
        })
        if(!order){
            throw new OrderNotFoundError()
        }
        return new Order(order as Order,order.id) 
    }
    async findByCompanyId(companyId: string): Promise<Order[]> {
    const orders = await prisma.order.findMany({ where: { companyId } });
    return orders.map(order => new Order(order as Order, order.id));
    }
    async findByTackingCode(trackingCode: string): Promise<Order | null> {
           const order = await prisma.order.findUnique({
            where:{trackingCode}
        })
        if(!order){
            throw new OrderNotFoundError()
        }
        return new Order(order as Order,order.id) 
    }
    async save(order: Order): Promise<Order> {
    if(!order.id){
        throw new InvalidOrderDataError("order id is required")
    }
    const updatedOrder = await prisma.order.update({
      where: { id: order.id },
      data: { status: order.status }, 
    });
    return new Order(updatedOrder as Order, updatedOrder.id);
  }
}