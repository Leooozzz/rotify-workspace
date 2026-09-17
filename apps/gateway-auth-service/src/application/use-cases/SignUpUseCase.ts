import { UserAlreadyExistsError } from "../../domain/errors/UserAlreadyExistsError";
import { Users } from "../../domain/entities/Users";
import { IUsersRepository } from "../../domain/repositories/IUsersRepository";
import { IHashProvider } from "../providers/IHashProvider";

export interface ISignUpRequest {
  name: string;
  email: string;
  password: string;
  role?: "ADMIN" | "USER" | undefined;
  profile_picture?: string | undefined;
}

export class SignUpUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private hashProvider: IHashProvider,
  ) {}

  async execute(data: ISignUpRequest): Promise<{ user: Users }> {
    const email = data.email.trim().toLowerCase();

    const userAlreadyExists = await this.usersRepository.findByEmail(email);
    if (userAlreadyExists) {
      throw new UserAlreadyExistsError(email);
    }

    const hashedPassword = await this.hashProvider.generateHash(data.password);

    const user = await this.usersRepository.create(
      new Users({
        name: data.name.trim(),
        email,
        password: hashedPassword,
        role: data.role ?? "USER",
        ...(data.profile_picture ? { profile_picture: data.profile_picture } : {}),
      }),
    );

    return { user };
  }
}
