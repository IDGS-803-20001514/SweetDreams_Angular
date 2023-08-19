import { VistaClienteModule } from './modules/vistaCliente/vistaCliente.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { PanelModule } from './modules/panel/panel.module';
import { AuthModule } from './modules/auth/auth.module';
import { HomeModule } from './modules/home/home.module';
import { NotFoundComponent } from './modules/ServerErrors/not-found/not-found.component';






@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    HomeModule,
    AuthModule,
    PanelModule,
    VistaClienteModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
