import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

// containers
import { UsuariosDashboardComponent } from './containers/usuarios-dashboard/usuarios-dashboard.component';
import { UsuariosViewerComponent } from './containers/usuarios-viewer/usuarios-viewer.component';

// components
import { UsuariosCountComponent } from './components/usuarios-count/usuarios-count.component';
import { UsuariosDetailComponent } from './components/usuarios-detail/usuarios-detail.component';
import { UsuariosFormComponent } from './components/usuarios-form/usuarios-form.component';

// service
import { UsuariosDashboardService } from './usuarios-dashboard.service';

const routes: Routes = [
  {
    path: 'usuarios',
    children: [
     { path: '', component: UsuariosDashboardComponent },
     { path: ':id', component: UsuariosViewerComponent }
    ]
  }
];

@NgModule({
  declarations: [
    UsuariosDashboardComponent,
    UsuariosViewerComponent,
    UsuariosCountComponent,
    UsuariosDetailComponent,
    UsuariosFormComponent
  ],
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    UsuariosDashboardService
  ]
})
export class UsuariosDashboardModule {}
