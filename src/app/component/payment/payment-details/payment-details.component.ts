import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.scss'],
})
export class PaymentDetailsComponent implements OnInit {

  private paymentId : any;
  public paymentDetails : any;

  displayedColumns: string[] = [
    'id',
    'sender',
    'receiver',
    'totalAmount',
    'paidAmount',
  ];

  dataSource: any = new MatTableDataSource<PaymentDetailsElement>();

  constructor(
    private appService: AppService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      this.paymentId = paramMap.get('id');
    });

    if(this.paymentId) {
      this.getPaymentDetails(this.paymentId);
    }
  }

  getPaymentDetails(paymentId: any) {    
    this.appService
    .getPaymentDetails(
    paymentId
    )
    .then((res) => {
        this.paymentDetails = res.data;
        this.dataSource = new MatTableDataSource<PaymentDetailsElement>(
            this.paymentDetails
        );
        this.cdr.detectChanges();
    });
  }
}

export interface PaymentDetailsElement {
  id: number;
  sender: string;
  receiver: string;
  totalAmount: number;
  paidAmount: number;
}