import { Routes } from "@angular/router";
import { ProductListComponent } from "./products/product-list/product-list.component";
import { ProductDetailsComponent } from "./products/product-details/product-details.component";
import { ProductFormComponent } from "./products/product-form/product-form.component";
import { authGuard } from "./guards/auth.guard";
import { LoginComponent } from "./login/login.component";


export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'products', component: ProductListComponent, canActivate: [authGuard]},
    { path: 'products/:id', component: ProductDetailsComponent, canActivate: [authGuard] },
    { path: 'products/add', component: ProductFormComponent,canActivate: [authGuard] },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
  ];
  