import { Injectable } from '@angular/core';
import { User } from '../api/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(usernameOrEmail: string, password: string): boolean {
    const users = JSON.parse(localStorage.getItem('users') || '[]') as User[];

    // Verificar si existe un usuario con el mismo username o email y contraseña
    const user = users.find(user =>
      (user.username === usernameOrEmail || user.email === usernameOrEmail) &&
      user.password === password
    );

    if (user) {
      const userInfo = {
        id: user.id,
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        username: user.username,
      };

      localStorage.setItem('userSession', JSON.stringify(userInfo));
    }
    // Retornar true si el usuario existe, de lo contrario false
    return user !== undefined;
  }
}
