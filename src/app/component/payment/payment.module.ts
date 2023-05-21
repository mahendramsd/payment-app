import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentsComponent } from './payments/payments.component';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';
import { PaymentRoutingModule } from './payment-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material-module';



@NgModule({
  declarations: [
    PaymentsComponent,
    PaymentDetailsComponent,
  ],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class PaymentModule { }
