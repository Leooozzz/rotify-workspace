export class Company {
  id?: string;
  name?: string;
  profile_pic_company?: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;

  constructor(props: Company, id?: string) {
    Object.assign(this, props);
    if (id) this.id = id;
  }
}
