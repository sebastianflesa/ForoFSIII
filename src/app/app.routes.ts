import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './usuarios/listado/usuarios.component';
import { CrearComponent} from './usuarios/crear/crear.component';


export const routes: Routes = [
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [{
        path: 'login', component: LoginComponent
      }
    ]
  },
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    children: [{
      path: '', component: DashboardComponent, canActivate: [AuthGuard]
    }],

  },
  {
    path: 'perfil',
    component: DashboardLayoutComponent,
    children: [{
      path: '', component: PerfilComponent, canActivate: [AuthGuard]
    }],

  },
  {
    path: 'usuarios',
    component: DashboardLayoutComponent,
    children: [{
      path: '', component: UsuariosComponent, canActivate: [AuthGuard],
    },
    {
      path: 'crear', component: CrearComponent, canActivate: [AuthGuard],
    }
  ],

  },
  {
    path: '**',
    component: HomeComponent
  }
];

/*
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];
*/