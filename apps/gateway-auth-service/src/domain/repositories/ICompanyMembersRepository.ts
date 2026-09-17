import { Company } from "../entities/Company";
import { CompanyMember } from "../entities/CompanyMember";

export interface ICompanyMemberWithCompany {
  member: CompanyMember;
  company: Company;
}

export interface ICompanyMembersRepository {
  create(member: CompanyMember): Promise<CompanyMember>;
  findByUserId(userId: string): Promise<ICompanyMemberWithCompany | null>;
}
