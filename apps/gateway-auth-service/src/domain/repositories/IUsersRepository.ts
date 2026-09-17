import { Users } from "../entities/Users";

export interface IUsersRepository {
  create(user: Users): Promise<Users>;
  findAll(): Promise<Users[]>;
  findByEmail(email: string): Promise<Users | null>;
  findById(id: string): Promise<Users | null>;
  findByCompanyId(companyId: string): Promise<Users[]>;
  editById(id: string): Promise<Users | null>;
  deleteUser(id: string): Promise<Users | null>;
}
