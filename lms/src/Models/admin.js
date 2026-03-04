import {User} from './User';

export class Admin extends User {
  constructor(name, email) {
    super(name, email);
  }

  getRole() {
    return 'Admin';
  }
}