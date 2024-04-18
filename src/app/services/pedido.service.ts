import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from '../models/pedido';
import { PedidoProducto } from '../models/pedidoProducto';
import { Global } from './global';



@Injectable()
export class PedidoService{
public url: string;
public id: any;
//public pedido: Pedido;
constructor(private _http: HttpClient){
this.url = Global.url;
//this.pedido= new Pedido('','','','',0,'');
console.log(this.testService());
}

testService(){
return 'Servicio de pedido corriendo';
}

getPedido(pedidoId): Observable<any>{
return this._http.get(this.url+'pedido/'+pedidoId);
}

addPedido(pedido: Pedido): Observable<any>{
let params = JSON.stringify(pedido);

let headers = new HttpHeaders().set('Content-Type', 'application/json');

return this._http.post(this.url+'save-pedido', params, {headers: headers});
}
getPedidos(): Observable<any>{
	let headers = new HttpHeaders().set('Content-Type', 'application/json');
return this._http.get(this.url+'pedidos',{headers: headers});
}
updatePedido(pedido: Pedido,pedidoId): Observable<any>{
	let params = JSON.stringify(pedido);
	let headers = new HttpHeaders().set('Content-Type', 'application/json');
	return this._http.put(this.url+'pedido/'+pedidoId, params, {headers: headers});
}
deletePedido(pedidoId): Observable<any>{
	return this._http.delete(this.url+'pedido/'+pedidoId);
}

///////
getPedidoProducto(productopedidoId): Observable<any>{
return this._http.get(this.url+'productopedido/'+productopedidoId);
}

addPedidoProducto(productopedido: PedidoProducto): Observable<any>{
let params = JSON.stringify(productopedido);
let headers = new HttpHeaders().set('Content-Type', 'application/json');
return this._http.post(this.url+'save-productopedido', params, {headers: headers});
}
getPedidoProductos(): Observable<any>{
	let headers = new HttpHeaders().set('Content-Type', 'application/json');
return this._http.get(this.url+'productopedidos',{headers: headers});
}
updatePedidoProducto(productopedido: PedidoProducto,productopedidoId): Observable<any>{
	let params = JSON.stringify(productopedido);
	let headers = new HttpHeaders().set('Content-Type', 'application/json');
	return this._http.put(this.url+'productopedido/'+productopedidoId, params, {headers: headers});
}
deletePedidoProducto(productopedidoId): Observable<any>{
	return this._http.delete(this.url+'productopedido/'+productopedidoId);
}
//////

}