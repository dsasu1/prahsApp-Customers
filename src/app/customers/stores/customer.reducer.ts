import { createReducer, on } from '@ngrx/store';
import { Customer } from '../models/customer.model';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { customerActionTypes, customersLoaded } from './customer.action';

export interface CustomerState extends EntityState<Customer> {
  customersLoaded: boolean;
}

export const adapter: EntityAdapter<Customer> = createEntityAdapter<Customer>();

export const initialState = adapter.getInitialState({
  customersLoaded: false,
});

export const customerReducer = createReducer(
  initialState,

  on(customerActionTypes.customersLoaded, (state, action) => {
    return adapter.addMany(action.customers, {
      ...state,
      customersLoaded: true,
    });
  }),

  on(customerActionTypes.createCustomer, (state, action) => {
    return adapter.addOne(action.customer, state);
  }),

  on(customerActionTypes.deleteCustomer, (state, action) => {
    return adapter.removeOne(action.customerId, state);
  }),

  on(customerActionTypes.updateCustomer, (state, action) => {
    return adapter.updateOne(action.update, state);
  })
);

export const { selectAll, selectIds } = adapter.getSelectors();

/*
const customerReducer = createReducer(
  initialState,
  on(customerActions.add, state => ({ ...state, home: state.home + 1 })),
  on(customerActions.deleteById, state => ({ ...state, away: state.away + 1 })),
  on(customerActions.getAll, state => (state.)),
  on(customerActions.getById, (state, { game }) => ({ home: game.home, away: game.away })),
  on(customerActions.update, (state, { game }) => ({ home: game.home, away: game.away }))
);

export function reducer(state: State | undefined, action: Action) {
  return scoreboardReducer(state, action);
} */
