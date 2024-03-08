import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';
import { Login } from 'src/app/interfaces/login';
import { User } from 'src/app/interfaces/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn: boolean = false;
  private baseUrl:string= environment.baseUrlUser;
  private authToken!: string;
  private userSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  setAuthToken(token: string) {
    this.authToken = token;
  }

  constructor(private http: HttpClient) {
    this.getLoggedInUser();
   }
/*   getLoggedInUser(): Observable<User | null> {

    const username = localStorage.getItem('username');
    const roles = localStorage.getItem('roles');
    const token = localStorage.getItem('token');

    if (username && roles && token) {
      const user: User = {
        username: username,
        roles: roles.split(','),
        token: token
      };
      console.log(user)
      return of(user);
    } else {

      return of(null);
    }
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
 */

  initSeccion(required: any): Observable<boolean> {
    const url = `${this.baseUrl}login`;
    return this.http.post<User>(url, required).pipe(
      map((resp: any) => {
        this.setAuthToken(resp.token);
        const user = { username: resp.user.username, roles: resp.user.roles }; // Asegúrate de adaptarlo a tu estructura de User
        localStorage.setItem('token', resp.token);
        localStorage.setItem('username', user.username);
        localStorage.setItem('roles', JSON.stringify(user.roles)); // Asume que roles es un array
        this.userSubject.next(user); // Actualiza el BehaviorSubject
        return true;
      }),
      catchError(err => {
        console.error('Error durante el inicio de sesión:', err);
        return of(false);
      })
    );
  }

  private getLoggedInUser(): void {
    const username = localStorage.getItem('username');
    const roles = localStorage.getItem('roles');
    if (username && roles) {
      const user = { username, roles: JSON.parse(roles) };
      this.userSubject.next(user);
    }
  }

  get user$(): Observable<User | null> {
    return this.userSubject.asObservable();
  }

  getAllUser(): Observable<User[]>{
    const url = `${this.baseUrl}getAll`
    return this.http.get<User[]>(url)
  }

  newUser(userData: User): Observable<User> {
    const url = `${this.baseUrl}register`;
    console.log(userData)
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

  updateUserById(id: any, user: User): Observable<User> {
    console.log(id)
    const userId = id._id
    const url = `${this.baseUrl}edit/${userId}`;
    return this.http.put<User>(url, user);
  }

  logout(): void {
    // Limpiar localStorage o cualquier almacenamiento que uses
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('roles');
    this.userSubject.next(null); // Notificar a los suscriptores
  }

}
