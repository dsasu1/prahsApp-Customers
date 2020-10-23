import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CustomerState, selectAll } from './customer.reducer';

export const customerFeatureSelector = createFeatureSelector<CustomerState>(
  'customers'
);

export const getAllCustomers = createSelector(
  customerFeatureSelector,
  selectAll
);

export const getCustomer = (id: string) =>
  createSelector(getAllCustomers, (customers) =>
    customers.find((x) => x.id === id)
  );

export const areCustomersLoaded = createSelector(
  customerFeatureSelector,
  (state) => state.customersLoaded
);
