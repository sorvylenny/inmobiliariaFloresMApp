import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivateFn } from '@angular/router';
import { InmuebleHomeComponent } from './inmueble-home/inmueble-home.component';
import { InmuebleDetailsComponent } from './inmueble-details/inmueble-details.component';
import { InmuebleComponent } from './inmueble/inmueble.component';
import { DashboardComponent } from './dashboard/dashboard.component';



const routes: Routes = [
  {path: '', component: InmuebleHomeComponent},
  {path:'dashboard', component: DashboardComponent},
  {path: 'propiedades', component: InmuebleComponent},
  {path:'inmueble/:id', component: InmuebleDetailsComponent},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InmueblesRoutingModule { }
