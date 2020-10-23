import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, first, take, tap } from 'rxjs/operators';
import { AppState } from 'src/app/store/reducers';
import { Customer } from '../models/customer.model';
import { loadCustomers } from '../stores/customer.action';
import { areCustomersLoaded } from '../stores/customer.selectors';

@Injectable()
export class CustomerResolver implements Resolve<Observable<Customer[] | boolean>> {

  constructor(private store: Store<AppState>) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Customer[] | boolean> {
    return this.store
    .pipe(
        select(areCustomersLoaded),
        tap((customersLoaded) => {
          if (!customersLoaded) {
            this.store.dispatch(loadCustomers());
          }

        }),
        filter(customersLoaded => customersLoaded),
        take(1)
    );
  }
}
