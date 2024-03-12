import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from 'src/app/interfaces/user';
import { AlertService } from 'src/app/shared/alert.service';

@Component({
  selector: 'app-models-user',
  templateUrl: './models-user.component.html',
  styleUrls: ['./models-user.component.css']
})
export class ModelsUserComponent {
  formUser: FormGroup;
  ListRoles: string[] = ['Admin', 'Empleado'];
  hidePassword: boolean = true;
  isNewUser: boolean = true;
  isUpdateUser: boolean = false;
  titleAction: string = "Agregar";
  buttonAction: string = "Guardar";

  constructor(
    private modalsActual: MatDialogRef<ModelsUserComponent>,
    @Inject(MAT_DIALOG_DATA) public dataUser: User,
    private fb: FormBuilder,
    private authService: AuthService,
    private alertService: AlertService
  ) {
    this.formUser = this.fb.group({
      fullname: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      roles: ['', Validators.required],
      isActive: [this.dataUser?.isActive != null ? this.dataUser.isActive : true]
    });
    if (this.dataUser!=null){
      this.titleAction="Editar";
      this.buttonAction='Modificar';
      this.isNewUser=false
      this.isUpdateUser=true
      this.formUser.get('password')?.clearValidators();
      this.formUser.get('password')?.updateValueAndValidity();
    }
  }
  ngOnInit(): void {
    if (this.dataUser != null) {
      this.formUser.patchValue({
        fullname: this.dataUser.fullname,
        username: this.dataUser.username,
        password:this.dataUser.password,
        roles: this.dataUser.roles,

      })
    }
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  /* saveEditUser() {
    const user: User = {
      fullname: this.formUser.value.fullname,
      username: this.formUser.value.username,
      roles: this.formUser.value.roles.toLowerCase()
    }
    console.log(this.dataUser)

    const userId: string = {
      _id: this.dateUser == null ? '' : this.dateUser._id,
    };


    if (this.dataUser == null) {
      user.password= this.formUser.value.password,
      this.authService.newUser(user).subscribe({
        next: (res :any) => {
          if (res) {
            this.alertService.Alert('success', 'Usuario creado correctamente');
            this.modalsActual.close("true");

          } else {
            this.alertService.Alert("No se pudo registrar el usuario", "Ha ocurrido un error!");

          }
        },
        error:(error)=>{console.log(error)}
      });

    } else {
      console.log(id)
      console.log(user)
      this.authService.updateUserById(userId.id!, user).subscribe(
        res => {
          if (res) {
            user.isActive= this.formUser.value.isActive,
            this.alertService.Alert('success', 'Usuario editado correctamente');
            this.modalsActual.close("true");
          } else {
            this.alertService.Alert("No se pudo editar el usuario", "Ha ocurrido un error!");
          }
        },
        error => {
          console.error('Error al editar el usuario:', error);
          this.alertService.Alert("Error al editar el usuario", "Ha ocurrido un error");
        }
      );

    }

  }

 */
  saveEditUser() {
    const user: User = {
      fullname: this.formUser.value.fullname,
      username: this.formUser.value.username,
      roles: this.formUser.value.roles.toLowerCase()
    };

    console.log(this.dataUser);

    const userId: string = this.dataUser._id ? this.dataUser._id : '';


    if (!this.dataUser) {
      user.password = this.formUser.value.password;
      this.authService.newUser(user).subscribe({
        next: (res: any) => {
          if (res) {
            this.alertService.Alert('success', 'Usuario creado correctamente');
            this.modalsActual.close("true");
          } else {
            this.alertService.Alert("No se pudo registrar el usuario", "Ha ocurrido un error!");
          }
        },
        error: (error) => {
          console.log(error);
        }
      });
    } else {
      console.log(userId);
      console.log(user);
      this.authService.updateUserById(userId, user).subscribe(
        res => {
          if (res) {
            user.isActive = this.formUser.value.isActive;
            this.alertService.Alert('success', 'Usuario editado correctamente');
            this.modalsActual.close("true");
          } else {
            this.alertService.Alert("No se pudo editar el usuario", "Ha ocurrido un error!");
          }
        },
        error => {
          console.error('Error al editar el usuario:', error);
          this.alertService.Alert("Error al editar el usuario", "Ha ocurrido un error");
        }
      );
    }
  }

}
