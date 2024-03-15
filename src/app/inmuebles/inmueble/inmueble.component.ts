import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { InmueblesService } from 'src/app/core/services/inmuebles.service';
import { Inmueble } from 'src/app/interfaces/inmueble';
import { AlertService } from 'src/app/shared/alert.service';
import { ModelsInmueblesComponent } from 'src/app/shared/components/models/models-inmuebles/models-inmuebles.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inmueble',
  templateUrl: './inmueble.component.html',
  styleUrls: ['./inmueble.component.css']
})
export class InmuebleComponent {

  ColumnsTable: string [] =['title', 'address', 'department', 'city', 'price','bathrooms','bedrooms', 'closet', 'actions'];
  dataInit:   Inmueble[]=[];
  dataListProperty = new MatTableDataSource (this.dataInit);
  @ViewChild(MatPaginator) paginatorTable! : MatPaginator;


  constructor(private dialog: MatDialog,
              private inmuebleService: InmueblesService,
              private alertService: AlertService ) { }
  getProperties() {
    this.inmuebleService.allInmuebles().subscribe({
      next: (data: Inmueble[]) => {
        // Verificar si se recibió una respuesta válida
        if (data && data.length > 0) {
          this.dataListProperty.data = data;
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
    this.getProperties();
  }
  ngAfterViewInit(): void {
    this.dataListProperty.paginator = this.paginatorTable;
  }

  appSearchTable(event: Event){
    const searchValue = (event.target as HTMLInputElement).value;
    this.dataListProperty.filter = searchValue.trim().toLocaleLowerCase();
    console.log(this.dataListProperty);
  }

  newPropiety(){
    this.dialog.open(ModelsInmueblesComponent, {
      disableClose:true
    }).afterClosed().subscribe(res =>{
      if(res ==="true") this.getProperties();
    });
  }
  editPropiety(inmuebles:Inmueble){
    console.log(inmuebles)
    this.dialog.open(ModelsInmueblesComponent, {
      disableClose:true,
      data: inmuebles
    }).afterClosed().subscribe(res =>{
      if(res ==="true") this.getProperties();
    });
  }

  deleteInmueble(propiety: Inmueble) {
    Swal.fire({
      title: '¿Estás seguro de eliminar la propiedad?',
      text: propiety.title,
      icon: 'warning',
      confirmButtonColor: '#949CDF',
      confirmButtonText: "Sí, eliminar",
      showCancelButton: true,
      cancelButtonText: "No, Regresar",
      cancelButtonColor: '#C0392B'
    }).then((result) => {
      if (result.isConfirmed) {
        this.inmuebleService.deleteInmuebleById(propiety._id!).subscribe({
          next: (res) => {
            if (res) {
              this.alertService.Alert("El Inmueble fue eliminado", "Great!");
              this.getProperties();
            } else {
              this.alertService.Alert("No se pudo eliminar el Usuario", "¡Error!");
            }
          },
          error: () => { }
        });
      }
    });
  }


}
