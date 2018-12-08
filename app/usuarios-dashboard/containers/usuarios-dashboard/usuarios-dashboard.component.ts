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
      <div *ngFor="let usuario of usuarios;">
        {{ usuario.fullname }}
      </div>
      <usuarios-detail
        *ngFor="let usuario of usuarios;"
        [detail]="usuario"
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
      .updateUsuario(event)
      .subscribe((data: Usuario) => {
        this.usuarios = this.usuarios.map((usuario: Usuario) => {
          if (usuario.id === event.id) {
            usuario = Object.assign({}, usuario, event);
          }
          return usuario;
        });
      });
  }
  handleRemove(event: Usuario) {
    this.usuariosService
      .removeUsuario(event)
      .subscribe((data: Usuario) => {
        this.usuarios = this.usuarios.filter((usuario: Usuario) => {
          return usuario.id !== event.id;
        });
      });
  }
}
