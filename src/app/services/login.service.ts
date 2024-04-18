import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { Global } from './global';



@Injectable()
export class LoginService{
public url: string;
public id: any;
//public usuario: UseroUsuario;
constructor(private _http: HttpClient){
this.url = Global.url;
//this.usuario= new UseroUsuario('','','','',0,'');
console.log(this.testService());
}

testService(){
return 'Servicio de usuario corriendo';
}

}