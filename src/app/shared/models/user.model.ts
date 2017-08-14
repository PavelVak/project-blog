export class User {
  public displayName: string;
  public email: string;
  public firstName: string;
  public lastName: string;
  public $key: string;

  constructor(displayName: string = '', email: string = '', firstName: string = '', lastName: string = '') {
   this.displayName = displayName;
   this.email = email;
   this.firstName = firstName;
   this.lastName = lastName;
  }
}
