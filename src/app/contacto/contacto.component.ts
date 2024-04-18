import { Component, OnInit } from '@angular/core';
import { ContactoUsuario } from '../models/contacto.usuario';
import { Global } from '../services/global';
import { ContactService } from '../services/contact.service';
@Component({
	selector: 'app-contacto',
	templateUrl: './contacto.component.html',
	styleUrls: ['./contacto.component.css'],
	providers: [ContactService]
})
export class ContactoComponent implements OnInit {
	public usuario: ContactoUsuario;
	public contact_saved;
	public status;
	public mensajes;
public tipousuario;
	constructor(
		private _contactService: ContactService
		){
		this.usuario = new ContactoUsuario('','','',new Date(),'');
		this.contact_saved = '';
		this.status = 'failed';
	}
	ngOnInit() {
		this.tipousuario=localStorage.getItem("tipousuario");
		this.getmessages();
	}
	onSubmit(form){
		this.usuario.fechaCreacion=new Date();
		this._contactService.addContact(this.usuario).subscribe(
			response => {
				if(response.contacto){
					this.contact_saved = response.contacto;
					this.status = 'success';
					form.reset();
				}else{
					this.status = 'failed';
				}
    },
    error => {
    	console.log(<any>error);
    }
    );
	}
	getmessages(){
	this._contactService.getContacts().subscribe(
      response => {
        if(response.contactos){
          this.mensajes=response.contactos.sort((a,b) =>{
            return <any>new Date(b.fechaCreacion) - <any>new Date(a.fechaCreacion);
          });
        }
      },
      error => {
        console.log(<any>error);
      }
    );
	}
}