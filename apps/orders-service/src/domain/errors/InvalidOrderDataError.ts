import { AppError } from "../../shared/errors/AppError";

export class InvalidOrderDataError extends AppError {
  constructor(message: string) {
    super(message, 400);
    this.name = "InvalidOrderDataError";
  }
}