import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { RegisterComponent } from './_auth/components/register/register.component';
import { HomeComponent } from './_core/home/home.component';
import { LoginComponent } from './_auth/components/login/login.component';
import { AuthGuard } from './_auth/guards/auth.guard';
import { MainComponent } from './_core/main/main.component';
import { PageNotFoundComponent } from './_core/page-not-found/page-not-found.component';
import { AdminComponent } from './_admin/containers/admin/admin.component';
import { AdminGuard } from './_admin/guard/admin.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, children: [
    { path: '', component: MainComponent},
    { path: 'projects', loadChildren: './projects/projects.module#ProjectsModule', canActivate: [AuthGuard]},
    { path: 'customers', loadChildren: './customers/customers.module#CustomersModule', canActivate: [AuthGuard]},
    { path: 'suites', loadChildren: './suites/suites.module#SuitesModule', canActivate: [AuthGuard]},
    { path: 'materials', loadChildren: './materials/materials.module#MaterialsModule', canActivate: [AuthGuard]},
    { path: 'options', loadChildren: './options/options.module#OptionsModule', canActivate: [AuthGuard]},
    { path: 'selections', loadChildren: './selections/selections.module#SelectionsModule', canActivate: [AuthGuard]},
 
    { path: 'profile', loadChildren: './profile/profile.module#ProfileModule', canActivate: [AuthGuard] },
    { path: 'charts', loadChildren: './charts/charts.module#ChartsDataModule', canActivate: [AuthGuard] },
    { path: 'admin-panel', component: AdminComponent, canActivate: [AdminGuard]}
  ]},
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
