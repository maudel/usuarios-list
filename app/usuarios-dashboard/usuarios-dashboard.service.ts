import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Usuario } from './models/usuario.interface';

const USUARIOS_API: string = '/api/usuarios';

@Injectable()
export class UsuariosDashboardService {
  constructor(private http: Http) {}

  getUsuarios(): Observable<Usuario[]> {
    return this.http
      .get(USUARIOS_API)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json()));
  }

  getUsuario(id: number): Observable<Usuario> {
    return this.http
      .get(`${USUARIOS_API}/${id}`)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json()));
  }

  updatePassenger(passenger: Usuario): Observable<Usuario> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({
      headers: headers
    });
    return this.http
      .put(`${USUARIOS_API}/${passenger.id}`, passenger, options)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json()));
  }

  removeUsuario(passenger: Usuario): Observable<Usuario> {
    return this.http
      .delete(`${USUARIOS_API}/${passenger.id}`)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json()));
  }

}
