import type {
  Company as PrismaCompany,
  CompanyMember as PrismaCompanyMember,
} from "../../../generated/prisma/client";
import { Company } from "../../../domain/entities/Company";
import { CompanyMember } from "../../../domain/entities/CompanyMember";
import {
  ICompanyMemberWithCompany,
  ICompanyMembersRepository,
} from "../../../domain/repositories/ICompanyMembersRepository";
import { prisma } from "../prisma/PrismaClient";

function toCompany(company: PrismaCompany): Company {
  return new Company({
    id: company.id,
    name: company.name,
    created_at: company.created_at,
    updated_at: company.updated_at,
    ...(company.profile_pic_company !== null
      ? { profile_pic_company: company.profile_pic_company }
      : {}),
    ...(company.deleted_at !== null ? { deleted_at: company.deleted_at } : {}),
  });
}

function toMember(member: PrismaCompanyMember): CompanyMember {
  return new CompanyMember({
    id: member.id,
    userId: member.userId,
    companyId: member.companyId,
    role: member.role,
    created_at: member.created_at,
    updated_at: member.updated_at,
  });
}

export class CompanyMembersRepository implements ICompanyMembersRepository {
  async create(member: CompanyMember): Promise<CompanyMember> {
    if (!member.userId || !member.companyId) {
      throw new Error(
        "CompanyMembersRepository.create: userId and companyId are required",
      );
    }

    const created = await prisma.companyMember.create({
      data: {
        userId: member.userId,
        companyId: member.companyId,
        role: member.role ?? "MEMBER",
      },
    });

    return toMember(created);
  }

  async findByUserId(userId: string): Promise<ICompanyMemberWithCompany | null> {
    const member = await prisma.companyMember.findFirst({
      where: { userId },
      include: { company: true },
    });

    if (!member) {
      return null;
    }

    return { member: toMember(member), company: toCompany(member.company) };
  }
}
