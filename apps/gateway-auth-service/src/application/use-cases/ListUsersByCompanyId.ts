import { Users } from "../../domain/entities/Users";
import { ForbiddenError } from "../../domain/errors/ForbiddenError";
import { IUsersRepository } from "../../domain/repositories/IUsersRepository";
import { IAuthContext } from "../../shared/types/auth";

export class ListUsersByCompanyIdUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(auth: IAuthContext, companyId: string): Promise<Users[]> {
    if (auth.role !== "ADMIN") {
      throw new ForbiddenError();
    }

    if (!companyId) {
      return [];
    }

    return this.usersRepository.findByCompanyId(companyId);
  }
}