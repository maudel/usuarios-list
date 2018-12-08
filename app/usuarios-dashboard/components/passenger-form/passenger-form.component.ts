import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Usuario } from '../../models/usuario.interface';
import { Detalle } from '../../models/detalle.interface';

@Component({
  selector: 'usuario-form',
  styleUrls: ['usuario-form.component.scss'],
  template: `
    <form (ngSubmit)="handleSubmit(form.value, form.valid)" #form="ngForm" novalidate>

      <div>
        Usuario name:
        <input
          type="text"
          name="fullname"
          required
          #fullname="ngModel"
          [ngModel]="detail?.fullname">
        <div *ngIf="fullname.errors?.required && fullname.dirty" class="error">
          El nombre del Usuario es necesario
        </div>
      </div>

      <div>
        usuario ID:
        <input
          type="number"
          name="id"
          required
          #id="ngModel"
          [ngModel]="detail?.id">
        <div *ngIf="id.errors?.required && id.dirty" class="error">
          usuario ID is required
        </div>
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            name="checkedIn"
            [ngModel]="detail?.checkedIn"
            (ngModelChange)="toggleCheckIn($event)">
        </label>
      </div>

      <div *ngIf="form.value.checkedIn">
        Check in date:
        <input
          type="number"
          name="checkInDate"
          [ngModel]="detail?.checkInDate">
      </div>

      <div>
        Luggage:
        <select
          name="baggage"
          [ngModel]="detail?.baggage">
          <option
            *ngFor="let item of baggage"
            [value]="item.key"
            [selected]="item.key === detail?.baggage">
            {{ item.value }}
          </option>
        </select>
      </div>

      <button type="submit" [disabled]="form.invalid">
        Actualizar
      </button>

    </form>
  `
})
export class UsuarioFormComponent {

  @Input()
  detail: Usuario;

  @Output()
  update: EventEmitter<Usuario> = new EventEmitter<Usuario>();

  baggage: Detalle[] = [{
    key: 'none',
    value: 'No baggage'
  },{
    key: 'hand-only',
    value: 'Hand baggage'
  },{
    key: 'hold-only',
    value: 'Hold baggage'
  },{
    key: 'hand-hold',
    value: 'Hand and hold baggage'
  }];

  toggleCheckIn(checkedIn: boolean) {
    if (checkedIn) {
      this.detail.checkInDate = Date.now();
    }
  }

  handleSubmit(usuario: Usuario, isValid: boolean) {
    if (isValid) {
      this.update.emit(usuario);
    }
  }

}
