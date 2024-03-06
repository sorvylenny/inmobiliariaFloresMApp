import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  username: string = '';
  rolesUser: string[] = [];
  listMenus: any[] = []; //

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.getLoggedInUser().subscribe((user: User | null) => {
      if (user) {
        this.username = user.username;
        this.rolesUser = user.roles;
        this.loadMenus(); // Cargar los menús basados en los roles del usuario
      }
    });

  }

  isLoggedIn(): boolean { return this.authService.isLoggedInt();
  }


  loadMenus(): void {
    // Menús para admin
    const adminMenus = [
      { nombre: 'Dashboard', url: '/dashboard', icon: 'dashboard' },
      { nombre: 'Buscar Inmueble', url: '/buscar-inmueble', icon: 'search' },
      { nombre: 'Crear Inmueble', url: '/crear-inmueble', icon: 'add' },
      { nombre: 'Editar Inmueble', url: '/editar-inmueble', icon: 'edit' },
      // Agregar más opciones según sea necesario
    ];

    // Menús para empleado
    const empleadoMenus = [
      { nombre: 'Buscar Inmueble', url: '/buscar-inmueble', icon: 'search' },
      { nombre: 'Crear Inmueble', url: '/crear-inmueble', icon: 'add' },
      { nombre: 'Editar Inmueble', url: '/editar-inmueble', icon: 'edit' },
    ];

    if (this.rolesUser.includes('admin')) {
      // Manejar los roles como cadena simple
      this.listMenus = adminMenus;
    } else if (this.rolesUser.includes('empleado')) {
      this.listMenus = empleadoMenus;
    }
  }

      loadPublicMenu(): void {
    this.listMenus = [];
  }

  closetSesion(): void {
    localStorage.removeItem('username');
    localStorage.removeItem('roles');
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']);
  }
  back(): void {
    this.router.navigate(['']);
  }
 goToIn(){
  this.router.navigate(['/auth/login']);
 }
}
