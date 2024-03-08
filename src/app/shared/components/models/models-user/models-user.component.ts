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

   saveEditUser() {
    const user: User = {
      fullname: this.formUser.value.fullname,
      username: this.formUser.value.username,
      password: this.formUser.value.password,
      roles: this.formUser.value.roles.toLowerCase(),
      /* isActive: this.formUser.value.isActive, */
    }
    const id : any={
      _id: this.dataUser == null ? '0' : this.dataUser._id,
    }

    if (this.dataUser == null) {
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
      this.authService.updateUserById(id, user).subscribe(
        res => {
          if (res) {
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
