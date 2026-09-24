import { AppError } from "../../shared/errors/AppError";

export class OrderNotFoundError extends AppError {
  constructor(message = "Order not found") {
    super(message, 404);
    this.name = "OrderNotFoundError";
  }
}