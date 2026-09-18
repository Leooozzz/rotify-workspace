import { ForbiddenError } from "../../domain/errors/ForbiddenError";
import { UserNotFoundError } from "../../domain/errors/UserNotFoundError";
import { IUsersRepository } from "../../domain/repositories/IUsersRepository";
import { IAuthContext } from "../../shared/types/auth";

export class DeleteUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(auth: IAuthContext, targetUserId: string): Promise<void> {
    if (auth.role !== "ADMIN" && auth.userId !== targetUserId) {
      throw new ForbiddenError();
    }

    const userExists = await this.usersRepository.findById(targetUserId);
    if (!userExists) {
      throw new UserNotFoundError();
    }

    await this.usersRepository.deleteUser(targetUserId);
  }
}
