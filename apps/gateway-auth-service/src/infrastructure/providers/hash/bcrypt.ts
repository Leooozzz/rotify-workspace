import { compare, hash } from "bcrypt";
import { IHashProvider } from "../../../application/providers/IHashProvider";

export class bcryptHashProvider implements IHashProvider {
  async generateHash(payload: string): Promise<string> {
    return hash(payload, 8);
  }
  async compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }
}
