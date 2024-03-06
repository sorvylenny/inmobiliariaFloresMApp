import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InmueblesRoutingModule } from './inmuebles-routing.module';
import { InmuebleHomeComponent } from './inmueble-home/inmueble-home.component';
import { InmuebleDetailsComponent } from './inmueble-details/inmueble-details.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InmuebleComponent } from './inmueble/inmueble.component';



@NgModule({
  declarations: [
    InmuebleHomeComponent,
    InmuebleDetailsComponent,
    InmuebleComponent
  ],
  imports: [
    CommonModule,
    InmueblesRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    InmuebleDetailsComponent
  ]
})
export class InmueblesModule { }
