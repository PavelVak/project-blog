import { User } from './user.model';

export class SignUpModel extends User {
  public password: string;

  constructor(displayName: string = '',
              email: string = '',
              firstName: string = '',
              lastName: string = '',
              password: string = '') {
    super(displayName, email, firstName, lastName);
    this.password = password;
  }
}
