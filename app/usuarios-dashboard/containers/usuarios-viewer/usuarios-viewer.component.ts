import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { UsuariosDashboardService } from '../../usuarios-dashboard.service';

import { Usuario } from '../../models/usuario.interface';

@Component({
  selector: 'usuarios-viewer',
  styleUrls: ['usuarios-viewer.component.scss'],
  template: `
    <div>
      <usuarios-form
        [detail]="usuario"
        (update)="onUpdatePassenger($event)">
      </usuarios-form>
    </div>
  `
})
export class UsuariosViewerComponent implements OnInit {
  usuario: Usuario;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private usuarioService: UsuariosDashboardService
  ) {}
  ngOnInit() {
    this.route.params
      .switchMap((data: Usuario) => this.usuarioService.getUsuario(data.id))
      .subscribe((data: Usuario) => this.usuario = data);
  }
  onUpdatePassenger(event: Usuario) {
    this.usuarioService
      .updatePassenger(event)
      .subscribe((data: Usuario) => {
        this.usuario = Object.assign({}, this.usuario, event);
      });
  }
}
