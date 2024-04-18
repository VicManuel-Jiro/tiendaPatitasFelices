import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mascota } from '../models/mascota';
import { Global } from './global';



@Injectable()
export class MascotaService{
public url: string;
public id: any;
//public mascota: Mascotao;
constructor(private _http: HttpClient){
this.url = Global.url;
//this.mascota= new Mascotao('','','','',0,'');
console.log(this.testService());
}

testService(){
return 'Servicio de mascota corriendo';
}

getMascota(mascotaId): Observable<any>{
return this._http.get(this.url+'mascota/'+mascotaId);
}

addMascota(mascota: Mascota): Observable<any>{
let params = JSON.stringify(mascota);
let headers = new HttpHeaders().set('Content-Type', 'application/json');
return this._http.post(this.url+'save-mascota', params, {headers: headers});
}
getMascotas(): Observable<any>{
	let headers = new HttpHeaders().set('Content-Type', 'application/json');
return this._http.get(this.url+'mascotas',{headers: headers});
}
updateMascota(mascota: Mascota,mascotaId): Observable<any>{
	let params = JSON.stringify(mascota);
	let headers = new HttpHeaders().set('Content-Type', 'application/json');
	return this._http.put(this.url+'mascota/'+mascotaId, params, {headers: headers});
}
deleteMascota(mascotaId): Observable<any>{
	return this._http.delete(this.url+'mascota/'+mascotaId);
}
}
