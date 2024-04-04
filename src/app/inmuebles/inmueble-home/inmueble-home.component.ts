import { Component} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Router } from '@angular/router';
import { Observable, map, of, startWith } from 'rxjs';
import { DepartmentService } from 'src/app/core/services/department.service';
import { InmueblesService } from 'src/app/core/services/inmuebles.service';
import { City } from 'src/app/interfaces/city';
import { Department } from 'src/app/interfaces/department';
import { Inmueble } from 'src/app/interfaces/inmueble';

@Component({
  selector: 'app-inmueble-home',
  templateUrl: './inmueble-home.component.html',
  styleUrls: ['./inmueble-home.component.css']
})
export class InmuebleHomeComponent {
  searchTitle= new FormControl();
  searchDepartmentControl = new FormControl();
  searchCityControl = new FormControl();
  searchPrice = new FormControl();
  filteredDepartments: Observable<Department[]> | undefined;
  filteredCities: Observable<City[]> | undefined;

  private filteredCitiesList: City[]=[];
  departments: Department[] = [];
  cities: City[] = [];
  propiety: Inmueble[]=[];
  selectedDepartment: Department | null = null;
  inmueblesEncontrados: boolean = false;

  constructor(private router: Router, private inmueblesServices: InmueblesService, private departmentService: DepartmentService) { }

  ngOnInit() {
    this.filteredDepartments = this.searchDepartmentControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterDepartments(value))
    );

    this.allDepartment();

    this.searchCityControl.valueChanges.subscribe(selectedCity => {
      if (selectedCity && selectedCity.departmentId) {
        this.allCity(selectedCity.departmentId).subscribe(cities => {
          this.filteredCitiesList = cities;
          console.log(cities);
        });
      }
    });

    this.filteredCities = this.searchCityControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filteredCities(value))
    );
    this.allPropiety();

  }
  search(): void {
    const priceValue = this.searchPrice.value;
  if (priceValue === -1) {
    this.searchPrice.setValue(null);
  }

  const query = {
    title: this.searchTitle.value,
    department: this.searchDepartmentControl.value ? this.searchDepartmentControl.value.name : null,
    city: this.searchCityControl.value ? this.searchCityControl.value.name : null,
    price: this.searchPrice.value
  };
  console.log(query);


    const allFieldsEmpty = Object.values(query).every(value => value === '');

    if (allFieldsEmpty) {

      this.allPropiety();
    } else {

      this.inmueblesServices.seachInmuebles(query).subscribe((inmuebles: Inmueble[]) => {
        this.propiety = inmuebles;
        console.log("inmuebles:", inmuebles)
        this.inmueblesEncontrados = inmuebles.length > 0 ? true : false;
      });
    }
  }

  allDepartment(){
    this.departmentService.getDepartments().subscribe(departments => {
      this.departments = departments;
    });
  }
  onDepartmentSelected(event: MatAutocompleteSelectedEvent): void {
    const selectedDepartment: Department = event.option.value;
    if (selectedDepartment && selectedDepartment.id) {
      // Extraer el id y el nombre del departamento seleccionado
      const { id, name } = selectedDepartment;
      // Asignar el id y el nombre al FormControl searchDepartmentControl
      this.searchDepartmentControl.patchValue({ id, name });

      this.allCity(selectedDepartment.id).subscribe(cities => {
        this.filteredCities = of(cities);
        console.log(cities);
      });
      this.search()

    }
  }
    private _filterDepartments(value: any): Department[] {
      const filterValue = typeof value === 'string' ? value.toLowerCase() : '';
      console.log('filterDepatrt', this.departments)
      return this.departments.filter(department => department.name.toLowerCase().includes(filterValue));
    }
    displayFnDepartments(department: Department): string {
        return department && department.name ? department.name : '';
      }

      allCity(departmentId: number): Observable<City[]> {
        return this.departmentService.getCitiesByDepartment(departmentId);
      }

   private _filteredCities(value: any): City[] {
     const filterValue = typeof value === 'string' ? value.toLowerCase() :'';
     console.log('filterCity', this.cities)
     return this.cities.filter(city => city.name.toLowerCase().includes(filterValue));
   }
  displayFnCities(city: City): string {
    return city && city.name ? city.name : '';
  }/*
  onCityKeyUp(event: any) {
    const searchString = event.target.value.toLowerCase();
    this.filteredCities = this.inmueblesServices.searchCities(searchString);
  } */

  allPropiety(){
    this.inmueblesServices.allInmuebles().subscribe(inmuebles => {
      this.propiety = inmuebles;
    });
  }
  propietyDetails(id: string){
    this.router.navigate(['/inmueble', id]);

  }
  clear() {
    this.searchTitle.setValue('');
    this.searchDepartmentControl.setValue('');
    this.searchCityControl.setValue('');
    this.searchPrice.setValue(null);
    this.allPropiety();
  }
}
