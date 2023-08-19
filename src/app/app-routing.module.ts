import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './modules/home/pages/home-page/home-page.component';
import { SessionsGuard } from './modules/auth/guards/sessions.guard';
import { PanelComponent } from './modules/panel/page/panel/panel.component';
import { AuthPageComponent } from './modules/auth/pages/auth-page/auth-page.component';
import { InventarioComponent } from './modules/panel/pages/inventario/inventario.component';
import { IngredienteComponent } from './modules/panel/pages/ingrediente/ingrediente.component';
import { RecetaComponent } from './modules/panel/pages/receta/receta.component';
import { MenuComponent } from './modules/panel/pages/menu/menu.component';
import { ComprasComponent } from './modules/panel/pages/compras/compras.component';
import { VentasComponent } from './modules/panel/pages/ventas/ventas.component';
import { ProveedoresComponent } from './modules/panel/pages/proveedores/proveedores.component';
import { DepartamentosComponent } from './modules/panel/pages/departamentos/departamentos.component';
import { PuestosComponent } from './modules/panel/pages/puestos/puestos.component';
import { EmpleadoComponent } from './modules/panel/pages/empleado/empleado.component';
import { ClienteComponent } from './modules/panel/pages/cliente/cliente.component';
import { DashboardComponent } from './modules/panel/pages/dashboard/dashboard.component';
import { LoginComponent } from './modules/auth/pages/login/login.component';
import { RegisterComponent } from './modules/auth/pages/register/register.component';
import { InicioPageComponent } from './modules/home/pages/inicio-page/inicio-page.component';
import { AboutPageComponent } from './modules/home/pages/about-page/about-page.component';
import { ContactPageComponent } from './modules/home/pages/contact-page/contact-page.component';
import { InsertIngredientesComponent } from './modules/panel/pages/ingrediente/insert-ingredientes/insert-ingredientes.component';
import { UnidadesEditarComponent } from './modules/panel/pages/unidades/unidades-editar/unidades-editar.component';
import { UnidadComponent } from './modules/panel/pages/unidades/unidad.component';
import { UnidadesInsertarComponent } from './modules/panel/pages/unidades/unidades-insertar/unidades-insertar.component';
import { ActualizarIngredienteComponent } from './modules/panel/pages/ingrediente/actualizar-ingrediente/actualizar-ingrediente.component';
import { AgregarDepartamentoComponent } from './modules/panel/pages/departamentos/insertar/agregar-departamento/agregar-departamento.component';
import { ActualizarDepartamentoComponent } from './modules/panel/pages/departamentos/actualizar-departamento/actualizar-departamento.component';
import { InsertarRecetaComponent } from './modules/panel/pages/receta/insertar-receta/insertar-receta.component';
import { ActualizarRecetaComponent } from './modules/panel/pages/receta/actualizar-receta/actualizar-receta.component';
import { NotFoundComponent } from './modules/ServerErrors/not-found/not-found.component';
import { DetalleRecetaComponent } from './modules/panel/pages/receta/detalle-receta/detalle-receta.component';
import { InsertarClienteComponent } from './modules/panel/pages/cliente/insertar-cliente/insertar-cliente.component';
import { ActualizarClienteComponent } from './modules/panel/pages/cliente/actualizar-cliente/actualizar-cliente.component';
import { InsertarProveedorComponent } from './modules/panel/pages/proveedores/insertar-proveedor/insertar-proveedor.component';
import { UpdateProveedorComponent } from './modules/panel/pages/proveedores/update-proveedor/update-proveedor.component';
import { InsertMenuComponent } from './modules/panel/pages/menu/insert-menu/insert-menu.component';
import { UpdateMenuComponent } from './modules/panel/pages/menu/update-menu/update-menu.component';
import { EntradasComponent } from './modules/panel/pages/inventario/entradas/entradas.component';
import { InsertEntradaComponent } from './modules/panel/pages/inventario/entradas/insert-entrada/insert-entrada.component';
import { BaseClienteComponent } from './modules/vistaCliente/base-cliente/base-cliente.component';
import { VistaClienteMenuComponent } from './modules/vistaCliente/vista-cliente-menu/vista-cliente-menu.component';
import { VistaClientePedidosComponent } from './modules/vistaCliente/vista-cliente-pedidos/vista-cliente-pedidos.component';
import { VistaClientePerfilComponent } from './modules/vistaCliente/vista-cliente-perfil/vista-cliente-perfil.component';
import { VistaClienteCarritoComponent } from './modules/vistaCliente/vista-cliente-carrito/vista-cliente-carrito.component';
import { VistaClientePagosComponent } from './modules/vistaCliente/vista-cliente-pagos/vista-cliente-pagos.component';


