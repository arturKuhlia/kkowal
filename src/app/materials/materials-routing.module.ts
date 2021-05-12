import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaterialsComponent } from './containers/materials.component';

const routes: Routes = [
  { path: '', component: MaterialsComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class MaterialsRoutingModule {}
