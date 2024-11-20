import { Routes } from '@angular/router';

import { LoginComponent } from './component/login/login.component';
import { VerifyOtpComponent } from './component/verify-otp/verify-otp.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' }
    , { path: 'login', component: LoginComponent }
    , { path: 'login/verify-otp', component: VerifyOtpComponent }
];
