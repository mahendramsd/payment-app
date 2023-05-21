import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Constants } from '../utils/constants';

@Injectable({
  providedIn: 'root',
})
export class AppService {

  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'false',
      'Access-Control-Allow-Methods': 'POST, GET, PUT, OPTIONS, DELETE',
      'Access-Control-Allow-Headers':
        'Authorization, Access-Control-Max-Age, Access-Control-Allow-Methods, Access-Control-Allow-Credentials, Access-Control-Allow-Origin, Content-Type, Access-Control-Allow-Headers, Access-Control-Expose-Headers, Authorization, X-Requested-With',
      'Access-Control-Expose-Headers': '*',
      'Access-Control-Max-Age': '4800',
    }),
  };

  constructor(private httpClient: HttpClient) {}


  /**
   * Get Parent Payment Details
   * @param offset 
   * @param limit 
   * @returns 
   */
  public getPayments(offset: number, limit: number) {
    return this.httpClient
      .get<any>(
        environment.endPoinUrl
          .concat(Constants.API_END_POINTS.PAYMENTS)
          .concat(`?page=${offset}&limit=${limit}`), this.httpOptions
      ).toPromise();
  }

  /**
   * Get Payment Instalment details By Id
   * @param paymentId 
   * @returns 
   */
  getPaymentDetails(paymentId: any) {
    return this.httpClient
    .get<any>(
      environment.endPoinUrl
        .concat(Constants.API_END_POINTS.PAYMENT_PARENT).concat(`/${paymentId}`), this.httpOptions
    ).toPromise();
  }
}
