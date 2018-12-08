import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';

import { Usuario } from '../../models/usuario.interface';

@Component({
  selector: 'usuarios-detail',
  styleUrls: ['usuarios-detail.component.scss'],
  template: `
    <div>
      <span class="status" [class.checked-in]="detail.checkedIn"></span>
      <div *ngIf="editing">
        <input
          type="text"
          [value]="detail.fullname"
          (input)="onNameChange(name.value)"
          #name>
      </div>
      <div *ngIf="!editing">
        {{ detail.fullname }}
      </div>

      <button (click)="toggleEdit()">
        {{ editing ? 'Done' : 'Edit' }}
      </button>
      <button (click)="onRemove()">
        Remove
      </button>
    </div>
  `
})
export class UsuariosDetailComponent implements OnChanges {

  @Input()
  detail: Usuario;

  @Output()
  edit: EventEmitter<Usuario> = new EventEmitter<Usuario>();

  @Output()
  remove: EventEmitter<Usuario> = new EventEmitter<Usuario>();

  editing: boolean = false;

  constructor() {}

  ngOnChanges(changes) {
    if (changes.detail) {
      this.detail = Object.assign({}, changes.detail.currentValue);
    }
  }

  onNameChange(value: string) {
    this.detail.fullname = value;
  }

  toggleEdit() {
    if (this.editing) {
      this.edit.emit(this.detail);
    }
    this.editing = !this.editing;
  }
  onRemove() {
    this.remove.emit(this.detail);
  }
}
