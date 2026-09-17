export class CompanyMember {
  id?: string;
  userId!: string;
  companyId!: string;
  role?: "OWNER" | "MEMBER";
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;

  constructor(props: CompanyMember, id?: string) {
    Object.assign(this, props);
    if (id) this.id = id;
  }
}
