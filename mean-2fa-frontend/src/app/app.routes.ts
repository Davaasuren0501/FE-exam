import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { VerifyOtpComponent } from './verify-otp/verify-otp.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' }
    , { path: 'login', component: LoginComponent }
    , { path: 'login/verify-otp', component: VerifyOtpComponent }
];
