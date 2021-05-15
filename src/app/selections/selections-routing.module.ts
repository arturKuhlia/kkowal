import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SelectionsComponent } from './containers/selections.component';

const routes: Routes = [
  { path: '', component: SelectionsComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class SelectionsRoutingModule {}
