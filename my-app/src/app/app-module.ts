import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { About } from './about/about';
import { Products } from './products/products';
import { Cart } from './cart/cart';
import { Revenue } from './revenue/revenue';
import { VIP } from './vip/vip';
import { Login } from './login/login';
import { Register } from './register/register';

@NgModule({
  declarations: [
    App,
    About,
    Products,
    Cart,
    Revenue,
    VIP,
    Login,
    Register
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
