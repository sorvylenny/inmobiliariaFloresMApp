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
  private logoutTimer: any;
  private userSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  setAuthToken(token: string) {
    this.authToken = token;
  }

  constructor(private http: HttpClient) {
    this.getLoggedInUser();
   }

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
        this.initLogoutTimer();
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
  private initLogoutTimer(): void {
    const token = localStorage.getItem('token');
    const expiration = localStorage.getItem('tokenExpiration');
    if (token && expiration) {
      const expirationDate = new Date(expiration);
      const currentTime = new Date();
      const expiresIn = expirationDate.getTime() - currentTime.getTime();

      // Configurar el temporizador de deslogueo
      this.logoutTimer = setTimeout(() => {
        this.logout(); // Desloguear al usuario
        clearInterval(this.logoutTimer); // Limpiar el temporizador
      }, expiresIn);
    }
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

  isLoggedInt(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  updateUserById(id: string , user: User): Observable<User> {
    console.log(id)
    const url = `${this.baseUrl}edit/${id}`;
    return this.http.put<User>(url, user);
  }
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('roles');
    this.userSubject.next(null);
  }

}
