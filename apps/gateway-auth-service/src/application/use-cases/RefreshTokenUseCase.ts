import { InvalidRefreshTokenError } from "../../domain/errors/InvalidRefreshTokenError";
import { IUsersRepository } from "../../domain/repositories/IUsersRepository";
import { ICompanyMembersRepository } from "../../domain/repositories/ICompanyMembersRepository";
import { IRefreshTokenProvider } from "../providers/IRefreshTokenProvider";
import { ITokenProvider } from "../providers/ITokenProvider";

export interface IRefreshTokenResult {
  accessToken: string;
  refreshToken: string;
}

export class RefreshTokenUseCase {
  constructor(
    private refreshTokenProvider: IRefreshTokenProvider,
    private usersRepository: IUsersRepository,
    private companyMembersRepository: ICompanyMembersRepository,
    private tokenProvider: ITokenProvider,
  ) {}

  async execute(refreshToken: string): Promise<IRefreshTokenResult> {
    const userId = await this.refreshTokenProvider.verify(refreshToken);

    if (!userId) {
      throw new InvalidRefreshTokenError();
    }

    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new InvalidRefreshTokenError();
    }

    const membership = await this.companyMembersRepository.findByUserId(userId);

    await this.refreshTokenProvider.revoke(refreshToken);

    const accessToken = await this.tokenProvider.generateToken({
      sub: user.id!,
      role: user.role ?? "USER",
      companyId: membership?.company.id ?? null,
      companyRole: membership?.member.role ?? null,
    });
    const newRefreshToken = await this.refreshTokenProvider.generate(user.id!);

    return { accessToken, refreshToken: newRefreshToken };
  }
}
