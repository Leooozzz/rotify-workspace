import { Users } from "../entities/Users";

export interface IUsersRepository {
  create(user: Users): Promise<Users>;
  findByEmail(email: string): Promise<Users | null>;
  findById(id: string): Promise<Users | null>;
  editById(id: string): Promise<Users | null>;
  deleteUser(id: string): Promise<Users | null>;
}
