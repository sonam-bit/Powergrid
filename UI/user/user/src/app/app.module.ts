import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Views/pages/login/login.component';
import { DashboardComponent } from './Views/layout/dashboard/dashboard.component';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { DividerModule } from 'primeng/divider';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './Views/partial/header/header.component';
import { FooterComponent } from './Views/partial/footer/footer.component';
import { RaiseTicketComponent } from './Views/pages/raise-ticket/raise-ticket.component';
import { ToastrModule } from 'ngx-toastr';
import { HomePageComponent } from './Views/pages/home-page/home-page.component';
import { HistoryComponent } from './Views/pages/history/history.component';
import { TableModule } from 'primeng/table';
import {  ReactiveFormsModule,} from '@angular/forms';
import { TreeTableModule } from "primeng/treetable";
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'ng2-file-upload';
import { NgChartsModule } from 'ng2-charts';
import { authGuard } from './guard/auth.guard';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    RaiseTicketComponent,
    HomePageComponent,
    HistoryComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    PasswordModule,
    InputTextModule,
    ButtonModule,
    DividerModule,
    FormsModule,
    InputTextareaModule,
    HttpClientModule,
    ConfirmDialogModule,
    RouterModule,
    TableModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    TreeTableModule,
    DialogModule,
    FileUploadModule,
    NgChartsModule,


    ],
  providers: [authGuard],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { 

}
