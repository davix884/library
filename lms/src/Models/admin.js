import {user} from './user';

export class Admin extends User {
  constructor(name, email) {
    super(name, email);
  }

  getRole() {
    return 'Admin';
  }
}