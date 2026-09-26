import { Order } from "../../domain/entities/Order";
import { IOrdersRepository } from "../../domain/repositories/IOrdersRepository";
import { AppError } from "../../shared/errors/AppError";

export class ListOrderByCompanyIdUseCase { 
    constructor (private orderRepository:IOrdersRepository) { }

    async execute (companyId:string):Promise <Order[]> {
        if(!companyId){
            throw new AppError("CompanyId is required",400)
        }
        const orders = await this.orderRepository.findByCompanyId(companyId)
        return orders
    }
}