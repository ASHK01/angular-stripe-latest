import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class FetchProductsService {


  constructor(private httpclient: HttpClient) { }

  getAllProducts(): any{
   
    const pro = {
      "data": [
        {
          "id": "4UGz7v86vDQSMrxhelSP",
          "name": "Test",
          "description": "desc",
          "amount": 100,
          "image": "https://bitcoinist.com/wp-content/uploads/2018/08/shutterstock_764225425.jpg"
        }
      ]
    };

    return pro;
  }


}
