import { Component, OnInit } from '@angular/core';
import { Global } from '../services/global';
import { CarritoService } from '../services/carrito.service';
import { Producto } from '../models/producto';
import { ProductService } from '../services/product.service';
import { PedidoService } from '../services/pedido.service';
import { Pedido } from '../models/pedido';
import { PedidoProducto } from '../models/pedidoProducto';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../models/usuario';
import { Router} from '@angular/router';
//import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
  providers: [ProductService,UsuarioService,PedidoService]
})
export class CarritoComponent {
  public tipousuario;
//public productos = this._carritoservicio.getItems();
public status: String;
public productos;
public pedido: Pedido;
public pedidoproduc: PedidoProducto;
public items: Producto[]=[];
public producto: Producto;
public subtotal=0;
public total=0;
public vacio=0;
public url=Global.url;
public ship=0;
public shiping=["Dia siguiente","2 Dias","Postal"];
public pago=0;
public direc=0;
public active=0;
public activep=0;
public usuario: Usuario;
public id: any;
/*checkoutForm = this.formBuilder.group({
    name: '',
    address: ''
  });*/
  constructor(
    private _carritoservicio: CarritoService,
    private _usuarioService: UsuarioService,
    private _pedidoService: PedidoService,
    private _productoService: ProductService,
    private router:Router
    ) {
    this.producto = new Producto('','','',0,'',0,'',new Date());
    this.pedido= new Pedido('','',new Date(),0,'','','','','','','','','','','','','','',);
    this.pedidoproduc=new PedidoProducto('','','',0);
    this.usuario = new Usuario('','','','','','','','','','','','','','','');
    this.direc=0;
    this.activep=0;
    this.status = 'failed';
  }
//, private formBuilder: FormBuilder
ngOnInit(): void {
  this.id = localStorage.getItem("id");
  this.direc=0;
  this.activep=0;
  this.tipousuario=localStorage.getItem("tipousuario");
  this.productos= sessionStorage.getItem("carrito");
  this.productos= JSON.parse(this.productos);
  this.subtotal=0;
  this.total=0;
  if(this.productos!==null){
    if (this.productos.length!==0){
      this.vacio=1;
      for (var val of this.productos) {
        this.getProducto(val[0],val[1]);
      }
    }else{
      this.vacio=0;
    }
  }
  this.total=this.subtotal+this.ship;
this.getUsuario();
}
getProducto(_id, val){
  this._productoService.getProduct(_id).subscribe(
    response => {
      this.producto=response.producto;
      this.items.push(this.producto);
      this.subtotal=this.subtotal+this.producto.precio.valueOf()*val;
      this.total=this.subtotal;
    },
    error => {
      console.log(<any>error);
    }
    );
}
getUsuario(){
    this._usuarioService.getUsuario(this.id).subscribe(
      response => {
        this.usuario=response.usuario;
        
      },
      error => {
        console.log(<any>error);
      }
    );
  }
sumtotal(){
  this.total=this.subtotal+Number(this.ship);
}
pagar(){
if (this.tipousuario==='cliente'||this.tipousuario==='empleado'||this.tipousuario==='admin'){
  if (this.ship==0||this.pago==0||this.direc==0){
    if(this.ship==0&&this.pago==0&&this.direc==0){window.alert('No se deben dejar opciones sin seleccionar');
    }else{
      if(this.ship==0){window.alert('Elija shipping');}
      if(this.pago==0){window.alert('Elija metodo de pago');}
      if(this.direc==0){window.alert('Elija metodo de envio');}
    }
  }else{
    if(this.pago==2){
      if(this.direc==1){
        if(this.ship==100){this.pedido.ship=this.shiping[0];}
        if(this.ship==50){this.pedido.ship=this.shiping[1];}
        if(this.ship==30){this.pedido.ship=this.shiping[2];}
        this.pedido.monto=this.total;
        this.pedido.fechaCreacion=new Date();
        this.pedido.usuarioId=this.id;
        this.pedido.tipoPago="Efectivo";
        this.pedido.tarjeta="0000000000000000";
        this.pedido.cvc="000";
        this.pedido.mes="00";
        this.pedido.year="00";
        this.pedido.nombreTarjeta="noFace"
        //this.getUsuario();
        this.pedido.correo=this.usuario.correo;
        this.pedido.direccion=this.usuario.direccion;
        this.pedido.pais=this.usuario.pais;
        this.pedido.estado=this.usuario.estado;
        this.pedido.ciudad=this.usuario.ciudad;
        this.pedido.cp=this.usuario.cp;
        this.pedido.telefono=this.usuario.telefono;
        
      }else{
        if(this.ship==100){this.pedido.ship=this.shiping[0];}
        if(this.ship==50){this.pedido.ship=this.shiping[1];}
        if(this.ship==30){this.pedido.ship=this.shiping[2];}
        this.pedido.monto=this.total;
        this.pedido.fechaCreacion=new Date();
        this.pedido.usuarioId=this.id;
        this.pedido.tipoPago="Efectivo";
        this.pedido.tarjeta="0000000000000000";
        this.pedido.cvc="000";
        this.pedido.mes="00";
        this.pedido.year="00";
        this.pedido.nombreTarjeta="noFace"
        //correo,direccion,pais,estado,ciudad,cp,telefono rellenados
      }
    }else{
      if(this.direc==1){
        if(this.ship==100){this.pedido.ship=this.shiping[0];}
        if(this.ship==50){this.pedido.ship=this.shiping[1];}
        if(this.ship==30){this.pedido.ship=this.shiping[2];}
        this.pedido.monto=this.total;
        this.pedido.fechaCreacion=new Date();
        this.pedido.usuarioId=this.id;
        this.pedido.tipoPago="Tarjeta";
        //tarjeta,cvc,mes,year nombretarjeta rellenados
        //this.getUsuario();
        this.pedido.correo=this.usuario.correo;
        this.pedido.direccion=this.usuario.direccion;
        this.pedido.pais=this.usuario.pais;
        this.pedido.estado=this.usuario.estado;
        this.pedido.ciudad=this.usuario.ciudad;
        this.pedido.cp=this.usuario.cp;
        this.pedido.telefono=this.usuario.telefono;
      }else{
        if(this.ship==100){this.pedido.ship=this.shiping[0];}
        if(this.ship==50){this.pedido.ship=this.shiping[1];}
        if(this.ship==30){this.pedido.ship=this.shiping[2];}
        this.pedido.monto=this.total;
        this.pedido.fechaCreacion=new Date();
        this.pedido.usuarioId=this.id;
        this.pedido.tipoPago="Tarjeta";
        //tarjeta,cvc,mes,year nombretarjeta rellenados
        //correo,direccion,pais,estado,ciudad,cp,telefono rellenados
      }

    }
  }
  this.crearpedido();
}else{
  this.router.navigate(['login']).then(() => {window.location.reload();window.alert('Por favor ingrese a su cuenta');});
}
}
metodo(){this.active=0;}
metodo2(){this.activep=0;}
redirec(){
  this.router.navigate(['login']).then(() => {window.location.reload();window.alert('Por favor ingrese a su cuenta');});
}
crearpedido(){
  console.log(this.pedido);
this._pedidoService.addPedido(this.pedido).subscribe(
      response => {
        if(response.pedido){
            this.pedido = response.pedido;
            this.status = 'success';
            this.creararreglo(this.pedido._id);
            window.alert('Se ha completado la compra');
            sessionStorage.removeItem("carrito");
            window.location.reload();
        }else{
          this.status = 'failed';
        }
      },
      error => {
        console.log(<any>error);
      }
      );
}
creararreglo(pedidoID: String){
  //this.pedidoproduc= PedidoProducto('_id','idpedido','idarticulo',cantidad);

  for(var item of this.productos){
    this.pedidoproduc.pedidoId=pedidoID;
    this.pedidoproduc.productoId=item[0];
    this.pedidoproduc.cantidad=item[1];
    console.log(this.pedidoproduc);
    this._pedidoService.addPedidoProducto(this.pedidoproduc).subscribe(
      response => {
        console.log(response);
        if(response.pedidoproducto){
            this.status = 'success';
        }else{
          this.status = 'failed';
        }
      },
      error => {
        console.log(<any>error);
      }
      );
  }
}
borrar(id):void{
  var i=-2;
  var ban=0;
  for (var val of this.productos) {
    if (id===val[0]){
      if (val[1]>1){
        val[1]=val[1]-1;
        ban=1;
        break;
      }else{
        this.removeItemFromArr(this.productos,val);
        break;
      }
    }
  }
  sessionStorage.removeItem("carrito");
  sessionStorage.setItem("carrito",JSON.stringify(this.productos));
  window.location.reload();
}
onSubmit(form): void {
  this.active=1;

  }
  onSubmit2(form): void {
  this.activep=1;

  }
  removeItemFromArr( arr, item ){
    var i = arr.indexOf( item );
    i !== -1 && arr.splice( i, 1 );
  }
}
