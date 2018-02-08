import { AgentGuard } from './guards/agent.guard';
import { DepartmentsComponent } from './components/federal/departments/departments.component';
import { AgentComponent } from './components/federal/agent/agent.component';
import { AgentsComponent } from './components/federal/agents/agents.component';
import { StorageComponent } from './components/storage/storage.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { WelcomeComponent } from './components/federal/welcome/welcome.component';
import { AuthGuard } from './guards/auth.guard';
import { CitiesComponent } from './components/federal/cities/cities.component';
import { CityFormComponent } from './components/federal/city-form/city-form.component';
import { AdminGuard } from './guards/admin.guard';
import { CityComponent } from './components/federal/city/city.component';
import { RoadsComponent } from './components/federal/roads/roads.component';
import { RoadFormComponent } from './components/federal/road-form/road-form.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { OrdersComponent } from './components/sample/orders/orders.component';
import { OrderComponent } from './components/sample/order-detail/order-detail.component';
import { OrderFormComponent } from './components/sample/order-form/order-form.component';
import { UsersComponent } from './components/federal/users/users.component';
import { UserFormComponent } from './components/federal/user-form/user-form.component';

const appRoutes: Routes = [
  {
    path: '',
    component: WelcomeComponent,
    canActivate: [AuthGuard],
    data: {
      title: { en: 'Welcome', fr: 'Bienvenue' },
    },
  },
  {
    path: 'cities',
    component: CitiesComponent,
    canActivate: [AuthGuard],
    data: {
      title: { en: 'Cities', fr: 'Villes' },
    },
  },
  {
    path: 'cities/new',
    component: CityFormComponent,
    canActivate: [AdminGuard],
    data: {
      title: { en: 'New city', fr: 'Nouvelle ville' },
    },
  },
  {
    path: 'cities/:code',
    component: CityComponent,
    canActivate: [AuthGuard],
    data: {
      title: { en: 'City details', fr: 'Détails de la ville' },
    },
  },
  {
    path: 'cities/:code/edit',
    component: CityFormComponent,
    canActivate: [AdminGuard],
    data: {
      title: { en: 'Edit city', fr: 'Modifier la ville' },
    },
  },
  {
    path: 'cities/:code/roads',
    component: RoadsComponent,
    canActivate: [AuthGuard],
    data: {
      title: { en: 'City\'s Roads', fr: 'Routes de la ville' },
    },
  },
  {
    path: 'roads',
    component: RoadsComponent,
    canActivate: [AuthGuard],
    data: {
      title: { en: 'Roads', fr: 'Routes' },
    },
  },
  {
    path: 'roads/new',
    component: RoadFormComponent,
    canActivate: [AdminGuard],
    data: {
      title: { en: 'New road', fr: 'Nouvelle route' },
    },
  },
  {
    path: 'roads/:id/edit',
    component: RoadFormComponent,
    canActivate: [AdminGuard],
    data: {
      title: { en: 'Edit road', fr: 'Modifier la route' },
    },
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: { en: 'Login', fr: 'Se connecter' },
    },
  },
  {
    path: 'storage',
    component: StorageComponent,
    canActivate: [AgentGuard],
    data: {
      title: { en: 'Storage', fr: 'Storage' },
    },
  },
  {
    path: 'agents',
    component: AgentsComponent,
    canActivate: [AgentGuard],
    data: {
      title: { en: 'Agents', fr: 'Agents' },
    },
  },
  {
    path: 'agents/:id',
    component: AgentComponent,
    canActivate: [AgentGuard],
    data: {
      title: { en: 'Agent\'s details', fr: 'Détails des agents' },
    },
  },
  {
    path: 'departments',
    component: DepartmentsComponent,
    canActivate: [AgentGuard],
    data: {
      title: { en: 'Departments', fr: 'Services' },
    },
  },
  {
    path: 'orders',
    component: OrdersComponent,
    canActivate: [AgentGuard],
    data: {
      title: { en: 'Orders', fr: 'Orders' },
    },
  },
  {
    path: 'orders/new',
    component: OrderFormComponent,
    canActivate: [AdminGuard],
    data: {
      title: { en: 'New order', fr: 'Nouvelle commande' },
    },
  },
  {
    path: 'orders/:id/edit',
    component: OrderFormComponent,
    canActivate: [AdminGuard],
    data: {
      title: { en: 'Edit order', fr: 'Modifier la commande' },
    },
  },
  {
    path: 'orders/:id',
    component: OrderComponent,
    canActivate: [AgentGuard],
    data: {
      title: { en: 'Order details', fr: 'Détails d\'une commande' },
    },
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AdminGuard],
    data: {
      title: { 'en-US': 'Users', fr: 'Users' },
    },
  },
  {
    path: 'users/new',
    component: UserFormComponent,
    canActivate: [AdminGuard],
    data: {
      title: { en: 'New User', fr: 'Nouveau user' },
    },
  },
  {
    path: 'users/:id/edit',
    component: UserFormComponent,
    canActivate: [AdminGuard],
    data: {
      title: { en: 'Edit user', fr: 'Modifier un utilisateur' },
    },
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
  ],
  exports: [
    RouterModule,
  ],
  providers: [
    AdminGuard,
    AgentGuard,
    AuthGuard,
  ],
})
export class AppRoutingModule {}
