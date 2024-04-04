import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { CityResponse } from 'src/app/interfaces/cityresponse';
import { DepartmentResponse } from 'src/app/interfaces/departmentresponse';
import { Inmueble } from 'src/app/interfaces/inmueble';
import { Owner } from 'src/app/interfaces/owner';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InmueblesService {
  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient){}

  allInmuebles(): Observable<Inmueble[]> {
    const url = `${this.baseUrl}getAll`;
    console.log(url)
    return this.http.get<Inmueble[]>(url);
  }
  seachInmuebles(query: { title?: string; department?: string; city?: string; price?: string; }): Observable<Inmueble[]> {
    const url = `${this.baseUrl}search`;
    const params = new HttpParams()
      .set('title', query.title ? query.title : '')
      .set('department', query.department ? query.department : '')
      .set('city', query.city ? query.city : '')
      .set('price', query.price ? query.price : '');
    return this.http.get<Inmueble[]>(url, { params });
  }

  getInmuebleById(id: string): Observable<Inmueble> {
    const url = `${this.baseUrl}seemore/${id}`;
    return this.http.get<Inmueble>(url);
  }

  onwerInmuebles(): Observable<Owner[]> {
    const url = `${this.baseUrl}allOwner`;
    return this.http.get<Owner[]>(url);
  }

  creatOwner(owner: Owner): Observable<Owner> {
    const url = `${this.baseUrl}creatOwner`;
    return this.http.post<Owner>(url, owner);
  }/*
  getInmuebleByOwner(id: string): Observable<Inmueble[]> {
    const url = `${this.baseUrl}owner/${id}`;
    return this.http.get<Inmueble[]>(url);
  } */

  newInmueble(inmueble: Inmueble): Observable<Inmueble> {
    const url = `${this.baseUrl}create`;
    return this.http.post<Inmueble>(url, inmueble);
  }

  updateInmuebleById(id: string | any, inmueble: Inmueble): Observable<Inmueble> {
    const propietyId = id._id
    const url = `${this.baseUrl}update/${propietyId}`;
    console.log(url)
    return this.http.put<Inmueble>(url, inmueble).pipe(
      tap(updateInmueble=>{
        updateInmueble.updatedAt = new Date();
      })
    );
  }

  deleteInmuebleById(id: string): Observable<Inmueble> {
    const url = `${this.baseUrl}delete/${id}`;
    return this.http.delete<Inmueble>(url);
  }
/* dashboardServices */
  /* dashBoardDepartment():Observable<Dashboard[]>{
    const url = `${this.baseUrl}departmentMoreRegistered`;
    console.log(url)
    return this.http.get<Dashboard[]>(url);
  }

  dashBoardCities():Observable<Dashboard[]>{
    const url = `${this.baseUrl}cityMoreRegistered`;
    console.log(url)
    return this.http.get<Dashboard[]>(url);
  } */
  dashBoardDepartment(): Observable<DepartmentResponse> {
    const url = `${this.baseUrl}departmentMoreRegistered`;
    console.log(url)
    return this.http.get<DepartmentResponse>(url);
  }

  dashBoardCities(): Observable<CityResponse> {
    const url = `${this.baseUrl}cityMoreRegistered`;
    console.log(url)
    return this.http.get<CityResponse>(url);
  }

}

