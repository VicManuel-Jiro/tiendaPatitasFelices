import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule} from '@angular/forms';
import { routing, appRoutingProviders } from './app.routing';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { ExternoComponent } from './externo/externo.component';
import { ContactoComponent } from './contacto/contacto.component';
import { AccesorioComponent } from './accesorio/accesorio.component';
import { MascotaComponent } from './mascota/mascota.component';
import { MascotasComponent } from './mascotas/mascotas.component';
import { AccesoriosComponent } from './accesorios/accesorios.component';
import { CarritoComponent } from './carrito/carrito.component';
import { LoginComponent } from './login/login.component';
import { CrearMascotaComponent } from './crear-mascota/crear-mascota.component';
import { CrearProductoComponent } from './crear-producto/crear-producto.component';
import { CrearUsuarioComponent } from './crear-usuario/crear-usuario.component';
import { ShippingComponent } from './shipping/shipping.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { provideHttpClient, withFetch } from "@angular/common/http";

providers : [provideHttpClient(withFetch())]

@NgModule({
  declarations: [
    AppComponent,
  HomeComponent,
  ExternoComponent,
  ContactoComponent,
  AccesorioComponent,
  MascotaComponent,
  MascotasComponent,
  AccesoriosComponent,
  CarritoComponent,
  LoginComponent,
  CrearMascotaComponent,
  CrearProductoComponent,
  CrearUsuarioComponent,
  ShippingComponent,
  UsuariosComponent,
  UsuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    routing,
    HttpClientModule,
  ],
  //providers: [provideClientHydration()],
providers: [AppRoutingModule,provideHttpClient(withFetch())],
  bootstrap: [AppComponent]
})
export class AppModule { }
