import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { CustomerFormComponent } from './components/customer-form/customer-form.component';
import { CustomerService } from './services/customer.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { customerReducer } from './stores/customer.reducer';
import { CustomerEffects } from './stores/customer.effect';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CustomerResolver } from './resolvers/customer.resolver';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { JoinPipe } from './pipes/join.pipe';
import { MatMenuModule } from '@angular/material/menu';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { MatDialogModule } from '@angular/material/dialog';

const routes: Routes = [
  {
    path: '',
    component: CustomerListComponent,
    resolve: { customers: CustomerResolver },
  },
  {
    path: 'form/:id',
    component: CustomerFormComponent,
  },
  {
    path: 'form',
    component: CustomerFormComponent,
  },
];

@NgModule({
  declarations: [
    CustomerListComponent,
    CustomerFormComponent,
    JoinPipe,
    ConfirmComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('customers', customerReducer),
    EffectsModule.forFeature([CustomerEffects]),
    MatCardModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatMenuModule,
    MatDialogModule,
  ],
  providers: [CustomerResolver, CustomerService],
})
export class CustomersModule {}
