import { Component, OnInit } from '@angular/core';
import { Global } from '../services/global';
import { ProductService } from '../services/product.service';
import { CarritoService } from '../services/carrito.service';
import { Producto } from '../models/producto';
@Component({
  selector: 'app-accesorios',
  templateUrl: './accesorios.component.html',
  styleUrls: ['./accesorios.component.css'],
  providers: [ProductService]
})
export class AccesoriosComponent implements OnInit {
public tipousuario;
public products_new: any[]=[];
public products: any[]=[];
public url=Global.url;
  constructor(
    private _productoService: ProductService,
    private _carritoservicio: CarritoService) { }

  ngOnInit(): void {
    this.tipousuario=localStorage.getItem("tipousuario");
    this.getProductos();
  }
  addToCart(product: Producto){
    this._carritoservicio.addToCart(product);
  }

getProductos(){
    this._productoService.getProducts().subscribe(
      response => {
        if(response.productos){
          //console.log(response.productos);
          this.products=response.productos as any;
          this.products_new=this.products.sort((a,b) =>{
            return <any>new Date(b.fechaCreacion) - <any>new Date(a.fechaCreacion);
          }) as any;
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }
}
