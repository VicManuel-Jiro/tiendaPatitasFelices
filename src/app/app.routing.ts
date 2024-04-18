import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// cada componente
import { HomeComponent} from './home/home.component';
import { MascotaComponent } from './mascota/mascota.component';
import { AccesorioComponent } from './accesorio/accesorio.component';
import { ExternoComponent } from './externo/externo.component';
import { ContactoComponent } from './contacto/contacto.component';
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

// Array de rutas
const appRoutes: Routes = [
{path: '', redirectTo: '/home', pathMatch: 'full' },
{path: 'home', component: HomeComponent},
{path: 'login', component: LoginComponent},
{path: 'mascota/:id', component: MascotaComponent},
{path: 'accesorio/:id', component: AccesorioComponent},
{path: 'mascotas', component: MascotasComponent},
{path: 'carrito', component: CarritoComponent},
{path: 'productos', component: AccesoriosComponent},
{path: 'externo', component: ExternoComponent},
{path: 'crear-mascota', component: CrearMascotaComponent},
{path: 'crear-producto', component: CrearProductoComponent},
{path: 'crear-usuario', component: CrearUsuarioComponent},
{path: 'usuario/:id', component: UsuarioComponent},
{path: 'usuarios', component: UsuariosComponent},
{path: 'shipping', component: ShippingComponent},
{path: 'contacto', component: ContactoComponent},
{path: '**', component: HomeComponent}
];

// Exportar el modulo del router el servicio y el modulo
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);