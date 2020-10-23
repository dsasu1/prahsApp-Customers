import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Customer } from '../models/customer.model';

export class CustomerService {
  private customers: Map<string, Customer> = new Map<string, Customer>();
  getAllCustomers(): Observable<Customer[]> {
    delay(500);
    return of(Array.from(this.customers.values()));
  }

  createCustomer(customer: Customer): Observable<Customer> {
    delay(500);
    this.customers.set(customer.id, customer);
    return of(customer);
  }

  deleteCustomer(customerId: string): Observable<boolean> {
    delay(500);
    this.customers.delete(customerId);
    return of(true);
  }

  updateCustomer(
    customerId: string,
    changes: Partial<Customer>
  ): Observable<Customer> {
    const current = this.customers.get(customerId);
    const updatedCustomer: Customer = { ...current, ...changes };
    delay(500);
    this.customers.set(customerId, updatedCustomer);
    return of(updatedCustomer);
  }
}
