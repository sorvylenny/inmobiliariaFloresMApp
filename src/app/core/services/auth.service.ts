import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Login } from 'src/app/interfaces/login';
import { User } from 'src/app/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn: boolean = false;
  private baseUrl:string='http://localhost:3000/users/'
  private authToken!: string;
  setAuthToken(token: string) {
    this.authToken = token;
  }

  constructor(private http: HttpClient) { }
  getLoggedInUser(): Observable<User | null> {
    // Recuperar la información del usuario del almacenamiento local
    const username = localStorage.getItem('username');
    const roles = localStorage.getItem('roles'); // Obtener roles como cadena simple
    const token = localStorage.getItem('token');

    // Verificar si se encontró la información del usuario
    if (username && roles && token) {
      // Crear un objeto User con la información recuperada
      const user: User = {
        username: username,
        roles: roles.split(','), // Convertir la cadena de roles en un array
        token: token
      };
      console.log(user)
      // Devolver el usuario como un observable
      return of(user);
    } else {
      // Si no se encuentra la información del usuario, devolver null
      return of(null);
    }
  }

  getAllUser(): Observable<User[]>{
    const url = `${this.baseUrl}getAll`
    return this.http.get<User[]>(url)
  }

  initSeccion(required: Login) {
    const url = `${this.baseUrl}login`;

    return this.http.post<User>(url, required).pipe(
      map((resp: any) => { {
          this.setAuthToken(resp.token);
          localStorage.setItem('token', resp.token);
          localStorage.setItem('username', resp.user.username);
          localStorage.setItem('roles',resp.user.roles);
          console.log(resp);
          return true;
        }
      }),
      catchError(err => {
        console.error('Error durante el inicio de sesión:', err);
        return of(false);
      })
    );
  }


  newUser(userData: User): Observable<User> {
    const url = `${this.baseUrl}register`;
    console.log(url);
    return this.http.post<User>(url, userData);
  }
  private setLoggedInUser(user: User): void {
    localStorage.setItem('loggedInUser', JSON.stringify(user));
  }

  // Método para obtener el estado de autenticación del usuario
  isLoggedInt(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  putUserById(id: string, user: User): Observable<User> {
    const url = `${this.baseUrl}users/edit/${id}`;
    return this.http.put<User>(url, user);
  }


}
