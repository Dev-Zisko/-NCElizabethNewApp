import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '',
    component: MenuPage,
    children: [
      {
        path: 'first',
        loadChildren: '../home/home.module#HomePageModule'
      },
      {
        path: 'second',
        loadChildren: '../register/register.module#RegisterPageModule'
      },
      {
        path: 'third',
        loadChildren: '../login/login.module#LoginPageModule'
      },
      { path: 'third/password',
        loadChildren: '../password/password.module#PasswordPageModule' 
      },
      {
        path: 'fourth',
        loadChildren: '../message/message.module#MessagePageModule'
      },
      {
        path: 'profile',
        loadChildren: '../profile/profile.module#ProfilePageModule'
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MenuPage]
})
export class MenuPageModule {}
