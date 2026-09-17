import { AppError } from "../../shared/errors/AppError";

export class UserAlreadyExistsError extends AppError {
  constructor(email: string) {
    super(`User with email "${email}" already exists`, 409);
    this.name = "UserAlreadyExistsError";
  }
}
