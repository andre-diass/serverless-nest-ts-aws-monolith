import { Gender, Plan, Role } from '../consts';

export class User {
  constructor(
    public id: string,
    public is_active: boolean,
    public name: string,
    public email: string,
    public image: string,
    public email_verified: string | null,
  ) {}

  static new(
    id: string,
    name: string,
    image: string,
    email: string,
    email_verified: string | null,
  ) {
    const is_active = true;
    return new User(id, is_active, name, email, image, email_verified);
  }
}
