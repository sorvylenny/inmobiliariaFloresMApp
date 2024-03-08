import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inmueble } from 'src/app/interfaces/inmueble';

@Component({
  selector: 'app-models-inmuebles',
  templateUrl: './models-inmuebles.component.html',
  styleUrls: ['./models-inmuebles.component.css']
})
export class ModelsInmueblesComponent {

  formInmueble: FormGroup;
  titleAction: string = "Agregar Inmueble";
  buttonAction: string = "Guardar";

  constructor(
    private modalsActual: MatDialogRef<ModelsInmueblesComponent>,
    @Inject(MAT_DIALOG_DATA) public dateInmueble: Inmueble,
    private fb: FormBuilder,/*
    private rolesService: RolesService,
    private userService: UsersService,
    private utilityService: UtilityService */
  ) {
    this.formInmueble = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      address: ['', Validators.required],
      department: ['', Validators.required],
      city: ['', Validators.required],
      latitude: [0, Validators.required],
      longitude: [0, Validators.required],
      bathrooms: [0, Validators.required],
      bedrooms: [0, Validators.required],
      closet: [0, Validators.required],
      price: [0, Validators.required]

    });
    if (this.dateInmueble!=null){
      this.titleAction="Editar";
      this.buttonAction='Modificar';
    }
  }
  ngOnInit(): void {
    if (this.dateInmueble != null) {
      this.formInmueble.patchValue({
        title: this.dateInmueble.title,
        description:this.dateInmueble.description,
        address: this.dateInmueble.address,
        department:this.dateInmueble.department,
        city: this.dateInmueble.city,
        latitude: this.dateInmueble.latitude,
        longitude: this.dateInmueble.longitude,
        bathrooms: this.dateInmueble.bathrooms,
        bedrooms: this.dateInmueble.bedrooms,
        closet: this.dateInmueble.closet,
        price: this.dateInmueble.price
      })
    }
  }

  saveEditInmueble() {
    const inmueble: Inmueble = {
      _id: this.dateInmueble ? this.dateInmueble._id : '',
      title: this.formInmueble.value.title,
      description: this.formInmueble.value.description,
      address: this.formInmueble.value.address,
      department: this.formInmueble.value.department,
      city: this.formInmueble.value.city,
      latitude: this.formInmueble.value.latitude,
      longitude: this.formInmueble.value.longitude,
      bathrooms: this.formInmueble.value.bathrooms,
      bedrooms: this.formInmueble.value.bedrooms,
      closet: this.formInmueble.value.closet,
      price: this.formInmueble.value.price
  }

  /*   if (this.dateInmueble == null) {
      this.userService.SaveUsers(inmueble).subscribe({
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
      this.userService.EditUsers(inmueble).subscribe({
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
    } */
  }


}
