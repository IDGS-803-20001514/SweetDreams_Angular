import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarHomeComponent } from './components/nav-bar-home/nav-bar-home.component';
import { FooterHomeComponent } from './components/footer-home/footer-home.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from './components/sidebar/sidebar.component';




@NgModule({
  declarations: [
    NavBarHomeComponent,
    FooterHomeComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
  ],
  exports: [
    NavBarHomeComponent,
    FooterHomeComponent,
    SidebarComponent
  ]
})
export class SharedModule { }
