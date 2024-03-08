import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from 'src/app/interfaces/user';
import { AlertService } from 'src/app/shared/alert.service';
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


  constructor(private dialog: MatDialog,
              private authService: AuthService,
              private alertService: AlertService ) { }

  /* obtenerUsers(){
   this.authService.getAllUser().subscribe({
      next:(data)=>{
        if(data.status){ this.dataListUser.data = data.value}
        else{this.alertService.Alert("No se encontro nada","Ha ocurrido un error")}
      },
      error:(e)=>{}
    })
  } */
  obtenerUsers() {
    this.authService.getAllUser().subscribe({
      next: (data: User[]) => {
        // Verificar si se recibió una respuesta válida
        if (data && data.length > 0) {
          this.dataListUser.data = data;
        } else {
          this.alertService.Alert("No se encontraron usuarios", "Ha ocurrido un error");
        }
      },
      error: (error) => {
        console.error("Error al obtener usuarios:", error);
        this.alertService.Alert("Error al obtener usuarios", "Ha ocurrido un error");
      }
    });
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
    console.log(user)
    this.dialog.open(ModelsUserComponent, {
      disableClose:true,
      data: user
    }).afterClosed().subscribe(res =>{
      if(res ==="true") this.obtenerUsers();
    });
  }

}
