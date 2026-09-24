import { AppError } from "../../shared/errors/AppError";

export class OrderAlreadyReadyError extends AppError {
  constructor(message = "Apenas pedidos pendentes podem ser marcados como prontos para despacho.") {
    super(message, 409);
    this.name = "OrderAlreadyReadyError";
  }
}