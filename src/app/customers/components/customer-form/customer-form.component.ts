import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers';
import { Customer } from '../../models/customer.model';
import {
  createCustomer,
  customerActionTypes,
} from '../../stores/customer.action';
import { v4 as uuidv4 } from 'uuid';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { getCustomer } from '../../stores/customer.selectors';
import { Update } from '@ngrx/entity';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../confirm/confirm.component';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss'],
})
export class CustomerFormComponent implements OnInit, OnDestroy {
  form: FormGroup;
  subscriptions: Subscription = new Subscription();
  editId: string;
  get phones() {
    return this.form.get('phones') as FormArray;
  }

  get titleCtrl() {
    return this.form.get('title');
  }

  get otherCtrl() {
    return this.form.get('other');
  }
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.editId = this.route.snapshot.paramMap.get('id');

    this.form = this.fb.group({
      id: [null],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      age: [],
      title: [null, Validators.required],
      other: [null, Validators.required],
      company: [],
      email: [null, [Validators.required, Validators.email]],
      phones: this.fb.array([this.createItem()]),
      address: [null, Validators.required],
      address2: [],
      city: [null, Validators.required],
      state: [null, Validators.required],
      zipCode: [null, Validators.required],
    });

    this.subscriptions.add(
      this.titleCtrl.valueChanges.subscribe({
        next: (val) => {
          if (val === 'Other') {
            this.otherCtrl.enable({ emitEvent: false });
          } else {
            this.otherCtrl.disable({ emitEvent: false });
          }
        },
      })
    );

    if (this.editId) {
      this.store
        .select(getCustomer(this.editId))
        .pipe(take(1))
        .subscribe({
          next: (data) => {
            if (data != null) {
              let cust = {
                ...data,
                other: data.other || null,
                phones: data.phones.map((x) => ({
                  phone: x,
                })),
              };

              this.form.setValue(cust);
            }
          },
        });
    }
  }

  saveCustomer() {
    if (this.form.valid) {
      let customer: Customer = {
        ...this.form.value,
        phones: this.form.value.phones.map((x) => x.phone),
      };

      if (!this.editId) {
        customer.id = uuidv4();
        this.store.dispatch(createCustomer({ customer }));
      } else {
        const update: Update<Customer> = {
          id: customer.id,
          changes: {
            ...customer,
          },
        };

        this.store.dispatch(customerActionTypes.updateCustomer({ update }));
      }
    }
  }

  createItem(): FormGroup {
    return this.fb.group({
      phone: [null, Validators.required],
    });
  }

  addPhone() {
    this.phones.push(this.createItem());
  }

  removePhone(i: number) {
    this.phones.removeAt(1);
  }

  cancel() {
    // I can use the canDeactive and @HostListener('window:beforeunload', ['$event']) for more robust feature
    if (this.form.dirty) {
      const dialogRef = this.dialog.open(ConfirmComponent, {
        width: '250px',
        data: {
          title: 'You have unsaved changes',
          body: `Are you sure you want to leave this page? you will lose all changes`,
          cancelText: 'No',
          okText: 'Leave',
        },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.router.navigate(['/customers']);
        }
      });
    } else {
      this.router.navigate(['/customers']);
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
