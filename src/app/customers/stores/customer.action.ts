import { createAction, props } from '@ngrx/store';
import { Customer } from '../models/customer.model';
import { Update } from '@ngrx/entity';

export const loadCustomers = createAction('[Customers List] Loads Customers');

export const customersLoaded = createAction(
  '[Customers Effect] Customers Loaded Succesfully',
  props<{ customers: Customer[] }>()
);

export const createCustomer = createAction(
  '[Creates Customer] Create Customer',
  props<{ customer: Customer }>()
);

export const deleteCustomer = createAction(
  '[Deletes Customer] Deletes Customer',
  props<{ customerId: string }>()
);

export const updateCustomer = createAction(
  '[Updates Customer] Updates Customer',
  props<{ update: Update<Customer> }>()
);

export const customerActionTypes = {
  loadCustomers,
  customersLoaded,
  createCustomer,
  deleteCustomer,
  updateCustomer,
};
