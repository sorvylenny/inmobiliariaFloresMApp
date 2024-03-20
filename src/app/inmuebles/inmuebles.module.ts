import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InmueblesRoutingModule } from './inmuebles-routing.module';
import { InmuebleHomeComponent } from './inmueble-home/inmueble-home.component';
import { InmuebleDetailsComponent } from './inmueble-details/inmueble-details.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InmuebleComponent } from './inmueble/inmueble.component';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';



@NgModule({
  declarations: [
    InmuebleHomeComponent,
    InmuebleDetailsComponent,
    InmuebleComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    InmueblesRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  exports:[
    InmuebleDetailsComponent
  ]
})
export class InmueblesModule { }
