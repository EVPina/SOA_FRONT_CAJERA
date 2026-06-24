import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Dashboard } from './components/dashboard/dashboard';
import { Menu } from './components/menu/menu';
import { Carrito } from './components/carrito/carrito';
import { Cuenta } from './components/cuenta/cuenta';

export const routes: Routes = [
  { path: '', component: Login },  // Al entrar, va al Login
  { path: 'login', component: Login },
  { path: 'dashboard', component: Dashboard },
  { path: 'menu', component: Menu },
  { path: 'carrito', component: Carrito },
  { path: 'cuenta', component: Cuenta }
];