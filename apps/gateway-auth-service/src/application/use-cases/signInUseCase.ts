import { InvalidCredentialsError } from "../../domain/errors/InvalidCredentialsError";
import { Users } from "../../domain/entities/Users";
import { IUsersRepository } from "../../domain/repositories/IUsersRepository";
import { IHashProvider } from "../providers/IHashProvider";
import { ITokenProvider } from "../providers/ITokenProvider";

export interface ISignInRequest {
    email:string;
    password:string;
}

export class SignInUseCase {
    constructor(
        private usersRepository: IUsersRepository,
        private hashProvider: IHashProvider,
        private tokenProvider: ITokenProvider,
    ) {
       
    }
     async execute(data: ISignInRequest): Promise<{ user: Users; token: string }> {
            const email = data.email.trim().toLowerCase();
            const user = await this.usersRepository.findByEmail(email);
            if (!user || !user.password) {
                throw new InvalidCredentialsError();
            }
            const isMatch = await this.hashProvider.compareHash(data.password, user.password);
            if (!isMatch) {
                throw new InvalidCredentialsError();
            }
            const token = await this.tokenProvider.generateToken(user.id!);
            return { user, token };
        }
}
