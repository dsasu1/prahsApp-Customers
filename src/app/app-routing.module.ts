import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: '' , redirectTo: 'customers', pathMatch: 'full'},
  {path: 'customers',
   loadChildren: () => import('./customers/customers.module').then(mod => mod.CustomersModule)
  },
  { path: '**', redirectTo: 'customers' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
