export class Users {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  profile_picture?: string;
  role?: "ADMIN" | "USER";
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;

  constructor(props: Users, id?: string) {
    Object.assign(this, props);
    if (id) this.id = id;
  }
}
