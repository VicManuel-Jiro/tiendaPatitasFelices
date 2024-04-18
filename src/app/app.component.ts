import { Component, OnInit, afterNextRender } from '@angular/core';
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
  constructor(private router:Router){
    
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
    
  }
  logout(): void{

    this.router.navigate(['home']).then(() => {localStorage.clear();sessionStorage.clear();window.location.reload();});
  }
}
