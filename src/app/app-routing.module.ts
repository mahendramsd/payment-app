import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { AuthGaurdService } from './services/guards/auth-gaurd.service';

const paymentModule = () => import('./component/payment/payment.module').then(x => x.PaymentModule);

const routes: Routes = [
  
  {path: "payment", canActivate: [AuthGaurdService], loadChildren: paymentModule},
  { path: "login", component: LoginComponent },
  { path: '', redirectTo: "login", pathMatch: "full" },
  { path: "**", redirectTo: "login", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
