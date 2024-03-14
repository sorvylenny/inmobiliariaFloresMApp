import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlluserComponent } from './alluser/alluser.component';
import { UserdetailsComponent } from './userdetails/userdetails.component';

const routes: Routes = [
  {path: 'allUser', component: AlluserComponent},
  {path: 'details/:id', component: UserdetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
