import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
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

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService
  ) {
    this.formLogin = this.fb.group({
      username: ["", Validators.required],
      password: ["", [Validators.required, Validators.minLength(6)]]
    });
  }

  initSesion() {
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
            text: `Welcome, ${this.formLogin.value.username}!`,
          }).then(() => {
            this.router.navigate(['/propiedades']);
          });
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
  }


  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
}
