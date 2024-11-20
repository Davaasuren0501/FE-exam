import { Routes } from '@angular/router';

import { LoginComponent } from './component/login/login.component';
import { VerifyOtpComponent } from './component/verify-otp/verify-otp.component';

export const routes: Routes = [
    { path: '', redirectTo: 'auth/login', pathMatch: 'full' }
    , { path: 'auth/login', component: LoginComponent }
    , { path: 'auth/verify-otp', component: VerifyOtpComponent }
];
