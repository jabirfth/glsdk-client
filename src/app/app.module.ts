import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SDKBrowserModule } from './shared/sdk/index';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './components/federal/welcome/welcome.component';
import { CitiesComponent } from './components/federal/cities/cities.component';
import { CityService } from './services/city.service';
import { CityComponent } from './components/federal/city/city.component';
import { RoadsComponent } from './components/federal/roads/roads.component';
import { RoadFormComponent } from './components/federal/road-form/road-form.component';
import { RoadService } from './services/road.service';
import { CityFormComponent } from './components/federal/city-form/city-form.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { AuthorizationService } from './services/authorization.service';
import { CookieService } from 'angular2-cookie/core';
import { LdapLoginService } from './services/ldap-login.service';
import { FranceConnectLoginService } from './services/france-connect-login.service';
import { DatabaseLoginService } from './services/bdd-login.service';
import { ContainersComponent } from './components/storage/containers/containers.component';
import { FilesComponent } from './components/storage/files/files.component';
import { StorageService } from './services/storage.service';
import { StorageComponent } from './components/storage/storage.component';
import { FileFormComponent } from './components/storage/file-form/file-form.component';
import { ContainerFormComponent } from './components/storage/container-form/container-form.component';
import { FileUploadModule } from 'ng2-file-upload';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { BytesPipe } from './pipes/bytes.pipe';
import { AgentsComponent } from './components/federal/agents/agents.component';
import { AgentService } from './services/agent.service';
import { AgentComponent } from './components/federal/agent/agent.component';
import { AgentAssignmentsComponent } from './components/federal/agent-assignments/agent-assignments.component';
import {
  AgentAssignmentFormComponent,
} from './components/federal/agent-assignment-form/agent-assignment-form.component';
import { OrdersComponent } from './components/sample/orders/orders.component';
import { OrderService } from 'app/services/order.service';
import { OrderComponent } from './components/sample/order-detail/order-detail.component';
import { OrderContributionsComponent } from './components/sample/order-contributions/order-contributions.component';
import {
  OrderContributionsFormComponent,
} from './components/sample/order-contributions-form/order-contributions-form.component';
import { AgentRankService } from './services/agent-rank.service';
import { DepartmentService } from './services/department.service';
import { DepartmentsComponent } from './components/federal/departments/departments.component';
import { AppRoutingModule } from './app.routing.module';
import { MenuComponent } from './components/menu/menu.component';

/* https://angular.io/guide/i18n#i18n-pipes */
import { registerLocaleData } from '@angular/common';
import fr from '@angular/common/locales/fr';
registerLocaleData(fr);

import { CsvExportService } from './services/csv-exporter.service';
import { CustomMatPaginatorIntl } from './shared/CustomMatPaginatorIntl';
import { AppMaterialModule } from './app.material.module';
import { MatPaginatorIntl } from '@angular/material';
import { OrderFormComponent } from './components/sample/order-form/order-form.component';
import { UserService } from './services/user.service';
import { UsersComponent } from './components/authentication/users/users.component';
import { UserFormComponent } from './components/authentication/user-form/user-form.component';
import { RoleService } from './services/role.service';
import { environment } from '../environments/environment';


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
