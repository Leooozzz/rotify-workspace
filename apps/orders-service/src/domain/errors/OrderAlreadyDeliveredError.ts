import { AppError } from "../../shared/errors/AppError";

export class OrderAlreadyDeliveredError extends AppError {
  constructor(message = "Pedidos já entregues não podem ser cancelados.") {
    super(message, 409);
    this.name = "OrderAlreadyDeliveredError";
  }
}