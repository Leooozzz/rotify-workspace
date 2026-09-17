import { Users } from "../../domain/entities/Users";
import { IUsersRepository } from "../../domain/repositories/IUsersRepository";
import { IAuthContext } from "../../shared/types/auth";

export class ListUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(auth: IAuthContext): Promise<Users[]> {
    if (auth.role === "ADMIN") {
      return this.usersRepository.findAll();
    }

    if (!auth.companyId) {
      return [];
    }

    return this.usersRepository.findByCompanyId(auth.companyId);
  }
}
