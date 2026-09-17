import { Users } from "../../domain/entities/Users";
import { UserNotFoundError } from "../../domain/errors/UserNotFoundError";
import { IUsersRepository } from "../../domain/repositories/IUsersRepository";
import { ICompanyMembersRepository } from "../../domain/repositories/ICompanyMembersRepository";

export interface IProfileCompany {
  id: string;
  name: string;
  profile_pic_company: string | null;
  role: "OWNER" | "MEMBER";
}

export interface IGetProfileResult {
  user: Users;
  company: IProfileCompany | null;
}

export class GetProfileUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private companyMembersRepository: ICompanyMembersRepository,
  ) {}

  async execute(userId: string): Promise<IGetProfileResult> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new UserNotFoundError();
    }

    const membership = await this.companyMembersRepository.findByUserId(userId);

    const company =
      membership && membership.company.id && membership.company.name
        ? {
            id: membership.company.id,
            name: membership.company.name,
            profile_pic_company: membership.company.profile_pic_company ?? null,
            role: membership.member.role ?? "MEMBER",
          }
        : null;

    return { user, company };
  }
}
