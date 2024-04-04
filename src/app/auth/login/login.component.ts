import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { StateService } from 'src/app/core/services/state.service';
import { Login } from 'src/app/interfaces/login';
import { User } from 'src/app/interfaces/user';
import { AlertService } from 'src/app/shared/alert.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formLogin: FormGroup;
  hidePassword: boolean = true;
  showLoading: boolean = false;
  users: User[]=[]
  loginForm: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService,
    private stateService:StateService
  ) {
    this.formLogin = this.fb.group({
      username: ["", Validators.required],
      password: ["", [Validators.required, Validators.minLength(6)]]
    });
  }

/*   initSesion() {
    this.showLoading = true;

    const request: Login = {
      username: this.formLogin.value.username,
      password: this.formLogin.value.password
    };

    this.authService.initSeccion(request).subscribe(
      (loggedIn: boolean) => {
        if (loggedIn) {
          Swal.fire({
            icon: 'success',
            title: 'Login successful',
            text: `Bienvenido, ${this.formLogin.value.username}!`,
          }).then(() => {
          const role = localStorage.getItem('roles');
            this.stateService
            if (role?.includes('admin')) { // Verificar si roles está definido antes de llamar a includes
              this.router.navigate(['/dashboard']);
              console.log('admin')
            } else {
              this.router.navigate(['/propiedades']);
              console.log('empleados')
            }
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Incorrect credentials',
          });
          this.showLoading = false;
        }
      },
      (error: any) => {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while logging in',
        });
      }
    );
  } */
  initSesion() {
    this.showLoading = true;

    const request: Login = {
      username: this.formLogin.value.username,
      password: this.formLogin.value.password
    };
    console.log(request);

    this.authService.initSeccion(request).subscribe(
      success => {
        if (success) {
          const role = localStorage.getItem('roles');
          if (role?.includes('admin')) { // Verificar si roles está definido antes de llamar a includes
            this.router.navigate(['/dashboard']);
            console.log('admin');
            this.stateService.setIsLoggedIn(true);
            const username = this.formLogin.value.username; // Obtener el nombre de usuario
            Swal.fire({
              icon: 'success',
              title: 'Notificación',
              text: `Bienvenido ${username}`, // Mostrar el nombre de usuario en el mensaje de bienvenida
            });
            this.loginForm.reset();
          } else {
            this.router.navigate(['/propiedades']);
            console.log('empleados');
          }
        } else {
          this.showLoading = false;
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: `Usuario y/o contraseña inválida.`,
          });
        }
      }, error => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `${error}`,
        });
      }
    );
  }


  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
}
