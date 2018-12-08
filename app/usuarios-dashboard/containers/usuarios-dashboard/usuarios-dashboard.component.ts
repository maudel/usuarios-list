import { Component, OnInit } from '@angular/core';

import { UsuariosDashboardService } from '../../usuarios-dashboard.service';

import { Usuario } from '../../models/usuario.interface';

@Component({
  selector: 'usuarios-dashboard',
  styleUrls: ['usuarios-dashboard.component.scss'],
  template: `
    <div>
      <usuarios-count
        [items]="usuarios">
      </usuarios-count>
      <div *ngFor="let passenger of usuarios;">
        {{ passenger.fullname }}
      </div>
      <usuarios-detail
        *ngFor="let passenger of usuarios;"
        [detail]="passenger"
        (edit)="handleEdit($event)"
        (remove)="handleRemove($event)">
      </usuarios-detail>
    </div>
  `
})
export class UsuariosDashboardComponent implements OnInit {
  usuarios: Usuario[];
  constructor(private usuariosService: UsuariosDashboardService) {}
  ngOnInit() {
     this.usuariosService
      .getUsuarios()
      .subscribe((data: Usuario[]) => this.usuarios = data);
  }
  handleEdit(event: Usuario) {
    this.usuariosService
      .updatePassenger(event)
      .subscribe((data: Usuario) => {
        this.usuarios = this.usuarios.map((passenger: Usuario) => {
          if (passenger.id === event.id) {
            passenger = Object.assign({}, passenger, event);
          }
          return passenger;
        });
      });
  }
  handleRemove(event: Usuario) {
    this.usuariosService
      .removePassenger(event)
      .subscribe((data: Usuario) => {
        this.usuarios = this.usuarios.filter((passenger: Usuario) => {
          return passenger.id !== event.id;
        });
      });
  }
}
