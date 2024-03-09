import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { Router } from '@angular/router';
import { Observable, map, startWith, tap } from 'rxjs';
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

  /* search(): void {
    const query = {
      title: this.searchTitle.value,
      department: this.searchDepartmentControl.value,
      city: this.searchCityControl.value,
      price: this.searchPrice.value
    };

    this.inmueblesServices.seachInmuebles(query).subscribe((inmuebles: Inmueble[]) => {
      this.propiety = inmuebles;
    });


  } */

  search(): void {
    const priceValue = this.searchPrice.value;
  if (priceValue === -1) {
    this.searchPrice.setValue(null);
  }

    const query = {
      title: this.searchTitle.value,
      department: this.searchDepartmentControl.value,
      city: this.searchCityControl.value,
      price: this.searchPrice.value
    };


    const allFieldsEmpty = Object.values(query).every(value => value === '');

    if (allFieldsEmpty) {

      this.allPropiety();
    } else {

      this.inmueblesServices.seachInmuebles(query).subscribe((inmuebles: Inmueble[]) => {
        this.propiety = inmuebles;
        this.inmueblesEncontrados = inmuebles.length > 0 ? true : false;
      });
    }
  }

  allDepartment(){
    this.departmentService.getDepartments().subscribe(departments => {
      this.departments = departments;
      this.search();
    });
  }
  /* onDepartmentSelected(event: MatAutocompleteSelectedEvent) {
    const selectedDepartment: Department = event.option.value;
    if (selectedDepartment.id) {
      this.allCity(selectedDepartment.id).subscribe(cities => {
        this.filteredCitiesList = cities;
      });
    }
  } */
  onDepartmentSelected(event: MatAutocompleteSelectedEvent): void {
    const selectedDepartment: Department = event.option.value;
    if (selectedDepartment.id) {

      this.allCity(selectedDepartment.id).subscribe(cities => {
        this.filteredCitiesList = cities;
      });
      this.searchDepartmentControl.setValue(selectedDepartment.name);
        this.search();
    }


  }


searchByDepartmentName(departmentName: string): void {

    this.searchDepartmentControl.setValue(departmentName, { emitEvent: true});


    this.search();
  }



  onDepartmentKeyUp(event: any) {
    const selectedDepartment: Department = event.option.value.toLowerCase();
  this.searchDepartmentControl.setValue(selectedDepartment);
  this.search();
  }
    private _filterDepartments(value: any): Department[] {
      const filterValue = typeof value === 'string' ? value.toLowerCase() : '';
      return this.departments.filter(department => department.name.toLowerCase().includes(filterValue));
    }
    displayFnDepartments(department: Department): string {
        return department && department.name ? department.name : '';
      }

      allCity(departmentId: number): Observable<City[]> {
        return this.departmentService.getCitiesByDepartment(departmentId);
      }

  private _filteredCities(value: any): City[] {
    if (typeof value !== 'string') {
      return [];
    }
    const filterValue = value.toLowerCase();
    this.search();
    return this.filteredCitiesList.filter(city => city.name.toLowerCase().includes(filterValue));

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
}
