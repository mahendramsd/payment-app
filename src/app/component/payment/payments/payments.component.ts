import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import { Constants } from 'src/app/utils/constants';

declare let iziToast: any;

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss'],
})
export class PaymentsComponent implements AfterViewInit, OnInit {
  public pageIndex = 0;
  public pageSize = 10;
  public payments!: any;

  constructor(private appService: AppService, 
    private router: Router,
    private cdr: ChangeDetectorRef) {}

  ELEMENT_DATA: PaymentElement[] = [];

  displayedColumns: string[] = [
    'id',
    'sender',
    'receiver',
    'totalAmount',
    'totalPaidAmount',
  ];
  pageSizes = [2, 3,4, 5,7, 10];
  dataSource: any = new MatTableDataSource<PaymentElement>();

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  // dataSourceWithPageSize: any = new MatTableDataSource(this.payments);


  // @ViewChild('paginatorPageSize') paginatorPageSize: MatPaginator | undefined;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    // this.dataSourceWithPageSize.paginator = this.paginatorPageSize;
  }

  ngOnInit(): void {
     this.loadPayments();
  }


  loadPayments() {
    this.appService
    .getPayments(
        this.pageIndex,
        this.pageSize
    )
    .then((res) => {
        this.payments = res.data.payments;
        this.payments.length = res.data.totalItems;
        this.dataSource = new MatTableDataSource<PaymentElement>(
            this.payments
        );
        this.dataSource.paginator = this.paginator;
        this.cdr.detectChanges();
        setTimeout(() => {
         console.log("SMD");
         
      }, 1000);
    });
  }

  pageChanged(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    let previousIndex = event.previousPageIndex;
    let previousSize = this.pageSize * this.pageIndex;
    this.getNextData(previousSize, this.pageIndex, this.pageSize);
}

getNextData(currentSize: number, offset: number, limit: number) {
    this.appService
        .getPayments(
            offset,
            limit
        )
        .then((result) => {
            // this.payments.length = currentSize;
            this.payments.push(result.data.payments);
            this.payments.length = result.data.totalItems;
            this.dataSource = new MatTableDataSource<PaymentElement>(
                this.payments
            );
            this.dataSource.paginator = this.paginator;
            this.cdr.detectChanges();
        });
}

viewPaymentsDetails(id: any, totailPaidAmount: number) {
    if(totailPaidAmount != 0) {
      this.router.navigate([Constants.URL.PAYMENT_DETAILS, id])
    } else {
      iziToast.info({
        title: "Error !",
        position: "topRight",
        message: "Instalment payment not found !",
    });
    }
}

}

export interface PaymentElement {
  id: number;
  sender: string;
  receiver: string;
  totalAmount: number;
  totalPaidAmount: number;
}

