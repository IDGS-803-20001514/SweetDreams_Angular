import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { InicioPageComponent } from './pages/inicio-page/inicio-page.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { FormsModule } from '@angular/forms';
import { AuthModule } from '../auth/auth.module';


@NgModule({
  declarations: [
    HomePageComponent,
    InicioPageComponent,
    AboutPageComponent,
    ContactPageComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    AuthModule,
    FormsModule
  ]
})
export class HomeModule { }
