import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Login } from '../interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  constructor(private _snackBar: MatSnackBar) { }

  Alert(msg: string, type:string){
    this._snackBar.open(msg, type,{
      horizontalPosition: "end",
      verticalPosition: "top",
      duration:3000
    });
  }

  SaveSesionUser(userLogin: Login){
    localStorage.setItem("username", JSON.stringify(userLogin));
  }

  GetSesionUser(){
    const dataString = localStorage.getItem("username");
    const user = JSON.parse(dataString!);
    return user;
  }

  DeleteSEsionUser(){
    localStorage.removeItem('user');
  }

}
