import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/interfaces/user';
import { ModelsUserComponent } from 'src/app/shared/components/models/models-user/models-user.component';

@Component({
  selector: 'app-alluser',
  templateUrl: './alluser.component.html',
  styleUrls: ['./alluser.component.css']
})
export class AlluserComponent {
  ColumnsTable: string [] =['fullname', 'username', 'rol', 'estado', 'acciones'];
  dataInit: User[]=[];
  dataListUser = new MatTableDataSource (this.dataInit);
  @ViewChild(MatPaginator) paginatorTable! : MatPaginator;


  constructor(private dialog: MatDialog,/*
              private userService: UsersService,
              private utilityService: UtilityService */) { }

  obtenerUsers(){
 /*    this.userService.GetUsers().subscribe({
      next:(data)=>{
        if(data.status){ this.dataListUser.data = data.value}
        else{this.utilityService.Alert("No se encontro nada","Ha ocurrido un error")}
      },
      error:(e)=>{}
    }) */
  }
  ngOnInit(): void {
    this.obtenerUsers();
  }
  ngAfterViewInit(): void {
    this.dataListUser.paginator = this.paginatorTable;
  }

  appSearchTable(event: Event){
    const searchValue = (event.target as HTMLInputElement).value;
    this.dataListUser.filter = searchValue.trim().toLocaleLowerCase();
    console.log(this.dataListUser);
  }

  newUser(){
    this.dialog.open(ModelsUserComponent, {
      disableClose:true
    }).afterClosed().subscribe(res =>{
      if(res ==="true") this.obtenerUsers();
    });
  }
  editUser(user:User){
    this.dialog.open(ModelsUserComponent, {
      disableClose:true,
      data: user
    }).afterClosed().subscribe(res =>{
      if(res ==="true") this.obtenerUsers();
    });
  }

}
