import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { concatMap, map, tap } from 'rxjs/operators';
import { CustomerService } from '../services/customer.service';
import { customerActionTypes } from './customer.action';

@Injectable()
export class CustomerEffects {
  loadCustomers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(customerActionTypes.loadCustomers),
      concatMap(() => this.customerService.getAllCustomers()),
      map((customers) => customerActionTypes.customersLoaded({ customers }))
    )
  );

  createCourse$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(customerActionTypes.createCustomer),
        concatMap((action) =>
          this.customerService.createCustomer(action.customer)
        ),
        tap(() => this.router.navigate(['/customers']))
      ),
    { dispatch: false }
  );

  deleteCourse$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(customerActionTypes.deleteCustomer),
        concatMap((action) =>
          this.customerService.deleteCustomer(action.customerId)
        )
      ),
    { dispatch: false }
  );

  updateCOurse$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(customerActionTypes.updateCustomer),
        concatMap((action) =>
          this.customerService.updateCustomer(
            action.update.id as string,
            action.update.changes
          )
        ),
        tap(() => this.router.navigate(['/customers']))
      ),
    { dispatch: false }
  );

  constructor(
    private customerService: CustomerService,
    private actions$: Actions,
    private router: Router
  ) {}
}
