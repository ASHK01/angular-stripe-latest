import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule } from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";

//import the ngx Stripe Module
import { NgxStripeModule } from "ngx-stripe";
import { PaymentFormComponent } from './payment-form/payment-form.component';
import { ProductsComponent } from './products/products.component';

@NgModule({
  declarations: [
    AppComponent,
    PaymentFormComponent,
    ProductsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxStripeModule.forRoot("pk_test_pNM4X7fy1W3SIu7vctfk0KvO")
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
