import { Injectable } from '@angular/core';
import { User } from '../api/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  private localStorageKey = 'users';

  getUsers(): User[]{
    const users = localStorage.getItem(this.localStorageKey);
    return users ? JSON.parse(users) : [];
  }

  getUserById(id: string): User | undefined {
    const users = this.getUsers();
    return users.find(user => user.id === id);
  }

  createUser(user: User): void {
    const users = this.getUsers();
    users.push(user);
    this.saveUsers(users);
  }

  updateUser(id: string, updatedUser: User): void {
    const users = this.getUsers();
    const index = users.findIndex(user => user.id === id);
    if (index !== -1) {
      users[index] = { ...users[index], ...updatedUser };
      this.saveUsers(users);
    }
  }

  deleteUser(id: string): void {
    let users = this.getUsers();
    users = users.filter(user => user.id !== id);
    this.saveUsers(users);
  }

  private saveUsers(user: User[]):void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(user));
  }

  isUserLoggedIn(): boolean {
    const userSession = localStorage.getItem('userSession');
    return !!userSession;
  }

  userLogged(): any {
    const userSession = localStorage.getItem('userSession');
    return JSON.parse(userSession);
  }

}
