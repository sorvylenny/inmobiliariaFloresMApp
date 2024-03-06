import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-models-user',
  templateUrl: './models-user.component.html',
  styleUrls: ['./models-user.component.css']
})
export class ModelsUserComponent {
  formUser: FormGroup;
  hidePassword: boolean = true;
  titleAction: string = "Agregar";
  buttonAction: string = "Guardar";
  ListRoles: any;

  constructor(
    private modalsActual: MatDialogRef<ModelsUserComponent>,
    @Inject(MAT_DIALOG_DATA) public dateUser: User,
    private fb: FormBuilder,/*
    private rolesService: RolesService,
    private userService: UsersService,
    private utilityService: UtilityService */
  ) {
    this.formUser = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      roles: ['', Validators.required],
      isActive: [true, Validators.required]
    });
    if (this.dateUser!=null){
      this.titleAction="Editar";
      this.buttonAction='Modificar';
    }
  }
  ngOnInit(): void {
    if (this.dateUser != null) {
      this.formUser.patchValue({
        username: this.dateUser.username,
        password:this.dateUser.password,
        roles: this.dateUser.roles,
      })
    }
  }
  saveEditUser(){}
  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  /* saveEditUser() {
    const user: Users = {
      idUsers: this.dateUser == null ? 0 : this.dateUser.idUsers,
      username: this.formUser.value.username,
      password: this.formUser.value.password,
      roles: this.formUser.value.roles,
      rolesDescripcion: "",
      clave: this.formUser.value.clave,
      isActive: parseInt(this.formUser.value.isActive),
    }

    if (this.dateUser == null) {
      this.userService.SaveUsers(user).subscribe({
        next: (res) => {
          if (res.status) {
            this.utilityService.Alert('success', 'Usuario creado correctamente');
            this.modalsActual.close("true");
          } else {
            this.utilityService.Alert("No se pudo registrar el usuario", "Ha ocurrido un error!");
          }
        },
        error:()=>{}
      });

    } else {
      this.userService.EditUsers(user).subscribe({
        next:(res) =>{
          if (res.status) {
            this.utilityService.Alert('success', 'Usuario editado correctamente');
            this.modalsActual.close("true");
          } else {
            this.utilityService.Alert("No se pudo editar el usuario", "Ha ocurrido un error!");
          }
        },
       error:() =>{}
      });
    }
  } */

}
