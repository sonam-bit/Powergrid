import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { DividerModule } from 'primeng/divider';
import { FormsModule } from '@angular/forms';
import { AdminHomeComponent } from './views/admin-home/admin-home.component';
import { ToastrModule } from 'ngx-toastr';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { NavbarComponent } from './views/navbar/navbar.component';
import { FooterComponent } from './views/footer/footer.component';
import { Clipboard } from '@angular/cdk/clipboard';
import { DialogModule } from 'primeng/dialog';
import { authguardGuard } from './guard/authguard.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminHomeComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ButtonModule,
    RouterModule,
    InputTextModule,
    PasswordModule,
    DividerModule,
    FormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    TableModule,
    DropdownModule,
    DialogModule,
 
  ],
  providers: [authguardGuard],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
