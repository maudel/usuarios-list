import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { UsuariosDashboardModule } from './usuarios-dashboard/usuarios-dashboard.module';

import { HomeComponent } from './home.component';
import { NotFoundComponent } from './not-found.component';

import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forRoot(routes),
    UsuariosDashboardModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
