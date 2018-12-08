import { Component, Input } from '@angular/core';

import { Usuario } from '../../models/usuario.interface';

@Component({
  selector: 'usuarios-count',
  template: `
    <div>
      <h3>Usuarios!</h3>
      <div>
        Total Marcados in: {{ checkedInCount() }}/{{ items?.length }}
      </div>
    </div>
  `
})
export class UsuariosCountComponent {
  @Input()
  items: Usuario[];
  checkedInCount(): number {
    if (!this.items) return;
    return this.items.filter((usuario: Usuario) => usuario.checkedIn).length;
  }
}
