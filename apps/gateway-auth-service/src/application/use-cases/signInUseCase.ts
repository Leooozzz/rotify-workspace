import { InvalidCredentialsError } from "../../domain/errors/InvalidCredentialsError";
import { Users } from "../../domain/entities/Users";
import { IUsersRepository } from "../../domain/repositories/IUsersRepository";
import { ICompanyMembersRepository } from "../../domain/repositories/ICompanyMembersRepository";
import { IHashProvider } from "../providers/IHashProvider";
import { ITokenProvider } from "../providers/ITokenProvider";
import { IRefreshTokenProvider } from "../providers/IRefreshTokenProvider";

export interface ISignInRequest {
    email:string;
    password:string;
}

export class SignInUseCase {
    constructor(
        private usersRepository: IUsersRepository,
        private hashProvider: IHashProvider,
        private tokenProvider: ITokenProvider,
        private refreshTokenProvider: IRefreshTokenProvider,
        private companyMembersRepository: ICompanyMembersRepository,
    ) {
       
    }
     async execute(data: ISignInRequest): Promise<{ user: Users; accessToken: string; refreshToken: string }> {
            const email = data.email.trim().toLowerCase();
            const user = await this.usersRepository.findByEmail(email);
            if (!user || !user.password) {
                throw new InvalidCredentialsError();
            }
            const isMatch = await this.hashProvider.compareHash(data.password, user.password);
            if (!isMatch) {
                throw new InvalidCredentialsError();
            }

            const membership = await this.companyMembersRepository.findByUserId(user.id!);

            const accessToken = await this.tokenProvider.generateToken({
                sub: user.id!,
                role: user.role ?? "USER",
                companyId: membership?.company.id ?? null,
                companyRole: membership?.member.role ?? null,
            });
            const refreshToken = await this.refreshTokenProvider.generate(user.id!);

            return { user, accessToken, refreshToken };
        }
}
