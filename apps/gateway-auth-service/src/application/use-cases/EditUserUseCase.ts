import { Users } from "../../domain/entities/Users";
import { ForbiddenError } from "../../domain/errors/ForbiddenError";
import { UserAlreadyExistsError } from "../../domain/errors/UserAlreadyExistsError";
import { UserNotFoundError } from "../../domain/errors/UserNotFoundError";
import {
  IUpdateUserData,
  IUsersRepository,
} from "../../domain/repositories/IUsersRepository";
import { IHashProvider } from "../providers/IHashProvider";
import { IAuthContext } from "../../shared/types/auth";

export interface IEditUserRequest {
  name?: string | undefined;
  email?: string | undefined;
  password?: string | undefined;
  profile_picture?: string | undefined;
}

export class EditUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private hashProvider: IHashProvider,
  ) {}

  async execute(
    auth: IAuthContext,
    targetUserId: string,
    data: IEditUserRequest,
  ): Promise<{ user: Users }> {
    if (auth.role !== "ADMIN" && auth.userId !== targetUserId) {
      throw new ForbiddenError();
    }

    const userExists = await this.usersRepository.findById(targetUserId);
    if (!userExists) {
      throw new UserNotFoundError();
    }

    const update: IUpdateUserData = {};

    if (data.name !== undefined) {
      update.name = data.name.trim();
    }

    if (data.email !== undefined) {
      const email = data.email.trim().toLowerCase();
      const emailInUse = await this.usersRepository.findByEmail(email);
      if (emailInUse && emailInUse.id !== targetUserId) {
        throw new UserAlreadyExistsError(email);
      }
      update.email = email;
    }

    if (data.password !== undefined) {
      update.password = await this.hashProvider.generateHash(data.password);
    }

    if (data.profile_picture !== undefined) {
      update.profile_picture = data.profile_picture;
    }

    const user = await this.usersRepository.editById(targetUserId, update);
    if (!user) {
      throw new UserNotFoundError();
    }

    return { user };
  }
}
