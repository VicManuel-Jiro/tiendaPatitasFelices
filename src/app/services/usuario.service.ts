import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { Global } from './global';



@Injectable()
export class UsuarioService{
public url: string;
public id: any;
//public usuario: Usuario;
constructor(private _http: HttpClient){
this.url = Global.url;
//this.usuario= new Usuario('','','','',0,'');
console.log(this.testService());
}

testService(){
return 'Servicio de usuario corriendo';
}

getUsuario(usuarioId): Observable<any>{
return this._http.get(this.url+'usuario/'+usuarioId);
}

addUsuario(usuario: Usuario): Observable<any>{
let params = JSON.stringify(usuario);
let headers = new HttpHeaders().set('Content-Type', 'application/json');
return this._http.post(this.url+'save-usuario', params, {headers: headers});
}
getUsuarios(): Observable<any>{
	let headers = new HttpHeaders().set('Content-Type', 'application/json');
return this._http.get(this.url+'usuarios',{headers: headers});
}
updateUsuario(usuario: Usuario,usuarioId): Observable<any>{
	let params = JSON.stringify(usuario);
	let headers = new HttpHeaders().set('Content-Type', 'application/json');
	return this._http.put(this.url+'usuario/'+usuarioId, params, {headers: headers});
}
Login(usuario: Usuario): Observable<any>{
let params = JSON.stringify(usuario);
let headers = new HttpHeaders().set('Content-Type', 'application/json');
return this._http.post(this.url+'usuario/login', params, {headers: headers});
}
deleteUsuario(usuarioId): Observable<any>{
	return this._http.delete(this.url+'usuario/'+usuarioId);
}
}
