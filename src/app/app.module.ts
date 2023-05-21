import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHtppInterceptorService } from './services/guards/auth-htpp-interceptor.service';
import { AuthGaurdService } from './services/guards/auth-gaurd.service';
import { AuthService } from './services/auth.service';
import { AppService } from './services/app.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material-module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    AuthGaurdService,
    AppService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHtppInterceptorService, 
      multi: true,
  },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
