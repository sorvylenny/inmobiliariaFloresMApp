import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FooterComponent } from './components/footer/footer.component';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { ModelsInmueblesComponent } from './components/models/models-inmuebles/models-inmuebles.component';
import { ModelsUserComponent } from './components/models/models-user/models-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SmallmapComponent } from './components/smallmap/smallmap.component';
import { AboutComponent } from './components/models/about/about.component';
import { PrivacypolicyComponent } from './components/models/privacypolicy/privacypolicy.component';



@NgModule({
  declarations: [
    FooterComponent,
    ModelsInmueblesComponent,
    ModelsUserComponent,
    NavbarComponent,
    SmallmapComponent,
    AboutComponent,
    PrivacypolicyComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    FooterComponent,
    ModelsInmueblesComponent,
    ModelsUserComponent,
    NavbarComponent,
    SmallmapComponent
   ]
})
export class SharedModule { }