import { Component, OnInit, ViewChild, Input } from '@angular/core';
import {FormGroup, FormControl, Validators } from "@angular/forms";
import {HttpClient, HttpHeaders} from "@angular/common/http";

import { StripeService, StripeCardComponent, ElementOptions, ElementsOptions } from "ngx-stripe";
import { tokenKey } from '@angular/core/src/view';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css']
})
export class PaymentFormComponent implements OnInit {
  
  @ViewChild(StripeCardComponent) card: StripeCardComponent;
  //card options style

  @Input() price;
  @Input() product;
  @Input() description;

  cardOptions: ElementOptions = {
      style: {
        base: {
          iconColor: '#111',
          color: '#111',
          fontSize:"16px",
          '::placeholder': {
            color: '#111'
          }
        }
    }
  }

  //other optional options
  elementsOptions: ElementsOptions = {
    locale: 'en'
  };
 

  constructor(private stripeService: StripeService, private httpclient: HttpClient){}
    public paymentForm = new FormGroup({
    name: new FormControl("", Validators.required),
    email: new FormControl("", Validators.required)
   
    });

        
    buy(formdata: FormData){
    
     //
      this.stripeService.createToken(this.card.getCard(), {name} )
      .subscribe(result => {
        const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0Iiwic2NvcGVzIjoiUk9MRV9VU0VSIiwiaWF0IjoxNTUwNzQ4NzEzLCJleHAiOjE1NTU5MzI3MTN9.AChAi0ldyDlr_GIMsnrH8A2UkmAWMlxCwKtOiuYFqaU';
        if(result.token){
          const headers = new HttpHeaders({   
            'Content-Type': 'application/json',   
            'Authorization': 'Bearer ' + token 
          });
          //.set('Content-Type', 'application/json');
          //headers.set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0Iiwic2NvcGVzIjoiUk9MRV9VU0VSIiwiaWF0IjoxNTUwNjY0NjQ3LCJleHAiOjE1NTA2ODI2NDd9.D7DY9xfIOvy_lQRCSkKNYXW3lBrIlAZkPpaGnDThjGw');
          
          let obj = {
            token: result.token.id,
            email: formdata["email"],
            user: formdata["name"],
            amount: this.price,
            product: this.product,
            description: this.description

          }
          console.log("header:");
          console.log(headers);
          //make a call to the server
          this.httpclient.post("http://localhost:8080/user/charge",
          JSON.stringify(obj),
          {headers: headers} ).subscribe( data => {
            console.log("---- Transaction Data -----");
            //message from the API
            console.log(data);
          });
          
       
          console.log(result.token.id);
        }else if(result.error){
          console.log(result.error.message);
        }

      });



    }


  ngOnInit() {
  }

}
