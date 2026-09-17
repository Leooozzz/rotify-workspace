import { Company } from "../entities/Company";

export interface ICompaniesRepository {
  create(company: Company): Promise<Company>;
  findById(id: string): Promise<Company | null>;
  editById(id: string): Promise<Company | null>;
  deleteById(id: string): Promise<null>;
}
