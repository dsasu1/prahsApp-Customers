import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/store/reducers';
import { Customer } from '../../models/customer.model';
import { customerActionTypes } from '../../stores/customer.action';
import { getAllCustomers } from '../../stores/customer.selectors';
import { ConfirmComponent } from '../confirm/confirm.component';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
})
export class CustomerListComponent implements OnInit, OnDestroy, AfterViewInit {
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'age',
    'title',
    'other',
    'company',
    'email',
    'phone',
    'address',
    'address2',
    'city',
    'state',
    'zipCode',
  ];
  dataSource = new MatTableDataSource<Customer>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  subscriptions: Subscription = new Subscription();
  constructor(
    private store: Store<AppState>,
    private route: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.store.select(getAllCustomers).subscribe({
        next: (data) => {
          this.dataSource.data = data;
        },
      })
    );
  }

  addCustomer() {
    this.route.navigate(['customers', 'form']);
  }

  deleteCustomer(model: Customer) {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '250px',
      data: {
        title: 'confirm',
        body: `Are you sure you want to delete ${model.firstName} ${model.lastName}?`,
        cancelText: 'Cancel',
        okText: 'Delete',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(
          customerActionTypes.deleteCustomer({ customerId: model.id })
        );
      }
    });
  }

  editCustomer(model: Customer) {
    this.route.navigate(['customers', 'form', model.id]);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
