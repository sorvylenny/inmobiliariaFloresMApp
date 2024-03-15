import { Component, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { Observable, filter, map, of, startWith, switchMap } from "rxjs";
import { InmueblesService } from "src/app/core/services/inmuebles.service";
import { Inmueble } from "src/app/interfaces/inmueble";
import { Owner } from "src/app/interfaces/owner";
import { AlertService } from "src/app/shared/alert.service";
import { ModelsownerComponent } from "../modelsowner/modelsowner.component";
import { DepartmentService } from "src/app/core/services/department.service";
import { Department } from "src/app/interfaces/department";
import { City } from "src/app/interfaces/city";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";

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
  departments: Department[] = [];
  cities: City[]=[];
  ownerInputClicked: boolean = false;
  filteredDepartments: Observable<Department[]> | undefined;
  filteredCities: Observable<City[]> | undefined;
  filteredOwners: Observable<Owner[]> | undefined;
  private filteredCitiesList: City[]=[];


  constructor(private dialog: MatDialog,
    private modalsActual: MatDialogRef<ModelsInmueblesComponent>,
    @Inject(MAT_DIALOG_DATA) public dateInmueble: Inmueble,
    private fb: FormBuilder,
    private inmuebleService: InmueblesService,
    private departmentService: DepartmentService,
    private alertService: AlertService
  ) {
    this.formInmueble = this.fb.group({
      ownerId: ["", Validators.required],
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
    this.filteredDepartments = this.formInmueble.controls['department'].valueChanges.pipe(
      startWith(''),
      map(value => this._filterDepartments(value))
    );

    this.loadDepartments();

    this.formInmueble.controls['department'].valueChanges.subscribe(selectedCity => {
      if (selectedCity && selectedCity.departmentId) {
        this.loadCities(selectedCity.departmentId).subscribe(cities => {
          this.filteredCitiesList = cities;
          console.log(cities);
        });
      }
    });

    this.filteredCities = this.formInmueble.controls['city'].valueChanges.pipe(
      startWith(''),
      map(value => this._filteredCities(value))
    );

 }

  saveEditInmueble() {

    const inmueble: Inmueble = {
      ownerId: this.formInmueble.value.ownerId,
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
  loadDepartments() {
    this.departmentService.getDepartments().subscribe(departments => {
      this.departments = departments;
  });
  }
  displayFnDepartments(department: Department): string {
    return department && department.name ? department.name : '';
  }

  displayFnCities(city: City): string {
    return city && city.name ? city.name : '';
  }

  private _filterDepartments(value: string|Department): Department[] {
    const filterValue = typeof value === 'string' ? value.toLowerCase() : '';
    return this.departments.filter(department => department.name.toLowerCase().includes(filterValue));
  }

  private _filteredCities(value: any): City[] {
    const filterValue = typeof value === 'string' ? value.toLowerCase() :'';
    return this.cities.filter(city => city.name.toLowerCase().includes(filterValue));
  }

  loadCities(departmentId: number): Observable<City[]> {
    return this.departmentService.getCitiesByDepartment(departmentId);
  }

  onDepartmentSelected(event: MatAutocompleteSelectedEvent): void {
    const selectedDepartment: Department = event.option.value;
    if (selectedDepartment && selectedDepartment.id) {
      this.formInmueble.patchValue({ department: selectedDepartment });
      this.loadCities(selectedDepartment.id).subscribe(cities => {
        this.filteredCities = of(cities);
        console.log(cities);
      });
    }
  }

}



