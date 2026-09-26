import { Order } from "../entities/Order";

export interface IOrdersRepository { 
    create (order:Order):Promise <Order>
    findById (id:string):Promise<Order|null>
    findByTackingCode(trackingCode:string):Promise <Order|null>
    findByCompanyId(companyId:string):Promise<Order[]>
    save(order:Order):Promise<Order>
}