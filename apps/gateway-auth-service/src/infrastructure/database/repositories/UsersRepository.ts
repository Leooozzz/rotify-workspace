import type { User } from "../../../generated/prisma/client";
import { Users } from "../../../domain/entities/Users";
import { IUsersRepository } from "../../../domain/repositories/IUsersRepository";
import { prisma } from "../prisma/PrismaClient";

function toEntity(user: User): Users {
  return new Users({
    id: user.id,
    name: user.name,
    email: user.email,
    password: user.password,
    role: user.role,
    created_at: user.created_at,
    updated_at: user.updated_at,
    ...(user.profile_picture !== null ? { profile_picture: user.profile_picture } : {}),
    ...(user.deleted_at !== null ? { deleted_at: user.deleted_at } : {}),
  });
}

export class UsersRepository implements IUsersRepository {
  async create(user: Users): Promise<Users> {
    if (!user.name || !user.email || !user.password) {
      throw new Error("UsersRepository.create: name, email and password are required");
    }

    const created = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role ?? "USER",
        profile_picture: user.profile_picture ?? null,
      },
    });

    return toEntity(created);
  }

  async findAll(): Promise<Users[]> {
    const users = await prisma.user.findMany({ where: { deleted_at: null } });
    return users.map((user) => toEntity(user));
  }

  async findByEmail(email: string): Promise<Users | null> {
    const user = await prisma.user.findUnique({ where: { email } });
    return user ? toEntity(user) : null;
  }

  async findByCompanyId(companyId: string): Promise<Users[]> {
    const members = await prisma.companyMember.findMany({
      where: { companyId, user: { deleted_at: null } },
      include: { user: true },
    });
    return members.map((member) => toEntity(member.user));
  }

  async findById(id: string): Promise<Users | null> {
    const user = await prisma.user.findUnique({ where: { id } });
    return user ? toEntity(user) : null;
  }

  async editById(id: string): Promise<Users | null> {
    const user = await prisma.user.findUnique({ where: { id } });
    return user ? toEntity(user) : null;
  }

  async deleteUser(id: string): Promise<Users | null> {
    const user = await prisma.user.update({
      where: { id },
      data: { deleted_at: new Date() },
    });
    return toEntity(user);
  }
}
