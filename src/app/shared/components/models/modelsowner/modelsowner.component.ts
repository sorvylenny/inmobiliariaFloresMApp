import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InmueblesService } from 'src/app/core/services/inmuebles.service';
import { Owner } from 'src/app/interfaces/owner';
import { AlertService } from 'src/app/shared/alert.service';

@Component({
  selector: 'app-modelsowner',
  templateUrl: './modelsowner.component.html',
  styleUrls: ['./modelsowner.component.css']
})
export class ModelsownerComponent {
  formOwner: FormGroup;
  titleAction: string = "Agregar Propietario";
  buttonAction: string = "Guardar";
  constructor(
    private modalsActual: MatDialogRef<ModelsownerComponent>,
    @Inject(MAT_DIALOG_DATA) public dateOwner: Owner,
    private fb: FormBuilder,
    private inmuebleService: InmueblesService,
    private alertService: AlertService
  ) {
    this.formOwner = this.fb.group({
      name: ["", Validators.required],
      phoneNumber: ["", Validators.required],
      address: ["", Validators.required],

    });
    /* if (this.dateOwner != null) {
      this.titleAction = "Editar";
      this.buttonAction = "Modificar";
    } */
  }

  ngOnInit(): void {
    if (this.dateOwner != null) {
      this.formOwner.patchValue({
        name: this.dateOwner.name,
        phoneNumber: this.dateOwner.phoneNumber,
        address: this.dateOwner.address,
      });
    }
  }


  saveOwner(){
    const owner: Owner = {
      name: this.formOwner.value.title,
      phoneNumber: this.formOwner.value.phoneNumber,
      address: this.formOwner.value.address,
    }
    this.inmuebleService.creatOwner(owner).subscribe(
      (res: any) => {
        if (res) {
          this.alertService.Alert("success", "Propietario creado correctamente");
          this.modalsActual.close("true");
        } else {
          this.alertService.Alert(
            "No se pudo registrar el usuario",
            "Ha ocurrido un error!"
          );
        }
      },
      (error) => {
        console.log(error);
      }
    )
  }
}
