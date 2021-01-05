import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import {LoginComponent} from './login/login.component';
import {LoggedInGuard} from './guards/logged.guard';
import {AuthGuardService} from './guards/auth-guard.guard';
import {ReparationpublicComponent} from './pages/reparationpublic/reparationpublic.component';

export const AppRoutes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [LoggedInGuard]},
  { path: 'parcinformatique', component: ReparationpublicComponent, canActivate: [LoggedInGuard]},
  { path: '', redirectTo: 'tableau-de-bord', pathMatch: 'full', canActivate: [AuthGuardService]},
  { path: '', component: AdminLayoutComponent, canActivate: [AuthGuardService], children:
      [{path: '', loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'}]},
  { path: '**',  redirectTo: 'tableau-de-bord', canActivate: [AuthGuardService]}
]
