import { Component, OnInit } from '@angular/core';
import { Global } from '../services/global';
import { UsuarioService } from '../services/usuario.service';
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
  providers: [UsuarioService]
})
export class UsuariosComponent implements OnInit {
public url: any;
public tipousuario: any;
public usuarios: any[]=[];
public empleados: any[]=[];
public clientes: any[]=[];
ishidden=true;
ishidden2=true;
ishidden3=true;
  constructor(private _usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.url=Global.url;
    this.tipousuario=localStorage.getItem("tipousuario");
    this.getUsuarios();
  }
getUsuarios(){
    this._usuarioService.getUsuarios().subscribe(
      response => {
        if(response.usuarios){
          this.usuarios=response.usuarios;
          this.empleados=response.usuarios.filter(function(el) {if (el.tipoUsuario=='empleado'||el.tipoUsuario=='admin' ){return true;}else{return false;}});
          this.clientes=response.usuarios.filter(function(el) {if (el.tipoUsuario=='cliente'){return true;}else{return false;}});
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }
}