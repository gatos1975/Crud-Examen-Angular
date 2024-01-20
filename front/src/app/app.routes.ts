import { Routes } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { EmpleadosComponent } from './views/empleados/empleados.component';
import { PageNotFoundComponentComponent } from './page-not-found-component/page-not-found-component.component';
import { NuevoEmpleadoComponent  } from './views/empleados/nuevo-empleado/nuevo-empleado.component';
import { ProyectosComponent } from './views/proyectos/proyectos.component';
import { NuevoProyectoComponent } from './views/proyectos/nuevo-proyecto/nuevo-proyecto.component';
export const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  { path: 'empleados', component: EmpleadosComponent },
  {
    path: 'nuevo-empleado',
    component: NuevoEmpleadoComponent,
  },
  {
    path: 'editar-empleado/:id',
    component: NuevoEmpleadoComponent,
  },
  {
    path: 'proyectos',
    component: ProyectosComponent,
  },
  {
    path: 'nuevo-proyecto',
    component: NuevoProyectoComponent,
  },
  {
    path: 'editar-proyecto/:id',
    component: NuevoProyectoComponent,
  },


  { path: 'login', component: LoginComponent },
  { path: '**', component: PageNotFoundComponentComponent },
];