const routes: Routes = [
  {
    path: '', //Localhost Ruta Raiz
    component: HomePageComponent,
    children:[
      {
        path:'',
        component:InicioPageComponent
       },
       {
        path:'about',
        component:AboutPageComponent
       },
       {
        path:'ubicacion',
        component: ContactPageComponent
       },
       {
        path:'auth',
        component:AuthPageComponent
      },
      {
        path:'register',
        component:RegisterComponent
      },
    ]
  },
  { path: 'sweetdreams',
    component: BaseClienteComponent,
    canActivate:[SessionsGuard]
  },

    {
      path:'miMenu',
      component:VistaClienteMenuComponent,
      canActivate:[SessionsGuard]
    },
    {
      path:'miCarrito',
      component:VistaClienteCarritoComponent,
      canActivate:[SessionsGuard]
    },
    {
      path:'misPedidos',
      component:VistaClientePedidosComponent,
      canActivate:[SessionsGuard]
    },
    {
      path:'miPerfil',
      component:VistaClientePerfilComponent,
      canActivate:[SessionsGuard]
    },
    {
      path:'pago',
      component:VistaClientePagosComponent,
      canActivate:[SessionsGuard]
    },
  {
    path:'panel',
    component: PanelComponent,
    canActivate:[SessionsGuard]
  },

    {
      path:'dashboard',
      component:DashboardComponent,
      canActivate:[SessionsGuard]
    },
    {
      path:'cliente',
      component:ClienteComponent,
      canActivate:[SessionsGuard]
    },
    {
      path:'Insertarcliente',
      component:InsertarClienteComponent,
      canActivate:[SessionsGuard]
    },
    {
      path:'ActualizarCliente/:id',
      component:ActualizarClienteComponent,
      canActivate:[SessionsGuard]
    },
    {
      path:'empleados',
      component:EmpleadoComponent,
      canActivate:[SessionsGuard]
    },
    {
      path:'puestos',
      component:PuestosComponent,
      canActivate:[SessionsGuard]
    },
    {
      path:'departamentos',
      component:DepartamentosComponent,
      canActivate:[SessionsGuard]
    },
    {
      path:'insertDepartamento',
      component:AgregarDepartamentoComponent,
      canActivate:[SessionsGuard]
    },
    {
      path:'editDepartamento/:id',
      component: ActualizarDepartamentoComponent,
      canActivate:[SessionsGuard]
    },
    {
      path:'proveedores',
      component:ProveedoresComponent,
      canActivate:[SessionsGuard]
    },
    {
      path:'insertProveedor',
      component:InsertarProveedorComponent,
      canActivate:[SessionsGuard]
    },
    {
      path:'editProveedor/:id',
      component:UpdateProveedorComponent,
      canActivate:[SessionsGuard]
    },
    {
      path:'ventas',
      component:VentasComponent,
      canActivate:[SessionsGuard]
    },
    {
      path:'compras',
      component: ComprasComponent,
      canActivate:[SessionsGuard]
    },
    {
      path:'menu',
      component:MenuComponent,
      canActivate:[SessionsGuard]
    },
    {
      path:'agregarMenu',
      component:InsertMenuComponent,
      canActivate:[SessionsGuard]
    },
    {
      path:'editarMenu/:id',
      component:UpdateMenuComponent,
      canActivate:[SessionsGuard]
    },
    {
      path:'recetas',
      component:RecetaComponent,
      canActivate:[SessionsGuard]
    },
    {
      path:'insertReceta',
      component:InsertarRecetaComponent,
      canActivate:[SessionsGuard]
    },
    {
      path:'editReceta/:id',
      component:ActualizarRecetaComponent,
      canActivate:[SessionsGuard]
    },
    {
      path:'detalle/:id',
      component:DetalleRecetaComponent,
      canActivate:[SessionsGuard]
    },
    {
      path:'ingredientes',
      component:IngredienteComponent,
      canActivate:[SessionsGuard]
    },
    {
      path:'insertIngredientes',
      component:InsertIngredientesComponent,
      canActivate:[SessionsGuard]
    },
    {
      path:'editIngredientes/:id',
      component:ActualizarIngredienteComponent,
      canActivate:[SessionsGuard]
    },
    {
      path:'unidades',
      component:UnidadComponent,
      canActivate:[SessionsGuard]
    },
    {
      path:'insertUnidades',
      component:UnidadesInsertarComponent,
      canActivate:[SessionsGuard]
    },
    {
      path:'editUnidades/:id',
      component:UnidadesEditarComponent,
      canActivate:[SessionsGuard]
    },
    {
      path:'inventario',
      component:InventarioComponent,
      canActivate:[SessionsGuard]
    },
    {
      path:'Entradas',
      component:EntradasComponent,
      canActivate:[SessionsGuard]
    },
    {
      path:'InsertarEntrada',
      component: InsertEntradaComponent,
      canActivate:[SessionsGuard]
    },
    {
      path:'salir',
      component:HomePageComponent
    },
    { path: '404', component: NotFoundComponent }, // Ruta para manejar errores 404
    { path: '**', redirectTo: '/404' }, // Ruta por defecto para cualquier ruta no definida


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
