import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Products } from './products/products';
import { Cart } from './cart/cart';
import { Login } from './login/login';
import { Register } from './register/register';
import { Revenue } from './revenue/revenue';
import { VIP } from './vip/vip';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/shopping', pathMatch: 'full' },
  { path: 'shopping', component: Products },
  { path: 'current-cart', component: Cart, canActivate: [AuthGuard] },
  { path: 'revenue', component: Revenue, canActivate: [AuthGuard], data: { requiresEmployee: true } },
  { path: 'vip-customers', component: VIP, canActivate: [AuthGuard], data: { requiresEmployee: true } },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: '**', redirectTo: '/shopping' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
