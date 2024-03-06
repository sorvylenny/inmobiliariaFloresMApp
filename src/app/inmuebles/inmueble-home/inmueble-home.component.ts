import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Router } from '@angular/router';
import { Observable, map, startWith, tap } from 'rxjs';
import { DepartmentService } from 'src/app/core/services/department.service';
import { InmueblesService } from 'src/app/core/services/inmuebles.service';
import { City } from 'src/app/interfaces/city';
import { Department } from 'src/app/interfaces/department';

@Component({
  selector: 'app-inmueble-home',
  templateUrl: './inmueble-home.component.html',
  styleUrls: ['./inmueble-home.component.css']
})
export class InmuebleHomeComponent {
  searchTitle= new FormControl();
  searchDepartmentControl = new FormControl();
  searchCityControl = new FormControl();

  filteredDepartments: Observable<Department[]> | undefined;
  filteredCities: Observable<City[]> | undefined;

  private filteredCitiesList: City[]=[];

  departments: Department[] = [];
  cities: City[] = [];

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
  }

  allDepartment(){
    this.departmentService.getDepartments().subscribe(departments => {
      this.departments = departments;
      console.log(departments);

    });
  }
  onDepartmentSelected(event: MatAutocompleteSelectedEvent) {
    const selectedDepartment: Department = event.option.value;
    if (selectedDepartment.id) {
      this.allCity(selectedDepartment.id).subscribe(cities => {
        this.filteredCitiesList = cities;
        console.log(cities);
      });
    }
  }
  onDepartmentKeyUp(event: any) {
    const searchString = event.target.value.toLowerCase();
    this.filteredDepartments = this.departmentService.getDepartments().pipe(
      map(departments => departments.filter(department => department.name.toLowerCase().includes(searchString)))
      );
    }
    private _filterDepartments(value: any): Department[] {
      const filterValue = typeof value === 'string' ? value.toLowerCase() : '';
      return this.departments.filter(department => department.name.toLowerCase().includes(filterValue));
    }
    displayFnDepartments(department: Department): string {
        return department && department.name ? department.name : '';
      }

  allCity(departmentId: number): Observable<City[]> {
    console.log('ID del departamento:', departmentId);
    return this.departmentService.getCitiesByDepartment(departmentId).pipe(
      tap(cities => console.log('Ciudades recibidas:', cities))
    );
  }
  private _filteredCities(value: any): City[] {
    if (typeof value !== 'string') {
      return [];
    }
    const filterValue = value.toLowerCase();
    return this.filteredCitiesList.filter(city => city.name.toLowerCase().includes(filterValue));
  }
  displayFnCities(city: City): string {
    return city && city.name ? city.name : '';
  }/*
  onCityKeyUp(event: any) {
    const searchString = event.target.value.toLowerCase();
    this.filteredCities = this.inmueblesServices.searchCities(searchString);
  } */


 //TODO: MAQUETAR
  /* seeDetails(inmuebleId: number){
    this.router.navigate(['/inmueble', inmuebleId]);

  } */
}
