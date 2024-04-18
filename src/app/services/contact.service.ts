import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContactoUsuario } from '../models/contacto.usuario';
import { Global } from './global';



@Injectable()
export class ContactService{
public url: string;
public id: any;
//public contacto: ContactoUsuario;
constructor(private _http: HttpClient){
this.url = Global.url;
//this.contacto= new ContactoUsuario('','','','',0,'');
console.log(this.testService());
}

testService(){
return 'Servicio de contacto corriendo';
}

getContact(contactId): Observable<any>{
return this._http.get(this.url+'contacto/'+contactId);
}

addContact(contact: ContactoUsuario): Observable<any>{
let params = JSON.stringify(contact);
let headers = new HttpHeaders().set('Content-Type', 'application/json');
return this._http.post(this.url+'save-contacto', params, {headers: headers});
}
getContacts(): Observable<any>{
	let headers = new HttpHeaders().set('Content-Type', 'application/json');
return this._http.get(this.url+'contactos',{headers: headers});
}
updateContact(contact: ContactoUsuario,contactId): Observable<any>{
	let params = JSON.stringify(contact);
	let headers = new HttpHeaders().set('Content-Type', 'application/json');
	return this._http.put(this.url+'contacto/'+contactId, params, {headers: headers});
}
}