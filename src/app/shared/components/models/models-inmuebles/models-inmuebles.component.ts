import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InmueblesService } from 'src/app/core/services/inmuebles.service';
import { Inmueble } from 'src/app/interfaces/inmueble';
import { AlertService } from 'src/app/shared/alert.service';

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
    private fb: FormBuilder,
    private inmuebleService: InmueblesService,
    private alertService: AlertService
  ) {
    this.formInmueble = this.fb.group({
      title: ['', Validators.required],
      address: ['', Validators.required],
      department: ['', Validators.required],
      city: ['', Validators.required],
      description: ['', Validators.required],
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
        address: this.dateInmueble.address,
        department:this.dateInmueble.department,
        city: this.dateInmueble.city,
        description:this.dateInmueble.description,
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
      title: this.formInmueble.value.title,
      address: this.formInmueble.value.address,
      department: this.formInmueble.value.department,
      city: this.formInmueble.value.city,
      description: this.formInmueble.value.description,
      latitude: this.formInmueble.value.latitude,
      longitude: this.formInmueble.value.longitude,
      bathrooms: this.formInmueble.value.bathrooms,
      bedrooms: this.formInmueble.value.bedrooms,
      closet: this.formInmueble.value.closet,
      price: this.formInmueble.value.price
  }

  const id : string | any={
    _id: this.dateInmueble ? this.dateInmueble._id : '',
  }
  if (this.dateInmueble == null) {
    this.inmuebleService.newInmueble(inmueble).subscribe({
      next: (res :any) => {
        if (res) {
          this.alertService.Alert('success', 'Inmueble creado correctamente');
          this.modalsActual.close("true");

        } else {
          this.alertService.Alert("No se pudo registrar el usuario", "Ha ocurrido un error!");

        }
      },
      error:(error)=>{console.log(error)}
    });
  }  else {
    console.log(id)
    console.log(inmueble)
    this.inmuebleService.updateInmuebleById(id, inmueble).subscribe(
      res => {
        if (res) {
          this.alertService.Alert('success', 'Inmueble editado correctamente');
          this.modalsActual.close("true");
        } else {
          this.alertService.Alert("No se pudo editar el inmueble", "Ha ocurrido un error!");
        }
      },
      error => {
        console.error('Error al editar el inmueble:', error);
        this.alertService.Alert("Error al editar el inmueble", "Ha ocurrido un error");
      }
    );

  }


  }


}
