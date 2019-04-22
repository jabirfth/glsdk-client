import { CookieService } from 'angular2-cookie/core';
import { OrderService } from 'app/services/order.service';
import { FileUploadModule } from 'ng2-file-upload';

/* https://angular.io/guide/i18n#i18n-pipes */
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import fr from '@angular/common/locales/fr';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorIntl } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppMaterialModule } from './app.material.module';
import { AppRoutingModule } from './app.routing.module';
import { LoginComponent } from './components/authentication/login/login.component';
import { UserFormComponent } from './components/authentication/user-form/user-form.component';
import { UsersComponent } from './components/authentication/users/users.component';
import {
  AgentAssignmentFormComponent,
} from './components/federal/agent-assignment-form/agent-assignment-form.component';
import {
  AgentAssignmentsComponent,
} from './components/federal/agent-assignments/agent-assignments.component';
import { AgentComponent } from './components/federal/agent/agent.component';
import { AgentsComponent } from './components/federal/agents/agents.component';
import { CitiesComponent } from './components/federal/cities/cities.component';
import { CityFormComponent } from './components/federal/city-form/city-form.component';
import { CityComponent } from './components/federal/city/city.component';
import { DepartmentsComponent } from './components/federal/departments/departments.component';
import { RoadFormComponent } from './components/federal/road-form/road-form.component';
import { RoadsComponent } from './components/federal/roads/roads.component';
import { WelcomeComponent } from './components/federal/welcome/welcome.component';
import { MenuComponent } from './components/menu/menu.component';
import {
  OrderContributionsFormComponent,
} from './components/sample/order-contributions-form/order-contributions-form.component';
import {
  OrderContributionsComponent,
} from './components/sample/order-contributions/order-contributions.component';
import { OrderComponent } from './components/sample/order-detail/order-detail.component';
import { OrderFormComponent } from './components/sample/order-form/order-form.component';
import { OrdersComponent } from './components/sample/orders/orders.component';
import {
  ContainerFormComponent,
} from './components/storage/container-form/container-form.component';
import { ContainersComponent } from './components/storage/containers/containers.component';
import { FileFormComponent } from './components/storage/file-form/file-form.component';
import { FilesComponent } from './components/storage/files/files.component';
import { StorageComponent } from './components/storage/storage.component';
import { ShowToRolesDirective } from './directive/show-to-role.directive';
import { BytesPipe } from './pipes/bytes.pipe';
import { AgentRankService } from './services/agent-rank.service';
import { AgentService } from './services/agent.service';
import { AuthorizationService } from './services/authorization.service';
import { DatabaseLoginService } from './services/bdd-login.service';
import { CityService } from './services/city.service';
import { CsvExportService } from './services/csv-exporter.service';
import { DepartmentService } from './services/department.service';
import { FranceConnectLoginService } from './services/france-connect-login.service';
import { LdapLoginService } from './services/ldap-login.service';
import { RoadService } from './services/road.service';
import { RoleService } from './services/role.service';
import { StorageService } from './services/storage.service';
import { UserService } from './services/user.service';
import { CustomMatPaginatorIntl } from './shared/CustomMatPaginatorIntl';
import { SDKBrowserModule } from './shared/sdk/index';
import { httpInterceptorProviders } from './interceptors';

registerLocaleData(fr);

@NgModule({
  declarations: [
    AgentAssignmentFormComponent,
    AgentAssignmentsComponent,
    AgentComponent,
    AgentsComponent,
    AppComponent,
    BytesPipe,
    CitiesComponent,
    CityComponent,
    CityFormComponent,
    ContainersComponent,
    ContainerFormComponent,
    DepartmentsComponent,
    FilesComponent,
    FileFormComponent,
    LoginComponent,
    MenuComponent,
    RoadsComponent,
    OrdersComponent,
    OrderComponent,
    OrderFormComponent,
    OrderContributionsComponent,
    OrderContributionsFormComponent,
    UsersComponent,
    UserFormComponent,
    RoadFormComponent,
    ShowToRolesDirective,
    StorageComponent,
    WelcomeComponent,
  ],
  imports: [
    AppRoutingModule,
    AppMaterialModule,
    BrowserAnimationsModule,
    BrowserModule,
    FileUploadModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    SDKBrowserModule.forRoot(),
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    httpInterceptorProviders,
    AgentRankService,
    AgentService,
    AuthorizationService,
    CityService,
    CookieService,
    CsvExportService,
    DatabaseLoginService,
    DepartmentService,
    FranceConnectLoginService,
    LdapLoginService,
    OrderService,
    RoadService,
    RoleService,
    StorageService,
    UserService,
    { provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
