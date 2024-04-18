import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';
import { Global } from './global';



@Injectable()
export class ProductService{
public url: string;
public id: any;
//public producto: Producto;
constructor(private _http: HttpClient){
this.url = Global.url;
//this.producto= new Producto('','','','',0,'');
console.log(this.testService());
}

testService(){
return 'Servicio de producto corriendo';
}

getProduct(productId): Observable<any>{
return this._http.get(this.url+'producto/'+productId);
}

addProduct(product: Producto): Observable<any>{
let params = JSON.stringify(product);
let headers = new HttpHeaders().set('Content-Type', 'application/json');
return this._http.post(this.url+'save-producto', params, {headers: headers});
}
getProducts(): Observable<any>{
	let headers = new HttpHeaders().set('Content-Type', 'application/json');
return this._http.get(this.url+'productos',{headers: headers});
}
updateProduct(product: Producto,productId): Observable<any>{
	let params = JSON.stringify(product);
	let headers = new HttpHeaders().set('Content-Type', 'application/json');
	return this._http.put(this.url+'producto/'+productId, params, {headers: headers});
}
deleteProduct(productId): Observable<any>{
	return this._http.delete(this.url+'producto/'+productId);
}
}
