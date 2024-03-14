import { Component, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { Observable, map, of, startWith } from "rxjs";
import { InmueblesService } from "src/app/core/services/inmuebles.service";
import { Inmueble } from "src/app/interfaces/inmueble";
import { Owner } from "src/app/interfaces/owner";
import { AlertService } from "src/app/shared/alert.service";
import { ModelsownerComponent } from "../modelsowner/modelsowner.component";

interface Departamento {
  nombre: string;
  codigo: string;
}


@Component({
  selector: "app-models-inmuebles",
  templateUrl: "./models-inmuebles.component.html",
  styleUrls: ["./models-inmuebles.component.css"]
})
export class ModelsInmueblesComponent {
  formInmueble: FormGroup;
  titleAction: string = "Agregar Inmueble";
  buttonAction: string = "Guardar";
  owners: Owner[] = [];
  ownerInputClicked: boolean = false;
  filteredOwners: Observable<Owner[]> | undefined;
  estadoDepartamentos: { [key: string]: boolean } = {};

  departamentos: Departamento[] = [
  { nombre: 'Amazonas', codigo: 'AMA' },
  { nombre: 'Antioquia', codigo: 'ANT' },
  { nombre: 'Arauca', codigo: 'ARA' },
  { nombre: 'Atlántico', codigo: 'ATL' },
  { nombre: 'Bogotá, D.C.', codigo: 'BOG' },
  { nombre: 'Bolívar', codigo: 'BOL' },
  { nombre: 'Boyacá', codigo: 'BOY' },
  { nombre: 'Caldas', codigo: 'CAL' },
  { nombre: 'Caquetá', codigo: 'CAQ' },
  { nombre: 'Casanare', codigo: 'CAS' },
  { nombre: 'Cauca', codigo: 'CAU' },
  { nombre: 'Cesar', codigo: 'CES' },
  { nombre: 'Chocó', codigo: 'CHO' },
  { nombre: 'Córdoba', codigo: 'COR' },
  { nombre: 'Cundinamarca', codigo: 'CUN' },
  { nombre: 'Guainía', codigo: 'GUA' },
  { nombre: 'Guaviare', codigo: 'GUV' },
  { nombre: 'Huila', codigo: 'HUI' },
  { nombre: 'La Guajira', codigo: 'LAG' },
  { nombre: 'Magdalena', codigo: 'MAG' },
  { nombre: 'Meta', codigo: 'MET' },
  { nombre: 'Nariño', codigo: 'NAR' },
  { nombre: 'Norte de Santander', codigo: 'NSA' },
  { nombre: 'Putumayo', codigo: 'PUT' },
  { nombre: 'Quindío', codigo: 'QUI' },
  { nombre: 'Risaralda', codigo: 'RIS' },
  { nombre: 'San Andrés', codigo: 'SAN' },
  { nombre: 'Santander', codigo: 'SAN' },
  { nombre: 'Sucre', codigo: 'SUC' },
  { nombre: 'Tolima', codigo: 'TOL' },
  { nombre: 'Valle del Cauca', codigo: 'VAC' },
  { nombre: 'Vaupés', codigo: 'VAU' },
  { nombre: 'Vichada', codigo: 'VIC' }
];
  constructor(private dialog: MatDialog,
    private modalsActual: MatDialogRef<ModelsInmueblesComponent>,
    @Inject(MAT_DIALOG_DATA) public dateInmueble: Inmueble,
    private fb: FormBuilder,
    private inmuebleService: InmueblesService,
    private alertService: AlertService
  ) {
    this.formInmueble = this.fb.group({
      ownerId: ["", Validators.required], // Aquí asignamos el ID del propietario obtenido anteriormente
      numberRef: ["", Validators.required],
      title: ["", Validators.required],
      address: ["", Validators.required],
      department: ["", Validators.required],
      city: ["", Validators.required],
      description: ["", Validators.required],
      latitude: [0, Validators.required],
      longitude: [0, Validators.required],
      bathrooms: [0, Validators.required],
      bedrooms: [0, Validators.required],
      closet: [0, Validators.required],
      price: [0, Validators.required]
    });
    if (this.dateInmueble != null) {
      this.titleAction = "Editar";
      this.buttonAction = "Modificar";
    }
  }
  ngOnInit(): void {
    if (this.dateInmueble != null) {
      this.formInmueble.patchValue({
        title: this.dateInmueble.title,
        address: this.dateInmueble.address,
        department: this.dateInmueble.department,
        city: this.dateInmueble.city,
        description: this.dateInmueble.description,
        latitude: this.dateInmueble.latitude,
        longitude: this.dateInmueble.longitude,
        bathrooms: this.dateInmueble.bathrooms,
        bedrooms: this.dateInmueble.bedrooms,
        closet: this.dateInmueble.closet,
        price: this.dateInmueble.price
      });
    }
    this.getAllOwner();
  }

  saveEditInmueble() {

    const inmueble: Inmueble = {
      ownerId: this.formInmueble.value.ownerId,
      numberRef: this.formInmueble.value.numberRef,
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
    };

    const id: string | any = {
      _id: this.dateInmueble ? this.dateInmueble._id : ""
    };
    if (this.dateInmueble == null) {
      this.inmuebleService.newInmueble(inmueble).subscribe({
        next: (res: any) => {
          if (res) {
            this.alertService.Alert("success", "Inmueble creado correctamente");
            this.modalsActual.close("true");
          } else {
            this.alertService.Alert(
              "No se pudo registrar el usuario",
              "Ha ocurrido un error!"
            );
          }
        },
        error: error => {
          console.log(error);
        }
      });
    } else {
      console.log(id);
      console.log(inmueble);
      this.inmuebleService.updateInmuebleById(id, inmueble).subscribe(
        res => {
          if (res) {
            this.alertService.Alert(
              "success",
              "Inmueble editado correctamente"
            );
            this.modalsActual.close("true");
          } else {
            this.alertService.Alert(
              "No se pudo editar el inmueble",
              "Ha ocurrido un error!"
            );
          }
        },
        error => {
          console.error("Error al editar el inmueble:", error);
          this.alertService.Alert(
            "Error al editar el inmueble",
            "Ha ocurrido un error"
          );
        }
      );
    }
  }
  getAllOwner() {
    this.inmuebleService.onwerInmuebles().subscribe((owners: Owner[]) => {
      this.owners = owners;
      console.log(this.owners)
      this.filteredOwners = this.formInmueble.controls['ownerId'].valueChanges.pipe(
        startWith(''),
        map(value => this._filterOwners(value))
      );
    });
  }

  displayFn(owner: Owner): string {
    return owner && owner.name ? owner.name : '';
  }

  private _filterOwners(value: string | Owner): Owner[] {
    const filterValue = (value instanceof Object) ? value.name.toLowerCase() : value.toLowerCase();
    return this.owners.filter(owner => owner.name.toLowerCase().includes(filterValue));
  }


  openCreateOwnerDialog(): void {
    const dialogRef = this.dialog.open(ModelsownerComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result: Owner | undefined) => {
      if (result) {

        this.owners.push(result);

        this.formInmueble.patchValue({ ownerId: result._id });
      }
    });
  }
/*   generarNumeroReferencia(departamento: string): string | null {
    const departamentoEncontrado = this.departamentos.find(dep => dep.nombre.toUpperCase() === departamento.toUpperCase());
    if (!departamentoEncontrado) return null;


    if (!this.estadoDepartamentos[departamentoEncontrado.codigo]) {

        this.estadoDepartamentos[departamentoEncontrado.codigo] = true;
        return `${departamentoEncontrado.codigo}-001`;
    }


    const numeroReferencia = Math.floor(Math.random() * 998) + 2;


    const numeroReferenciaFormateado = numeroReferencia.toString().padStart(3, '0');


    return `${departamentoEncontrado.codigo}-${numeroReferenciaFormateado}`;
}


generarYMostrarNumeroReferencia(departamento: string) {
    const numeroReferencia = this.generarNumeroReferencia(departamento);
    if (numeroReferencia) {
        console.log('Número de referencia generado:', numeroReferencia);
    } else {
        console.log('Departamento no válido');
    }
}
 */

}

