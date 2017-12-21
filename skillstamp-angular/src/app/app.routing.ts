import { PaymentComponent } from './dashboard/payment/payment.component';
import { EmailverifyComponent } from './emailverify/emailverify.component';
import { LoginComponent } from './shared/login/login.component';
import { SignupComponent } from './shared/signup/signup.component';
import { AuthGuard } from './shared/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomepageComponent } from './homepage/homepage.component';

import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [

    { path : '', component: HomepageComponent },
    { path : 'signup', component: SignupComponent },
    { path : 'login', component: LoginComponent },
    { path : 'confirmation/:token', component: EmailverifyComponent },
    { path : 'dashboard', component:DashboardComponent,canActivate:[AuthGuard],
    children: [
        { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
        { path: 'payment', component: PaymentComponent}
        
      ]
    },
    { path: 'courses', redirectTo: 'courses', pathMatch: 'full' }
    
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class routing {}