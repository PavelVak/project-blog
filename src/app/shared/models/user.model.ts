import { Blog } from './blog.model';

export class User {
  public displayName: string;
  public email: string;
  public firstName: string;
  public lastName: string;
  public $key: string;
  public blogArr: Blog[];
  public followerArr: string[];
  public isFollower: boolean;

  constructor(displayName: string = '', email: string = '', firstName: string = '', lastName: string = '', $key?:string) {
   this.displayName = displayName;
   this.email = email;
   this.firstName = firstName;
   this.lastName = lastName;
   this.$key = $key;
  }
}
