import { AuthService } from './shared/services/auth.service';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { CommonService } from './shared/services/common.service';
import { CoursesModule } from './courses/courses.module';
import { routing } from './app.routing';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {InlineEditorModule} from '@qontu/ngx-inline-editor';
import { EmailverifyComponent } from './emailverify/emailverify.component';
import { PaymentComponent } from './dashboard/payment/payment.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    DashboardComponent,
    EmailverifyComponent,
    PaymentComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CoursesModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    routing,
    SharedModule,
    InlineEditorModule
  ],
  providers: [CommonService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
