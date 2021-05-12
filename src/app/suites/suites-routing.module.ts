import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SuitesComponent } from './containers/suites.component';

const routes: Routes = [
  { path: '', component: SuitesComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class SuitesRoutingModule {}
