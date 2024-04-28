import { Component, OnInit, afterNextRender,Renderer2 } from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ejercicioAngular';
  public usuario;
  public tipousuario: any;
  public id:any;
  public btnMenu: any;
  public mainNav: any;
  public btnLink: any;
  constructor(private router:Router,private renderer: Renderer2){
    
    //console.log("Bienvenido "+this.usuario);
    

  }

  ngOnInit(): void {

    //private isLocalStorageAvailable = typeof localStorage !== 'undefined';
    // check everywhere you use localStorage
    if (typeof localStorage !== 'undefined') {
      this.usuario=localStorage.getItem("usuario");
      this.tipousuario=localStorage.getItem("tipousuario");
      this.id=localStorage.getItem("id");
    }


    this.btnMenu = document.querySelector("#btn-menu");
    this.mainNav = document.querySelector("#main-nav");
    this.renderer.listen(this.btnMenu,'click',()=>{
      this.mainNav.classList.toggle("mostrar");//antes toggle
    });

    this.btnLink = document.querySelector(".menu");
    this.renderer.listen(this.btnLink,'click',()=>{
      this.mainNav.classList.remove("mostrar");
    });
    

  }


  logout(): void{

    this.router.navigate(['home']).then(() => {localStorage.clear();sessionStorage.clear();window.location.reload();});
  }
}
