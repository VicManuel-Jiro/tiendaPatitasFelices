import { Component, OnInit } from '@angular/core';
import { Usuario } from '../models/usuario';
import { Global } from '../services/global';
import { UsuarioService } from '../services/usuario.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UsuarioService]
})
export class LoginComponent implements OnInit {
public user_exist;
public user: Usuario;
public tipousuario;
public id;
  public status;
  constructor(private _loginService: UsuarioService,private router:Router) {
  this.user = new Usuario('','','','','','','','','','','','','','','');
    this.user_exist = '';
    this.status = '';
     }

  ngOnInit(): void {
    this.user_exist = localStorage.getItem("usuario");
    this.tipousuario=localStorage.getItem("tipousuario");
    this.id=localStorage.getItem("id");
  }
onSubmit(form){
    this._loginService.Login(this.user).subscribe(
      response => {
        //console.log(response.usuario);
        if(response.usuario[0]){
          //location.reload();
          localStorage.setItem("usuario", response.usuario[0].usuario);
          localStorage.setItem("tipousuario", response.usuario[0].tipoUsuario);
          localStorage.setItem("id", response.usuario[0]._id);
          this.user_exist = localStorage.getItem("usuario");
          this.tipousuario=localStorage.getItem("tipousuario");
          this.id=localStorage.getItem("id");
          //localStorage.setItem("id", response.usuario[0]._id);
          //console.log(localStorage.getItem("usuario"));
          //console.log(this.user_exist);
          this.status = 'success';
          form.reset();
          this.router.navigate(['home']).then(() => {window.location.reload();});
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
