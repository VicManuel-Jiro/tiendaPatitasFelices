import { Component, OnInit,Renderer2 } from '@angular/core';
import { Global } from '../services/global';
import { ProductService } from '../services/product.service';
import { MascotaService } from '../services/mascota.service';
import { CarritoService } from '../services/carrito.service';
import { Producto } from '../models/producto';
import { Mascota } from '../models/mascota';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ProductService,MascotaService]
})
export class HomeComponent implements OnInit {
public slider:any;
public sliderSection:any;
public sliderSectionFirst:any;
public sliderSectionLast:any;
public btnLeft:any;
public btnRight:any;
public url=Global.url;
public products_new: any[]=[];
public mascotas_nuevas: any[]=[];
  constructor(
    private renderer: Renderer2,
    private _productoService: ProductService,
    private _mascotaService: MascotaService,
    private _carritoservicio: CarritoService) { 
    
  }

  ngOnInit() {
    this.getProductos();
    this.getPets();
    this.slider=document.querySelector("#slider");
    this.sliderSection=document.querySelectorAll(".slider__section");
    this.sliderSectionLast=this.sliderSection[this.sliderSection.length -1];
    this.slider.insertAdjacentElement('afterbegin',this.sliderSectionLast);
    this.btnLeft=document.querySelector("#btn-left");
    this.btnRight=document.querySelector("#btn-right");
    this.renderer.listen(this.btnRight,"click",() =>{
      this.sliderSectionFirst=document.querySelectorAll(".slider__section")[0];
      this.slider.style.marginLeft="-200%";
      this.slider.style.transition="all 0.5s";
      //console.log("hh")
      setTimeout(()=>{
        this.slider.style.transition="none";
        this.slider.insertAdjacentElement('beforeend',this.sliderSectionFirst);
        this.slider.style.marginLeft="-100%";
      },500);
    });
    this.renderer.listen(this.btnLeft,"click",() =>{
      this.sliderSection=document.querySelectorAll(".slider__section");
      this.sliderSectionLast=this.sliderSection[this.sliderSection.length -1];
      this.slider.style.marginLeft="0";
      this.slider.style.transition="all 0.5s";
      setTimeout(()=>{
        this.slider.style.transition="none";
        this.slider.insertAdjacentElement('afterbegin',this.sliderSectionLast);
        this.slider.style.marginLeft="-100%";
      },500);});
    //this.btnRight.addEventListener('click',this.Next());
    //this.btnLeft.addEventListener('click',this.Prev());
    //setInterval(()=>{this.Next();},9000);
  }
  addToCart(product: Producto){
    this._carritoservicio.addToCart(product);
  }

getProductos(){
    this._productoService.getProducts().subscribe(
      response => {
        if(response.productos){
          this.products_new=response.productos.sort((a,b) =>{
            return <any>new Date(b.fechaCreacion) - <any>new Date(a.fechaCreacion);
          }) as any;
        }
      },
      error => {
        //console.log(<any>error);
        console.log("hubo un error al cargar los productos")
      }
    );
  }
  getPets(){
    this._mascotaService.getMascotas().subscribe(
      response => {
        if(response.mascotas){
          this.mascotas_nuevas=response.mascotas.sort((a,b) =>{
            return <any>new Date(b.fechaCreacion) - <any>new Date(a.fechaCreacion);
          }) as any;
        }
      },
      error => {
        //console.log(<any>error);
        console.log("hubo un error al cargar las mascotas")
      }
    );
  }
/*
Next(){
  this.sliderSectionFirst=document.querySelectorAll(".slider__section")[0];
  this.slider.style.marginLeft="-200%";
  this.slider.style.transition="all 0.5s";
  //console.log("hh")
  setTimeout(()=>{
    this.slider.style.transition="none";
    this.slider.insertAdjacentElement('beforeend',this.sliderSectionFirst);
    this.slider.style.marginLeft="-100%";
  },500);
}

Prev(){
  this.sliderSection=document.querySelectorAll(".slider__section");
  this.sliderSectionLast=this.sliderSection[this.sliderSection.length -1];
  this.slider.style.marginLeft="0";
  this.slider.style.transition="all 0.5s";
  setTimeout(()=>{
    this.slider.style.transition="none";
    this.slider.insertAdjacentElement('afterbegin',this.sliderSectionLast);
    this.slider.style.marginLeft="-100%";
  },500);
}*/


}









