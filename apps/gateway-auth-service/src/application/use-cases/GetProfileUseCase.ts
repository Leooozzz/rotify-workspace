import { Users } from "../../domain/entities/Users";
import { UserNotFoundError } from "../../domain/errors/UserNotFoundError";
import { IUsersRepository } from "../../domain/repositories/IUsersRepository";

export class GetProfileUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(userId: string): Promise<Users> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new UserNotFoundError();
    }

    return user;
  }
}
