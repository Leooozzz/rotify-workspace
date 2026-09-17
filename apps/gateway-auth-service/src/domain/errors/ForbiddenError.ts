import { AppError } from "../../shared/errors/AppError";

export class ForbiddenError extends AppError {
  constructor() {
    super("Forbidden", 403);
    this.name = "ForbiddenError";
  }
}