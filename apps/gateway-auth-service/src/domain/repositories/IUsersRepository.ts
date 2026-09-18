import { Users } from "../entities/Users";

export interface IUpdateUserData {
  name?: string;
  email?: string;
  password?: string;
  profile_picture?: string;
}

export interface IUsersRepository {
  create(user: Users): Promise<Users>;
  findAll(): Promise<Users[]>;
  findByEmail(email: string): Promise<Users | null>;
  findById(id: string): Promise<Users | null>;
  findByCompanyId(companyId: string): Promise<Users[]>;
  editById(id: string, data: IUpdateUserData): Promise<Users | null>;
  deleteUser(id: string): Promise<Users | null>;
}
